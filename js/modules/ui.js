// js/modules/ui.js
import { $, $$ } from '../utils/domUtils.js';
import { saveUser, applyUserToNavbar } from './account.js';

const cartView     = $('#cartView');
const cartBtn      = $('#cartBtn');
const closeCartBtn = $('#closeCartBtn');

const signupView   = $('#signupView');
const openSignup   = $('#openSignupBtn');
const cancelSignup = $('#cancelSignup');
const signupForm   = $('#signupForm');

function toggleCart (open) {
  cartView.classList.toggle('hidden', !open);
  document.body.classList.toggle('modal-open', open);
}
function toggleSignup (open) {
  signupView.classList.toggle('hidden', !open);
  document.body.classList.toggle('modal-open', open);
}

export function initUIEventListeners () {
  cartBtn     .onclick = () => toggleCart(true);
  closeCartBtn.onclick = () => toggleCart(false);
  cartView    .onclick = e => (e.target === cartView) && toggleCart(false);

  openSignup  .onclick = () => toggleSignup(true);
  cancelSignup.onclick = () => toggleSignup(false);
  signupView  .onclick = e => (e.target === signupView) && toggleSignup(false);

  /* submit do formulário */
  signupForm.onsubmit = (e) => {
    e.preventDefault();
    const data = {
      name      : $('#name').value.trim(),
      phone     : $('#phone').value.trim(),
      email     : $('#email').value.trim(),
      street    : $('#street').value.trim(),
      number    : $('#number').value.trim(),
      zip       : $('#zip').value.trim(),
      city      : $('#city').value.trim(),
      avatarUrl : $('#avatarUrl').value.trim()
    };
    saveUser(data);
    applyUserToNavbar();
    toggleSignup(false);
    alert('Conta criada / atualizada com sucesso!');
  };
}
