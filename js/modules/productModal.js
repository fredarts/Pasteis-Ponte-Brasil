// js/modules/productModal.js
//--------------------------------------------------------------------
import { $, $$ }              from '../utils/domUtils.js';
import { getProductById }     from './productCatalog.js';
import { addItemToCart }      from './cart.js';

//--------------------------------------------------------------------
//  Seletores
//--------------------------------------------------------------------
const els = {
  modal        : $('#productView'),
  heroImg      : $('#productModalImg'),
  galleryWrap  : $('#productModalGalleryWrap'),
  gallery      : $('#productModalGallery'),
  videoWrap    : $('#productModalVideoWrap'),
  video        : $('#productModalVideo'),

  title        : $('#productModalTitle'),
  teaser       : $('#productModalTeaser'),
  desc         : $('#productModalDesc'),
  tech         : $('#productModalTech'),
  ingredients  : $('#productModalIngredients'),

  qtyInput     : $('#productModalQty'),
  addBtn       : $('#addProductToCartBtn'),
  closeBtn     : $('#closeProductBtn')
};

let currentProductId = null;

//--------------------------------------------------------------------
//  Renderiza miniaturas
//--------------------------------------------------------------------
function renderGallery (imgs = []) {
  els.gallery.innerHTML = '';
  imgs.forEach((src, i) => {
    const thumb = document.createElement('img');
    thumb.src   = src;
    thumb.alt   = `${i + 1}`;
    thumb.className =
      'w-16 h-16 object-cover rounded-md cursor-pointer border-2 ' +
      'border-transparent hover:border-amber-500 transition';
    thumb.onclick = () => (els.heroImg.src = src);
    els.gallery.appendChild(thumb);
  });
}

//--------------------------------------------------------------------
//  A P I
//--------------------------------------------------------------------
export function openProductModal (id) {
  const p = getProductById(id);
  if (!p) return;

  currentProductId   = id;

  /* Imagem hero */
  els.heroImg.src    = p.img;
  els.heroImg.alt    = p.name;

  /* Mini-galeria */
  if (p.images && p.images.length) {
    renderGallery(p.images);
    els.galleryWrap.classList.remove('hidden');
  } else {
    els.galleryWrap.classList.add('hidden');
  }

  /* Vídeo */
  if (p.video) {
    els.video.src = p.video;            // link YouTube emb. ou mp4
    els.videoWrap.classList.remove('hidden');
  } else {
    els.videoWrap.classList.add('hidden');
  }

  /* Textos */
  els.title .textContent = p.name;
  els.teaser.textContent = p.teaser      || '';
  els.desc  .textContent = p.desc        || '';
  els.tech  .textContent = p.tech        || '';
  els.ingredients.textContent =
    (p.ingredients && p.ingredients.join(', ')) || '';

  /* Quantidade padrão */
  els.qtyInput.value = 1;

  /* Abre modal */
  els.modal.classList.remove('hidden');
}

export function closeProductModal () {
  els.modal.classList.add('hidden');
  // pausa vídeo mp4, se estiver em play
  if (els.video && !els.video.paused) els.video.pause();
}

//--------------------------------------------------------------------
//  Event listeners
//--------------------------------------------------------------------
function handleAdd () {
  const qty = Math.max(1, parseInt(els.qtyInput.value, 10) || 1);
  addItemToCart(currentProductId, qty);
  closeProductModal();
}

export function initProductModal () {
  els.addBtn .onclick = handleAdd;
  els.closeBtn.onclick = closeProductModal;

  // fecha ao clicar fora da caixa central
  els.modal.onclick = (e) => {
    if (e.target === els.modal) closeProductModal();
  };
}
