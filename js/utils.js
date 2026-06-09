/* ═══════════════════════════════════════════
   PickMart — utils.js
   Helpers reutilizables: badges, toast, filtros
═══════════════════════════════════════════ */
 
/* ─── API Base URL ──────────────────────── */
// Cambia esta URL por la de tu deploy en producción
const API_BASE = 'http://localhost:3000/api';
 
async function apiFetch(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);
 
  const res = await fetch(`${API_BASE}${endpoint}`, options);
 
  if (res.status === 204) return null; // DELETE exitoso sin contenido
 
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.message || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
 
/* ─── Status Badges ─────────────────────── */
function statusBadge(estado) {
  const map = { 'Pendiente':'badge-orange', 'En Proceso':'badge-blue', 'Completado':'badge-green', 'Cancelado':'badge-red' };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}
function statusBadgeProd(estado) {
  const map = { 'Activo':'badge-green', 'Sin Stock':'badge-red', 'Discontinuado':'badge-gray' };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}
function statusBadgePasillo(estado) {
  const map = { 'Activo':'badge-green', 'En Reposición':'badge-orange', 'Bloqueado':'badge-red' };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}
function statusBadgeTrab(estado) {
  const map = { 'Activo':'badge-green', 'Inactivo':'badge-gray', 'Vacaciones':'badge-blue' };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}
 
/* ─── Toast ─────────────────────────────── */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> ${msg}`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
 
/* ─── Filtros ───────────────────────────── */
function filterTable(tableId, query) {
  const q = query.toLowerCase();
  document.querySelectorAll(`#${tableId} tr`).forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
function filterByCategory(cat) {
  document.querySelectorAll('#productos-table tr').forEach(row => {
    row.style.display = (!cat || row.textContent.includes(cat)) ? '' : 'none';
  });
}
function filterPedidoStatus(status) {
  document.querySelectorAll('#pedidos-table tr').forEach(row => {
    row.style.display = (!status || row.textContent.includes(status)) ? '' : 'none';
  });
}