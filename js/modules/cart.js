// js/modules/cart.js
import { $, $$ }                          from '../utils/domUtils.js';
import { getProductById, getAllProducts } from './productCatalog.js';
import { generateWhatsAppMessage,
         updateWhatsAppLinks }            from './whatsapp.js';

/* -------------------- estado & subscritores ----------------------- */
let cart        = loadCart();     // [{ id, qty }]
const watchers  = [];

/* -------------------- API pública --------------------------------- */
export function initCart () {
  renderUI();
}

export function onCartUpdate (cb) {
  if (typeof cb === 'function') watchers.push(cb);
}

export function addItemToCart (id, qty = 1) {
  qty = parseInt(qty);
  const item = cart.find(i => i.id === id);
  item ? (item.qty += qty) : cart.push({ id, qty });
  saveCart(); updateAll();
}

export function changeItemQty (id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); updateAll();
}

export function removeItem (id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateAll();
}

/* (facultativo) expositor para main.js, UI ou limpar após checkout */
export function clearCart () {
  cart = []; saveCart(); updateAll();
}

/* devolve itens + total para WhatsApp ou UI */
export function getCartSummary () {
  const items = cart.map(i => ({ ...i }));
  const total = items.reduce((s, i) => s + i.qty * getProductById(i.id).price, 0);
  return { items, total };
}

export function updateCartIcon () {
  $('#cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

/* -------------------- UI interna ---------------------------------- */
function renderUI () {
  const cont   = $('#cartItemsContainer');
  const totalL = $('#cartTotal');
  if (!cont) return;

  cont.innerHTML = '';
  let total = 0;

  cart.forEach(i => {
    const p     = getProductById(i.id);
    total      += i.qty * p.price;

    cont.insertAdjacentHTML('beforeend', `
      <div class="flex justify-between items-center">
        <span>${i.qty}× ${p.name}</span>
        <div class="flex items-center space-x-2">
          <button data-act="dec" data-id="${i.id}" class="px-2">−</button>
          <button data-act="inc" data-id="${i.id}" class="px-2">+</button>
          <button data-act="del" data-id="${i.id}" class="text-red-600 px-2">&times;</button>
        </div>
      </div>
    `);
  });

  totalL.textContent = `€${total.toFixed(2)}`;

  /* delegação para botões internos */
  cont.onclick = ({ target }) => {
    const btn = target.closest('button[data-act]');
    if (!btn) return;
    const id  = parseInt(btn.dataset.id, 10);
    if (btn.dataset.act === 'inc')      changeItemQty(id, 1);
    else if (btn.dataset.act === 'dec') changeItemQty(id, -1);
    else if (btn.dataset.act === 'del') removeItem(id);
  };
}

function updateAll () {
  renderUI();
  updateCartIcon();
  fireWatchers();
  refreshWhatsApp();
}

function fireWatchers () {
  const summary = getCartSummary();
  watchers.forEach(cb => cb(summary));
}

function refreshWhatsApp () {
  const { items, total } = getCartSummary();
  const msg = generateWhatsAppMessage(items, getAllProducts(), total);
  updateWhatsAppLinks(msg);
}

/* -------------------- localStorage ------------------------------- */
function saveCart () {
  localStorage.setItem('ppb-cart', JSON.stringify(cart));
}
function loadCart () {
  try { return JSON.parse(localStorage.getItem('ppb-cart')) || []; }
  catch { return []; }
}
