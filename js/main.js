// js/main.js
//--------------------------------------------------------------------
//  Módulos
//--------------------------------------------------------------------
import { getAllProducts }                                                from './modules/productCatalog.js';
import { renderMenu, initMenuEventListeners }                            from './modules/menu.js';
import { initProductModal }                                              from './modules/productModal.js';
import { initCart, updateCartIcon, onCartUpdate, getCartSummary }        from './modules/cart.js';
import { initUIEventListeners }                                          from './modules/ui.js';
import { generateWhatsAppMessage, updateWhatsAppLinks }                  from './modules/whatsapp.js';
import { applyUserToNavbar } from './modules/account.js';

//--------------------------------------------------------------------
//  Função principal
//--------------------------------------------------------------------
function initializeApp () {
  /* 1 ▸ Produtos --------------------------------------------------- */
  const products = getAllProducts();

  /* 2 ▸ Menu (cards + click-handlers) ------------------------------ */
  renderMenu(products);
  initMenuEventListeners();         // add-to-cart + abrir modal

  /* 3 ▸ Modal de Produto ------------------------------------------ */
  initProductModal(products);       // preencher / abrir / fechar

  /* 4 ▸ Carrinho --------------------------------------------------- */
  initCart();                       // cria estrutura + lê localStorage
  updateCartIcon();                 // nº de itens no sino 🛒

  /* 5 ▸ UI genérica (abrir/fechar carrinho, etc.) ------------------ */
  initUIEventListeners();

  /* 6 ▸ WhatsApp --------------------------------------------------- */
  syncWhatsAppLinks();              // primeira geração

  // Sempre que o carrinho mudar → regenerar mensagem + atualizar links
  onCartUpdate(syncWhatsAppLinks);

  console.info('🚀 Pastéis da Ponte Brasil – app inicializada!');
}

/* ------------------------------------------------------------------ */
/* Helper: gera msg WA e injeta nos links de CTA + Checkout           */
/* ------------------------------------------------------------------ */
function syncWhatsAppLinks () {
  const { items, total } = getCartSummary();  // do módulo cart.js
  const products         = getAllProducts();  // para resolver nomes
  const message          = generateWhatsAppMessage(items, products, total);
  updateWhatsAppLinks(message);
}

/* ------------------------------------------------------------------ */
/* Dispara inicialização quando DOM estiver pronto                    */
/* ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', initializeApp);
