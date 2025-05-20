// js/modules/whatsapp.js
// -------------------------------------------------------------
// Gera mensagem e liga/actualiza todos os botões de WhatsApp
// -------------------------------------------------------------
import { $ } from '../utils/domUtils.js';

const PHONE = '351910000000';          // ⬅️ coloca aqui o nº real (apenas dígitos)

export function generateWhatsAppMessage (cartItems = [], products = [], total = 0) {
  if (!cartItems.length) return 'Olá! Gostaria de pedir alguns pastéis.';

  const linhas = cartItems.map(i => {
    const p = products.find(pr => pr.id === i.id) || { name: 'Produto' };
    return `${i.qty}× ${p.name}`;
  });

  linhas.push(`Total: €${total.toFixed(2)}`);

  return `Olá! Gostaria de pedir:\n${linhas.join('\n')}`;
}

/**
 * Actualiza o href do CTA flutuante (#whatsappCtaBtn)
 * e liga o click do botão “Finalizar” (#checkoutBtn).
 * É chamada sempre que o carrinho é alterado.
 */
export function updateWhatsAppLinks (message = '') {
  const link = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  /* CTA flutuante (é <a>) */
  const cta = $('#whatsappCtaBtn');
  if (cta) cta.href = link;

  /* Botão do carrinho (pode ser <button> ou <a>) */
  const checkout = $('#checkoutBtn');
  if (!checkout) return;

  /* Se fores trocar para <a>, basta definir href */
  if (checkout.tagName.toLowerCase() === 'a') {
    checkout.href = link;
  } else {
    /* Mantendo como <button> — abre a nova janela */
    checkout.onclick = () => {
      window.open(link, '_blank');
      /* (Opcional) limpar carrinho depois do clique:
         import { clearCart } from './cart.js'; clearCart();
      */
    };
  }
}
