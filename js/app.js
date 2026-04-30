/* ═══════════════════════════════════════════════════
   PickMart — app.js  (lógica y UI)
   Requiere: data.js cargado antes que este archivo
═══════════════════════════════════════════════════ */

/* ─── CONSTANTES ─────────────────────────────────── */
const $ = id => document.getElementById(id);

const CATEGORIAS = ['Lácteos','Bebidas','Panadería','Carnes','Frutas y Verduras','Limpieza','Snacks','Congelados'];

// Mapas de colores para badges, unificados en una sola función
const BADGE_MAPS = {
  pedido:     { 'Pendiente':'badge-orange', 'En Proceso':'badge-blue',   'Completado':'badge-green', 'Cancelado':'badge-red'  },
  producto:   { 'Activo':'badge-green',     'Sin Stock':'badge-red',     'Discontinuado':'badge-gray' },
  pasillo:    { 'Activo':'badge-green',     'En Reposición':'badge-orange', 'Bloqueado':'badge-red'  },
  trabajador: { 'Activo':'badge-green',     'Inactivo':'badge-gray',     'Vacaciones':'badge-blue'   },
};
const badge = (estado, ctx = 'pedido') =>
  `<span class="badge ${(BADGE_MAPS[ctx] || {})[estado] || 'badge-gray'}">${estado}</span>`;

/* ─── MAPAS DE CAMPOS (para helpers genéricos) ───── */
// Cada mapa: { clave_objeto: 'id-del-input' }
// types: 'int' | 'upper' | (por defecto) string trimmed
const F_PROD  = { codigo:'prod-codigo', nombre:'prod-nombre', categoria:'prod-categoria', marca:'prod-marca', pasillo:'prod-pasillo', estante:'prod-estante', stock:'prod-stock', stockMin:'prod-stock-min', unidad:'prod-unidad', estado:'prod-estado' };
const T_PROD  = { pasillo:'int', stock:'int', stockMin:'int', estante:'upper' };

const F_PAS   = { numero:'pas-numero', nombre:'pas-nombre', categoria:'pas-categoria', estantes:'pas-estantes', color:'pas-color', estado:'pas-estado', notas:'pas-notas' };
const T_PAS   = { numero:'int', estantes:'int' };

const F_TRAB  = { nombre:'trab-nombre', rut:'trab-rut', turno:'trab-turno', rol:'trab-rol', tel:'trab-tel', estado:'trab-estado' };

const F_PED   = { cliente:'ped-cliente', tel:'ped-tel', direccion:'ped-dir', entrega:'ped-entrega', picker:'ped-picker' };
const T_PED   = { picker:'int' };

/* ─── HELPERS DE FORMULARIOS ─────────────────────── */
function fillForm(fields, obj) {
  Object.entries(fields).forEach(([key, id]) => { const el=$(id); if (el) el.value = obj[key] ?? ''; });
}

function readForm(fields, types = {}) {
  const out = {};
  Object.entries(fields).forEach(([key, id]) => {
    const v = $(id).value;
    out[key] = types[key] === 'int'   ? (parseInt(v) || 0)
             : types[key] === 'upper' ? v.trim().toUpperCase()
             : v.trim();
  });
  return out;
}

function clearForm(ids) {
  ids.forEach(id => { $(id).value = ''; });
}

/* ─── ESTADO DE EDICIÓN ──────────────────────────── */
let editingId       = {};
let confirmCallback = null;
let pedidoLines     = [];

/* ─── NAVEGACIÓN ─────────────────────────────────── */
function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  $('view-' + view).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.textContent.toLowerCase().includes(view)) n.classList.add('active');
  });

  const titles = { dashboard:'Dashboard', productos:'Productos', pasillos:'Pasillos', trabajadores:'Trabajadores', pedidos:'Pedidos', picking:'Lista de Picking' };
  $('topbar-title').textContent = titles[view] || view;
  renderAll();
}

/* ─── RENDER COORDINADOR ─────────────────────────── */
function renderAll() {
  renderDashboard();
  renderProductos();
  renderPasillos();
  renderTrabajadores();
  renderPedidos();
  populateSelects();
  renderPickingSelect();
}

/* ─── DASHBOARD ──────────────────────────────────── */
function renderDashboard() {
  $('dash-orders-table').innerHTML = data.pedidos.slice(-5).reverse().map(p => {
    const t = data.trabajadores.find(t => t.id === p.picker);
    return `<tr>
      <td><span class="text-mono">#${p.num}</span></td>
      <td>${p.cliente}</td>
      <td><span class="badge badge-gray">${p.items.length} items</span></td>
      <td>${badge(p.estado)}</td>
      <td>${t ? t.nombre.split(' ')[0] : '—'}</td>
    </tr>`;
  }).join('');

  const lowStock = data.productos.filter(p => p.stock <= p.stockMin);
  $('low-stock-table').innerHTML = lowStock.map(p => {
    const pas = data.pasillos.find(a => a.id === p.pasillo);
    return `<tr>
      <td>${p.nombre}</td>
      <td>${pas ? `<span class="aisle-pill" style="color:${pas.color};border-color:${pas.color}20;background:${pas.color}15">P${pas.numero}</span>` : '—'}</td>
      <td><span class="badge ${p.stock === 0 ? 'badge-red' : 'badge-orange'}">${p.stock} ${p.unidad}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">Sin alertas</td></tr>';

  const pendientes = data.pedidos.filter(p => p.estado === 'Pendiente').length;
  const badgeEl = $('pendientes-badge');
  badgeEl.textContent    = pendientes;
  badgeEl.style.display  = pendientes > 0 ? '' : 'none';
}

/* ─── PRODUCTOS ──────────────────────────────────── */
function renderProductos() {
  $('productos-table').innerHTML = data.productos.map(p => {
    const pas = data.pasillos.find(a => a.id === p.pasillo);
    return `<tr>
      <td><span class="text-mono" style="font-size:11px">${p.codigo}</span></td>
      <td>${p.nombre}</td>
      <td><span class="badge badge-gray">${p.categoria}</span></td>
      <td>${pas
        ? `<span class="aisle-pill" style="color:${pas.color};border-color:${pas.color}40;background:${pas.color}15">
             <i class="fa-solid fa-map-pin" style="font-size:10px"></i> P${pas.numero} – ${pas.nombre.split(' ')[0]}
           </span>`
        : '—'}</td>
      <td><span class="text-mono" style="background:var(--surface2);padding:2px 7px;border-radius:4px">${p.estante}</span></td>
      <td><span class="badge ${p.stock === 0 ? 'badge-red' : p.stock <= p.stockMin ? 'badge-orange' : 'badge-green'}">${p.stock} ${p.unidad}</span></td>
      <td>${badge(p.estado, 'producto')}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editProducto(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('producto',${p.id},'${p.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-box"></i><p>No hay productos registrados</p></div></td></tr>';

  $('productos-count').textContent = `${data.productos.length} productos`;
}

/* ─── PASILLOS ───────────────────────────────────── */
function renderPasillos() {
  $('pasillos-table').innerHTML = data.pasillos.map(p => {
    const count = data.productos.filter(pr => pr.pasillo === p.id).length;
    return `<tr>
      <td><span class="aisle-pill" style="color:${p.color};border-color:${p.color}50;background:${p.color}15;font-size:15px;font-weight:700">P${p.numero}</span></td>
      <td style="font-weight:600">${p.nombre}</td>
      <td><span class="badge badge-gray">${p.categoria}</span></td>
      <td>${p.estantes}</td>
      <td><span class="badge badge-blue">${count} productos</span></td>
      <td>${badge(p.estado, 'pasillo')}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editPasillo(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('pasillo',${p.id},'${p.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

/* ─── TRABAJADORES ───────────────────────────────── */
function renderTrabajadores() {
  $('trabajadores-table').innerHTML = data.trabajadores.map(t => {
    const initials = t.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);
    return `<tr>
      <td><span class="text-mono">T-00${t.id}</span></td>
      <td style="display:flex;align-items:center;gap:9px">
        <div class="user-avatar" style="background:var(--green-acc);width:28px;height:28px;font-size:11px">${initials}</div>
        ${t.nombre}
      </td>
      <td>${t.turno.split(' ')[1]}</td>
      <td><span class="badge badge-dark">${t.pedidosHoy}</span></td>
      <td>${t.pedidoActual !== '-'
        ? `<span class="text-mono" style="color:var(--blue)">${t.pedidoActual}</span>`
        : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td>${badge(t.estado, 'trabajador')}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editTrabajador(${t.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('trabajador',${t.id},'${t.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

/* ─── PEDIDOS ────────────────────────────────────── */
function renderPedidos() {
  $('pedidos-table').innerHTML = data.pedidos.map(p => {
    const t = data.trabajadores.find(t => t.id === p.picker);
    const esDespacho = p.entrega === 'Despacho a domicilio';
    return `<tr>
      <td><span class="text-mono">#${p.num}</span></td>
      <td>
        <div style="font-weight:500">${p.cliente}</div>
        <div style="font-size:11.5px;color:var(--text-muted)">${p.tel}</div>
      </td>
      <td style="font-size:12.5px;color:var(--text-muted)">${p.fecha}</td>
      <td><span class="badge ${esDespacho ? 'badge-blue' : 'badge-gray'}">
        <i class="fa-solid ${esDespacho ? 'fa-truck' : 'fa-store'}" style="font-size:10px"></i>
        ${esDespacho ? 'Despacho' : 'Retiro'}
      </span></td>
      <td><span class="badge badge-gray">${p.items.length} items</span></td>
      <td>${t ? t.nombre.split(' ')[0] : '—'}</td>
      <td>${badge(p.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-dark"    onclick="openPickingForOrder(${p.id})" title="Ver picking"><i class="fa-solid fa-cart-flatbed"></i></button>
        <button class="btn btn-xs btn-outline" onclick="editPedido(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('pedido',${p.id},'pedido #${p.num}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

/* ─── PICKING ────────────────────────────────────── */
function renderPickingSelect() {
  const sel = $('picking-order-select');
  const current = sel.value;
  sel.innerHTML = '<option value="">— Seleccionar pedido —</option>' +
    data.pedidos
      .filter(p => p.estado !== 'Completado')
      .map(p => `<option value="${p.id}">#${p.num} – ${p.cliente} (${p.estado})</option>`)
      .join('');
  if (current) sel.value = current;
}

function openPickingForOrder(orderId) {
  navigate('picking');
  $('picking-order-select').value = orderId;
  renderPicking();
}

function renderPicking() {
  const orderId   = parseInt($('picking-order-select').value);
  const container = $('picking-container');

  if (!orderId) {
    container.innerHTML = `
      <div class="empty-state panel" style="border-radius:var(--radius)">
        <i class="fa-solid fa-cart-flatbed"></i>
        <p>Selecciona un pedido para generar la lista de picking optimizada</p>
      </div>`;
    return;
  }

  const pedido = data.pedidos.find(p => p.id === orderId);
  if (!pedido) return;

  const pickItems = pedido.items.map(item => {
    const prod = data.productos.find(p => p.id === item.prodId);
    const pas  = prod ? data.pasillos.find(a => a.id === prod.pasillo) : null;
    return { ...item, prod, pas };
  }).sort((a, b) => {
    const pa = a.pas?.numero ?? 99, pb = b.pas?.numero ?? 99;
    return pa !== pb ? pa - pb : (a.prod?.estante || '').localeCompare(b.prod?.estante || '');
  });

  // Agrupar por pasillo
  const groups = {};
  pickItems.forEach(item => {
    const key = item.pas?.id ?? 0;
    if (!groups[key]) groups[key] = { pas: item.pas, items: [] };
    groups[key].items.push(item);
  });

  const picker = data.trabajadores.find(t => t.id === pedido.picker);
  const total  = pedido.items.reduce((s, i) => s + i.qty, 0);

  container.innerHTML = `
    <div class="panel" style="margin-bottom:16px">
      <div style="padding:16px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700">#${pedido.num}</div>
          <div style="font-size:13px;color:var(--text-muted)">${pedido.cliente} · ${pedido.entrega}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:10px;align-items:center">
          <span class="badge badge-blue"><i class="fa-solid fa-user" style="font-size:10px"></i> ${picker ? picker.nombre.split(' ')[0] : '—'}</span>
          <span class="badge badge-gray">${pedido.items.length} productos · ${total} unidades</span>
          ${badge(pedido.estado)}
        </div>
      </div>
    </div>
    ${Object.values(groups).map(renderPickingGroup).join('')}
    <div style="margin-top:16px;padding:14px 18px;background:var(--lime-light);border:1.5px solid var(--lime);border-radius:var(--radius);display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--green-dark)">
      <i class="fa-solid fa-route"></i>
      Ruta optimizada: ${Object.keys(groups).length} pasillos · ${pickItems.length} productos
    </div>`;
}

function renderPickingGroup(g) {
  const pas   = g.pas;
  const color = pas?.color || '#888';
  const total = g.items.reduce((s, i) => s + i.qty, 0);
  return `
    <div class="picking-section">
      <div class="picking-aisle-header" style="background:${color}dd">
        <div class="aisle-number" style="background:rgba(255,255,255,.9);color:${color}">${pas?.numero ?? '?'}</div>
        <div class="aisle-info">
          <h4>${pas?.nombre || 'Sin ubicación'}</h4>
          <p>${g.items.length} producto${g.items.length !== 1 ? 's' : ''} · ${total} unidades totales</p>
        </div>
        <div class="aisle-progress">
          <div style="font-size:11px;opacity:.8">0 / ${g.items.length}</div>
          <div class="aisle-progress-bar"><div class="aisle-progress-fill" style="width:0%"></div></div>
        </div>
      </div>
      ${g.items.map((item, idx) => `
        <div class="picking-item" id="pick-${pas?.id ?? 0}-${idx}" onclick="togglePickItem(this)">
          <div class="pick-check"></div>
          <div class="pick-shelf">${item.prod?.estante || '—'}</div>
          <div class="pick-name">
            <div>${item.prod?.nombre || 'Producto no encontrado'}</div>
            <div style="font-size:11.5px;color:var(--text-muted)">${item.prod?.codigo || ''} · ${item.prod?.marca || ''}</div>
          </div>
          <div class="pick-qty">×${item.qty}</div>
          <div class="pick-unit">${item.prod?.unidad || 'un'}</div>
        </div>`).join('')}
    </div>`;
}

function togglePickItem(el) {
  el.classList.toggle('checked');
  const picked = el.classList.contains('checked');
  toast(picked ? '✓ Producto recogido' : 'Producto desmarcado', picked ? 'success' : '');
}

function printPicking() { window.print(); }

/* ─── POPULATE SELECTS ───────────────────────────── */
function populateSelects() {
  // Categorías: llena los 3 selects de categoría si aún no tienen opciones
  ['prod-categoria', 'pas-categoria', 'filter-categoria'].forEach(id => {
    const el = $(id);
    if (!el || el.options.length > 1) return;
    CATEGORIAS.forEach(c => el.add(new Option(c, c)));
  });

  $('prod-pasillo').innerHTML =
    data.pasillos.map(p => `<option value="${p.id}">P${p.numero} – ${p.nombre}</option>`).join('');

  $('ped-picker').innerHTML =
    data.trabajadores
      .filter(t => t.estado === 'Activo')
      .map(t => `<option value="${t.id}">${t.nombre}</option>`)
      .join('');
}

/* ─── MODAL HELPERS ──────────────────────────────── */
const openModal  = id => $(id).classList.add('open');
const closeModal = id => { $(id).classList.remove('open'); editingId[id] = null; };

document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

/* ─── PRODUCTO CRUD ──────────────────────────────── */
function editProducto(id) {
  const p = data.productos.find(x => x.id === id);
  if (!p) return;
  populateSelects();
  $('modal-producto-title').textContent = 'Editar Producto';
  fillForm(F_PROD, p);
  editingId['modal-producto'] = id;
  openModal('modal-producto');
}

function saveProducto() {
  const vals = readForm(F_PROD, T_PROD);
  if (!vals.nombre || !vals.codigo) { toast('Completa los campos requeridos', 'error'); return; }

  const id = editingId['modal-producto'];
  if (id) {
    const idx = data.productos.findIndex(x => x.id === id);
    data.productos[idx] = { ...data.productos[idx], ...vals };
    toast('Producto actualizado');
  } else {
    data.productos.push({ id: Date.now(), ...vals });
    toast('Producto creado');
  }

  closeModal('modal-producto');
  $('modal-producto-title').textContent = 'Nuevo Producto';
  clearForm(['prod-codigo','prod-nombre','prod-marca','prod-estante','prod-stock','prod-stock-min']);
  renderAll();
}

/* ─── PASILLO CRUD ───────────────────────────────── */
function editPasillo(id) {
  const p = data.pasillos.find(x => x.id === id);
  if (!p) return;
  $('modal-pasillo-title').textContent = 'Editar Pasillo';
  fillForm(F_PAS, p);
  editingId['modal-pasillo'] = id;
  openModal('modal-pasillo');
}

function savePasillo() {
  const vals = readForm(F_PAS, T_PAS);
  if (!vals.nombre) { toast('El nombre es requerido', 'error'); return; }

  const id = editingId['modal-pasillo'];
  if (id) {
    const idx = data.pasillos.findIndex(x => x.id === id);
    data.pasillos[idx] = { ...data.pasillos[idx], ...vals };
    toast('Pasillo actualizado');
  } else {
    data.pasillos.push({ id: Date.now(), ...vals });
    toast('Pasillo creado');
  }

  closeModal('modal-pasillo');
  $('modal-pasillo-title').textContent = 'Nuevo Pasillo';
  clearForm(['pas-numero','pas-nombre','pas-estantes','pas-notas']);
  renderAll();
}

/* ─── TRABAJADOR CRUD ────────────────────────────── */
function editTrabajador(id) {
  const t = data.trabajadores.find(x => x.id === id);
  if (!t) return;
  $('modal-trabajador-title').textContent = 'Editar Trabajador';
  fillForm(F_TRAB, t);
  editingId['modal-trabajador'] = id;
  openModal('modal-trabajador');
}

function saveTrabajador() {
  const vals = readForm(F_TRAB);
  if (!vals.nombre) { toast('El nombre es requerido', 'error'); return; }

  const id = editingId['modal-trabajador'];
  if (id) {
    const idx = data.trabajadores.findIndex(x => x.id === id);
    data.trabajadores[idx] = { ...data.trabajadores[idx], ...vals };
    toast('Trabajador actualizado');
  } else {
    data.trabajadores.push({ id: Date.now(), ...vals, pedidosHoy: 0, pedidoActual: '-' });
    toast('Trabajador creado');
  }

  closeModal('modal-trabajador');
  renderAll();
}

/* ─── PEDIDO CRUD ────────────────────────────────── */
function addPedidoLine(prodId = '', qty = 1) {
  pedidoLines.push({ lineId: Date.now() + Math.random(), prodId, qty });
  renderPedidoLines();
}

function renderPedidoLines() {
  const container = $('pedido-lines');
  if (!pedidoLines.length) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:12px">Sin productos aún</p>';
    return;
  }
  container.innerHTML = pedidoLines.map(line => `
    <div style="display:grid;grid-template-columns:1fr 80px 30px;gap:8px;margin-bottom:8px;align-items:center">
      <select onchange="updateLine('${line.lineId}','prodId',this.value)"
        style="border:1.5px solid var(--border);border-radius:7px;padding:7px 10px;font-family:'DM Sans',sans-serif;font-size:13px">
        <option value="">— Producto —</option>
        ${data.productos.map(p => `<option value="${p.id}" ${p.id == line.prodId ? 'selected' : ''}>${p.nombre}</option>`).join('')}
      </select>
      <input type="number" min="1" value="${line.qty}"
        onchange="updateLine('${line.lineId}','qty',parseInt(this.value)||1)"
        style="border:1.5px solid var(--border);border-radius:7px;padding:7px 10px;font-family:'DM Sans',sans-serif;font-size:13px;text-align:center">
      <button onclick="removeLine('${line.lineId}')" class="btn btn-xs btn-danger"
        style="width:28px;height:28px;padding:0;justify-content:center">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>`).join('');
}

function updateLine(lineId, key, val) {
  const line = pedidoLines.find(l => l.lineId == lineId);
  if (line) line[key] = key === 'qty' ? (parseInt(val) || 1) : val;
}

function removeLine(lineId) {
  pedidoLines = pedidoLines.filter(l => l.lineId != lineId);
  renderPedidoLines();
}

function editPedido(id) {
  const p = data.pedidos.find(x => x.id === id);
  if (!p) return;
  populateSelects();
  $('modal-pedido-title').textContent = 'Editar Pedido';
  fillForm(F_PED, p);
  pedidoLines = p.items.map(i => ({ lineId: Date.now() + Math.random(), prodId: i.prodId, qty: i.qty }));
  renderPedidoLines();
  editingId['modal-pedido'] = id;
  openModal('modal-pedido');
}

function savePedido() {
  const vals = {
    ...readForm(F_PED, T_PED),
    items: pedidoLines.filter(l => l.prodId).map(l => ({ prodId: parseInt(l.prodId), qty: l.qty })),
  };
  if (!vals.cliente)      { toast('El nombre del cliente es requerido', 'error'); return; }
  if (!vals.items.length) { toast('Agrega al menos un producto', 'error'); return; }

  const id = editingId['modal-pedido'];
  if (id) {
    const idx = data.pedidos.findIndex(x => x.id === id);
    data.pedidos[idx] = { ...data.pedidos[idx], ...vals };
    toast('Pedido actualizado');
  } else {
    data.pedidos.push({
      id: Date.now(),
      num: 'P-' + (2029 + data.pedidos.length),
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      ...vals,
    });
    toast('Pedido creado');
  }

  pedidoLines = [];
  closeModal('modal-pedido');
  renderAll();
}

/* ─── CONFIRMAR ELIMINACIÓN ──────────────────────── */
function confirmDelete(type, id, name) {
  $('confirm-msg').textContent = `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`;

  $('confirm-ok-btn').onclick = () => {
    const keys = { producto:'productos', pasillo:'pasillos', trabajador:'trabajadores', pedido:'pedidos' };
    if (keys[type]) data[keys[type]] = data[keys[type]].filter(x => x.id !== id);
    closeModal('modal-confirm');
    renderAll();
    toast('Registro eliminado', 'error');
  };

  openModal('modal-confirm');
}

/* ─── FILTROS ────────────────────────────────────── */
function filterTable(tableId, query) {
  const q = query.toLowerCase();
  document.querySelectorAll(`#${tableId} tr`).forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// filterByCategory y filterPedidoStatus son casos especiales de filterTable
const filterByCategory  = cat  => filterTable('productos-table', cat);
const filterPedidoStatus = st  => filterTable('pedidos-table', st);

/* ─── TOAST ──────────────────────────────────────── */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> ${msg}`;
  $('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ─── INIT ───────────────────────────────────────── */
renderAll();