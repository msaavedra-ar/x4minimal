'use strict';

// All state is local to this tab and intentionally disappears on reload.
const pages = [
  ['Hay días en los que todo parece pedir una respuesta. Una pantalla se enciende, llega una notificación, una lista se hace más larga.', 'Pero acá no hay nada urgente. Podés dejar que el mundo siga un rato y volver a una sola cosa: las palabras que tenés adelante.'],
  ['La pausa no necesita un lugar especial. Puede empezar junto a una ventana, en el asiento de un tren o mientras se enfría el café.', 'Leer es una forma de quedarse. Una línea lleva a la siguiente, y de pronto el tiempo deja de ser una cuenta pendiente.'],
  ['Cuando cierres esta página, todo seguirá ahí. Tal vez cambie algo pequeño: la forma de mirar, el ritmo de una pregunta, las ganas de escuchar.', 'Por ahora, alcanza con esto. Un poco de silencio. Una página. El tiempo para leerla.']
];
const conversations = [
  { name: 'Alex', messages: [{ text: '¿Nos vemos mañana?', own: false }], draft: '' },
  { name: 'Equipo', messages: [{ text: '¡Buen día! Dejé una idea para cuando tengan un rato.', own: false }], draft: '' },
  { name: 'Familia', messages: [{ text: 'Avisame cuando llegues. Sin apuro.', own: false }], draft: '' }
];
const $ = id => document.getElementById(id);
let current = 0;
let pageIndex = 0;
let readingSize = 20;
let activeView = 'home';

function show(view) {
  if (activeView === 'chat') conversations[current].draft = $('input').value;
  activeView = view;
  document.querySelectorAll('main section').forEach(section => { section.hidden = section.id !== view; });
  document.querySelectorAll('nav button').forEach(button => {
    if (button.dataset.view === (view === 'read' ? 'home' : view === 'chat' ? 'chats' : view)) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  if (view === 'chats') renderList();
  if (view === 'read') renderReading();
  if (view === 'chat') {
    $('person').textContent = conversations[current].name;
    $('input').value = conversations[current].draft;
    $('send-status').textContent = '';
    renderThread();
    updateCompose();
  }
  document.querySelector('#' + view + ' h1').focus();
  window.scrollTo(0, 0);
}
function renderReading() {
  $('reading').replaceChildren(...pages[pageIndex].map(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }));
  $('page-number').textContent = (pageIndex + 1) + ' / ' + pages.length;
  $('previous').disabled = pageIndex === 0;
  $('next').disabled = pageIndex === pages.length - 1;
  $('book-progress').textContent = 'Continuar · página ' + (pageIndex + 1) + ' de ' + pages.length;
}
function renderList() {
  $('list').replaceChildren(...conversations.map((conversation, index) => {
    const button = document.createElement('button');
    button.className = 'conversation';
    const name = document.createElement('strong');
    name.textContent = conversation.name;
    const preview = document.createElement('span');
    preview.className = 'preview';
    const last = conversation.messages[conversation.messages.length - 1];
    preview.textContent = conversation.draft ? 'Borrador: ' + conversation.draft : (last.own ? 'Vos: ' : '') + last.text;
    button.append(name, preview);
    button.addEventListener('click', () => { current = index; show('chat'); });
    return button;
  }));
}
function renderThread() {
  $('messages').replaceChildren(...conversations[current].messages.map(message => {
    const item = document.createElement('li');
    item.className = 'message' + (message.own ? ' own' : '');
    const author = document.createElement('small');
    author.textContent = message.own ? 'VOS · PRUEBA LOCAL' : conversations[current].name + ' · FICTICIO';
    const text = document.createElement('p');
    text.textContent = message.text;
    item.append(author, text);
    return item;
  }));
}
function updateCompose() {
  $('count').textContent = $('input').value.length + ' / 500';
  $('send').disabled = !$('input').value.trim();
  conversations[current].draft = $('input').value;
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => show(button.dataset.view)));
$('open-book').addEventListener('click', () => show('read'));
for (const [id, delta] of [['previous', -1], ['next', 1]]) {
  $(id).addEventListener('click', () => {
    pageIndex = Math.max(0, Math.min(pages.length - 1, pageIndex + delta));
    renderReading();
    // Keep focus usable when the page boundary disables the pressed button.
    $('read-title').focus();
    window.scrollTo(0, 0);
  });
}
for (const [id, delta] of [['smaller', -2], ['larger', 2]]) {
  $(id).addEventListener('click', () => {
    readingSize = Math.max(18, Math.min(28, readingSize + delta));
    $('reading').style.setProperty('--reading-size', readingSize + 'px');
    $('smaller').disabled = readingSize === 18;
    $('larger').disabled = readingSize === 28;
  });
}
$('input').addEventListener('input', updateCompose);
$('compose').addEventListener('submit', event => {
  event.preventDefault();
  const text = $('input').value.trim();
  if (!text) return;
  conversations[current].messages.push({ text, own: true });
  $('input').value = '';
  updateCompose();
  renderThread();
  $('send-status').textContent = 'Mensaje agregado a la demo. No se envió a nadie.';
  $('input').focus();
});
$('sync').addEventListener('click', () => {
  const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  $('sync-status').textContent = 'Simulación completada a las ' + time + '. No se consultó WhatsApp ni se enviaron mensajes.';
});
function updateConnection() {
  $('connection').textContent = navigator.onLine ? 'Demo local · Sin servicio de mensajería conectado.' : 'Sin conexión · La demo abierta sigue funcionando. No hay envíos pendientes.';
}
window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
updateConnection();
