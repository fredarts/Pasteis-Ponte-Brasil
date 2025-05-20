// js/modules/menu.js
//------------------------------------------------------------
//  Dependências
//------------------------------------------------------------
import { $ }                         from '../utils/domUtils.js';
import { openProductModal }          from './productModal.js';
import { addItemToCart, updateCartIcon } from './cart.js';

//------------------------------------------------------------
//  Elemento-raiz onde os cards serão injectados
//------------------------------------------------------------
const menuGrid = $('#menuGrid');   // <div id="menuGrid"> … </div>

//------------------------------------------------------------
//  Card HTML para um produto
//------------------------------------------------------------
function createProductCard (product) {
  const card           = document.createElement('div');
  card.className       = 'bg-white rounded-lg shadow hover:shadow-lg transition product-card';
  card.dataset.productId = product.id;              // facilita event-delegation

  card.innerHTML = `
    <img src="${product.img}"
         alt="${product.name} – ${product.desc}"
         class="w-full h-70 object-cover rounded-t-lg cursor-pointer product-image" />

    <div class="p-4 space-y-3">
      <h4 class="text-xl font-semibold">${product.name}</h4>

      <div class="flex items-center space-x-3">
        <label for="qty-${product.id}" class="sr-only">Quantidade</label>
        <input  id="qty-${product.id}" type="number" min="1" value="1"
                class="w-20 border px-2 py-1 rounded product-qty" />

        <button class="flex-1 bg-amber-500 hover:bg-amber-600
                       text-white rounded py-2 add-to-cart-btn">
          Adicionar
        </button>
      </div>
    </div>
  `;
  return card;
}

//------------------------------------------------------------
//  Renderiza todos os produtos recebidos
//------------------------------------------------------------
export function renderMenu (products = []) {
  if (!menuGrid) {
    console.error('[menu.js] #menuGrid não encontrado.');
    return;
  }
  menuGrid.innerHTML = '';           // limpa antes de renderizar
  products.forEach(p => menuGrid.appendChild(createProductCard(p)));
}

//------------------------------------------------------------
//  Delegação de eventos para o grid
//------------------------------------------------------------
export function initMenuEventListeners () {
  if (!menuGrid) return;

  menuGrid.addEventListener('click', (e) => {
    const target      = e.target;
    const productCard = target.closest('.product-card');
    if (!productCard) return;                    // clicou fora de um card

    const productId   = parseInt(productCard.dataset.productId, 10);

    // ── Clique na imagem → abrir modal ──────────────────────
    if (target.classList.contains('product-image')) {
      openProductModal(productId);
      return;
    }

    // ── Clique no botão “Adicionar” ─────────────────────────
    if (target.classList.contains('add-to-cart-btn')) {
      const qtyInput = productCard.querySelector('.product-qty');
      const quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);

      addItemToCart(productId, quantity);
      updateCartIcon();                            // badge 🛒

      // feedback visual rápido
      target.textContent = 'Adicionado!';
      target.disabled    = true;
      setTimeout(() => {
        target.textContent = 'Adicionar';
        target.disabled    = false;
      }, 1200);
    }
  });
}
