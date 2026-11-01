"""Run against a local static server: python3 tests/smoke.py [base URL].
Requires Playwright Python and Chromium; no application dependencies.
"""
import sys
from playwright.sync_api import sync_playwright, expect

url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8000'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for width in (320, 360, 430, 800):
        context = browser.new_context(viewport={'width': width, 'height': 740})
        page = context.new_page()
        errors, external = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('request', lambda r: external.append(r.url) if not r.url.startswith(url) else None)
        assert page.goto(url).status == 200
        expect(page.locator('#home')).to_be_visible()
        page.locator('#open-book').click()
        expect(page.locator('#previous')).to_be_disabled()
        before = page.locator('#reading').inner_text()
        page.locator('#larger').click()
        assert page.locator('#reading').evaluate('(e) => getComputedStyle(e).fontSize') == '22px'
        page.locator('#next').click()
        assert page.locator('#reading').inner_text() != before
        page.locator('#next').click()
        expect(page.locator('#next')).to_be_disabled()
        page.locator('[data-view="home"]').first.click()
        page.locator('#open-book').click()
        expect(page.locator('#page-number')).to_have_text('3 / 3')
        page.locator('nav [data-view="chats"]').click()
        assert page.locator('.conversation').count() == 3
        page.locator('.conversation').first.click()
        expect(page.locator('#send')).to_be_disabled()
        page.locator('#input').fill('   ')
        expect(page.locator('#send')).to_be_disabled()
        page.locator('#input').fill('Borrador de Alex')
        page.locator('.back[data-view="chats"]').click()
        expect(page.locator('.conversation').first).to_contain_text('Borrador: Borrador de Alex')
        page.locator('.conversation').nth(1).click()
        expect(page.locator('#input')).to_have_value('')
        page.locator('.back[data-view="chats"]').click()
        page.locator('.conversation').first.click()
        expect(page.locator('#input')).to_have_value('Borrador de Alex')
        page.locator('#input').fill('<img src=x onerror=alert(1)>\nSegunda línea')
        page.locator('#send').click()
        expect(page.locator('#input')).to_have_value('')
        expect(page.locator('#messages')).to_contain_text('<img src=x onerror=alert(1)>')
        assert page.locator('#messages img').count() == 0
        expect(page.locator('#send-status')).to_contain_text('No se envió a nadie')
        context.set_offline(True)
        expect(page.locator('#connection')).to_contain_text('Sin conexión')
        page.locator('nav [data-view="chats"]').click()
        page.locator('#sync').click()
        expect(page.locator('#sync-status')).to_contain_text('No se consultó WhatsApp')
        page.locator('nav [data-view="home"]').click()
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.locator('#open-book').click()
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert not errors, errors
        assert not external, external
        context.set_offline(False)
        page.reload()
        page.locator('nav [data-view="chats"]').click()
        page.locator('.conversation').first.click()
        assert page.locator('#messages li').count() == 1
        if width == 360:
            page.locator('nav [data-view="home"]').click()
            page.screenshot(path='/tmp/x4-v02-library.png', full_page=True)
        context.close()
        print(f'PASS {width}px: reading, pagination, text size, drafts, safe compose, offline, simulated sync, session reset, no external requests/JS errors')
    browser.close()
