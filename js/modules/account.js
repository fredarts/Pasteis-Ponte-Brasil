// js/modules/account.js
import { $, $$ } from '../utils/domUtils.js';

const LS_KEY = 'ppb-user';

export function saveUser (data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function loadUser () {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; }
  catch { return null; }
}

export function applyUserToNavbar () {
  const user = loadUser();
  if (!user) return;

  $('#userName').textContent       = user.name || 'Usuário';
  if (user.avatarUrl)
    $('#userAvatar').src           = user.avatarUrl;
}
