/* ═══════════════════════════════════════════════════
   PickMart — App Picker (Mobile)
   picker.js
   
   Depende de app.js (que define `data` con pasillos,
   productos, trabajadores y pedidos compartidos)
═══════════════════════════════════════════════════ */

/* ─── ESTADO ─────────────────────────────────────── */
let pickerState = {
  workerId:      null,   // ID del trabajador activo
  activeOrderId: null,   // ID del pedido en curso
  checkedItems:  {},     // { "prodId": true/false }
  activeTab:     'home', // 'home' | 'orders' | 'completed'
};

/* ─── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderLoginCards();
  document.getElementById('btn-login').disabled = true;
});

/* ─── LOGIN ──────────────────────────────────────── */
function renderLoginCards() {
  const container = document.getElementById('login-cards');
  const pickers   = data.trabajadores.filter(t => t.estado === 'Activo');

  container.innerHTML = pickers.map(t => {
    const initials = t.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);
    const pedidos  = data.pedidos.filter(p => p.picker === t.id && p.estado !== 'Completado').length;
    return `
      <div class="login-card" onclick="selectWorker(${t.id}, this)">
        <div class="lc-avatar">${initials}</div>
        <div>
          <div class="lc-name">${t.nombre}</div>
          <div class="lc-shift">${t.turno.split('(')[0].trim()} · ${pedidos} pedido${pedidos !== 1 ? 's' : ''}</div>
        </div>
        <i class="fa-solid fa-chevron-right lc-arrow"></i>
      </div>`;
  }).join('');
}

function selectWorker(id, el) {
  pickerState.workerId = id;
  document.querySelectorAll('.login-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn-login').disabled = false;
}

function doLogin() {
  if (!pickerState.workerId) return;
  showScreen('home');
  renderHome();
  renderOrders();
  renderCompleted();
  updateBadges();
}

/* ─── PANTALLAS ──────────────────────────────────── */
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

/* ─── BOTTOM NAV ─────────────────────────────────── */
function goTab(tab) {
  pickerState.activeTab = tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + tab).classList.add('active');

  if (tab === 'home')      { showScreen('home');      renderHome(); }
  if (tab === 'orders')    { showScreen('orders');    renderOrders(); }
  if (tab === 'completed') { showScreen('completed'); renderCompleted(); }
}

/* ─── HOME ───────────────────────────────────────── */
function renderHome() {
  const worker   = data.trabajadores.find(t => t.id === pickerState.workerId);
  const initials = worker.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);

  // Greeting
  const banner = document.getElementById('home-banner');
  const hour   = new Date().getHours();
  const greet  = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  banner.innerHTML = `
    <div class="greeting-banner">
      <div class="gb-avatar">${initials}</div>
      <div>
        <div class="gb-name">${greet}, ${worker.nombre.split(' ')[0]} 👋</div>
        <div class="gb-role">${worker.rol} · ${worker.turno.split('(')[0].trim()}</div>
      </div>
      <button class="gb-logout" onclick="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>`;

  // Stats
  const mis = data.pedidos.filter(p => p.picker === pickerState.workerId);
  const stats = document.getElementById('home-stats');
  stats.innerHTML = `
    <div class="stat-pills">
      <div class="stat-pill">
        <div class="sp-value" style="color:var(--orange)">${mis.filter(p => p.estado === 'Pendiente').length}</div>
        <div class="sp-label">Pendientes</div>
      </div>
      <div class="stat-pill">
        <div class="sp-value" style="color:var(--blue)">${mis.filter(p => p.estado === 'En Proceso').length}</div>
        <div class="sp-label">En curso</div>
      </div>
      <div class="stat-pill">
        <div class="sp-value" style="color:var(--green-mid)">${mis.filter(p => p.estado === 'Completado').length}</div>
        <div class="sp-label">Listos</div>
      </div>
    </div>`;

  // Next order (first pending or in-process)
  const next = mis.find(p => p.estado === 'Pendiente' || p.estado === 'En Proceso');
  const nextArea = document.getElementById('home-next');
  if (next) {
    nextArea.innerHTML = `
      <div class="section-title">Próximo pedido</div>
      ${orderCardHTML(next, true)}`;
  } else {
    nextArea.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-check-circle" style="color:var(--lime)"></i>
        <p>¡Todo al día!<br>No tienes pedidos pendientes</p>
      </div>`;
  }
}

/* ─── ORDERS ─────────────────────────────────────── */
function renderOrders() {
  const container = document.getElementById('orders-list');
  const active = data.pedidos.filter(
    p => p.picker === pickerState.workerId && (p.estado === 'Pendiente' || p.estado === 'En Proceso')
  );

  document.getElementById('orders-header').textContent =
    active.length ? `${active.length} pedido${active.length !== 1 ? 's' : ''}` : 'Mis Pedidos';

  if (!active.length) {
    container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-clipboard-list"></i><p>No tienes pedidos asignados en este momento</p></div>`;
    return;
  }
  container.innerHTML = active.map(p => orderCardHTML(p, true)).join('');
}

function orderCardHTML(pedido, withButton = false) {
  const statusMap = {
    'Pendiente':  'badge-orange',
    'En Proceso': 'badge-blue',
    'Completado': 'badge-green',
  };
  const esDespacho = pedido.entrega === 'Despacho a domicilio';
  const total      = pedido.items.reduce((s, i) => s + i.qty, 0);

  return `
    <div class="order-card">
      <div class="oc-header">
        <span class="oc-num">#${pedido.num}</span>
        <span class="oc-client">${pedido.cliente}</span>
        <span class="oc-status">
          <span class="badge ${statusMap[pedido.estado] || 'badge-gray'}">${pedido.estado}</span>
        </span>
      </div>
      <div class="oc-meta">
        <span class="oc-chip"><i class="fa-solid fa-box"></i> ${pedido.items.length} productos · ${total} un.</span>
        <span class="oc-chip"><i class="fa-solid ${esDespacho ? 'fa-truck' : 'fa-store'}"></i> ${esDespacho ? 'Despacho' : 'Retiro'}</span>
        ${pedido.direccion ? `<span class="oc-chip"><i class="fa-solid fa-location-dot"></i> ${pedido.direccion}</span>` : ''}
      </div>
      ${withButton ? `
      <div class="oc-footer">
        <button class="btn btn-primary" onclick="startPicking(${pedido.id})">
          <i class="fa-solid fa-cart-flatbed"></i>
          ${pedido.estado === 'En Proceso' ? 'Continuar Picking' : 'Iniciar Picking'}
        </button>
      </div>` : ''}
    </div>`;
}

/* ─── PICKING ────────────────────────────────────── */
function startPicking(orderId) {
  pickerState.activeOrderId = orderId;
  pickerState.checkedItems  = {};

  // Marcar como En Proceso
  const pedido = data.pedidos.find(p => p.id === orderId);
  if (pedido.estado === 'Pendiente') pedido.estado = 'En Proceso';

  showScreen('picking');
  renderPickingScreen(orderId);
  updateBadges();
}

function renderPickingScreen(orderId) {
  const pedido = data.pedidos.find(p => p.id === orderId);
  if (!pedido) return;

  // Header title
  document.getElementById('picking-title').textContent = `#${pedido.num} – ${pedido.cliente.split(' ')[0]}`;

  // Build sorted items
  const items = pedido.items.map(item => {
    const prod = data.productos.find(p => p.id === item.prodId);
    const pas  = prod ? data.pasillos.find(a => a.id === prod.pasillo) : null;
    return { ...item, prod, pas };
  });

  items.sort((a, b) => {
    const pa = a.pas ? a.pas.numero : 99;
    const pb = b.pas ? b.pas.numero : 99;
    if (pa !== pb) return pa - pb;
    return (a.prod?.estante || '').localeCompare(b.prod?.estante || '');
  });

  // Group by aisle
  const groups = {};
  items.forEach(item => {
    const key = item.pas?.id || 0;
    if (!groups[key]) groups[key] = { pas: item.pas, items: [] };
    groups[key].items.push(item);
  });

  // Render progress
  renderPickingProgress(pedido);

  // Render aisles
  const container = document.getElementById('picking-list');
  container.innerHTML = Object.values(groups).map(g => renderAisleBlock(g)).join('');
}

function renderAisleBlock(g) {
  const pas   = g.pas;
  const color = pas ? pas.color : '#888';
  const total = g.items.reduce((s, i) => s + i.qty, 0);

  return `
    <div class="aisle-block">
      <div class="aisle-header" style="background:${color}">
        <div class="aisle-num-badge" style="background:rgba(255,255,255,.2)">
          ${pas ? pas.numero : '?'}
        </div>
        <div>
          <div class="aisle-name">${pas ? pas.nombre : 'Sin ubicación'}</div>
          <div class="aisle-count">${g.items.length} productos · ${total} uds</div>
        </div>
        <div class="aisle-done" id="aisle-done-${pas?.id || 0}">
          0/${g.items.length}
        </div>
      </div>
      ${g.items.map(item => renderPickRow(item)).join('')}
    </div>`;
}

function renderPickRow(item) {
  const sinStock = item.prod?.estado === 'Sin Stock';
  return `
    <div class="pick-row${sinStock ? ' sin-stock' : ''}"
         id="row-${item.prodId}"
         onclick="${sinStock ? `showSinStock(${item.prodId})` : `toggleRow(${item.prodId})`}">
      <div class="pr-check">
        <div class="pr-check-box"></div>
      </div>
      <div class="pr-shelf">${item.prod?.estante || '—'}</div>
      <div class="pr-info">
        <div class="pr-name">${item.prod?.nombre || 'Producto no encontrado'}</div>
        <div class="pr-brand">
          ${item.prod?.marca || ''}
          ${sinStock ? '<span style="color:var(--red);font-weight:600"> · SIN STOCK</span>' : ''}
        </div>
      </div>
      <div class="pr-qty">
        <div class="pr-qty-num">×${item.qty}</div>
        <div class="pr-qty-unit">${item.prod?.unidad || 'un'}</div>
      </div>
    </div>`;
}

function toggleRow(prodId) {
  pickerState.checkedItems[prodId] = !pickerState.checkedItems[prodId];
  const row = document.getElementById('row-' + prodId);
  if (row) row.classList.toggle('checked', pickerState.checkedItems[prodId]);

  const pedido = data.pedidos.find(p => p.id === pickerState.activeOrderId);
  renderPickingProgress(pedido);

  if (pickerState.checkedItems[prodId]) {
    pickerToast('Producto recogido ✓', 'success');
  }
}

function renderPickingProgress(pedido) {
  const total   = pedido.items.length;
  const checked = Object.values(pickerState.checkedItems).filter(Boolean).length;
  const pct     = total ? Math.round((checked / total) * 100) : 0;

  document.getElementById('progress-fill').style.width  = pct + '%';
  document.getElementById('progress-text').textContent  = `${checked} de ${total} productos`;
  document.getElementById('progress-pct').textContent   = pct + '%';

  // Enable/disable complete button
  const canComplete = checked >= total;
  const btn = document.getElementById('btn-complete');
  btn.disabled = !canComplete;
  btn.style.opacity = canComplete ? '1' : '.45';
}

function completePicking() {
  const pedido = data.pedidos.find(p => p.id === pickerState.activeOrderId);
  if (!pedido) return;
  pedido.estado = 'Completado';

  // Render done screen
  const worker = data.trabajadores.find(t => t.id === pickerState.workerId);
  worker.pedidosHoy = (worker.pedidosHoy || 0) + 1;

  document.getElementById('done-num').textContent     = `#${pedido.num}`;
  document.getElementById('done-client').textContent  = pedido.cliente;
  document.getElementById('done-items').textContent   = `${pedido.items.length} productos`;
  document.getElementById('done-entrega').textContent = pedido.entrega;

  showScreen('done');
  updateBadges();
}

function backToOrders() {
  pickerState.activeOrderId = null;
  pickerState.checkedItems  = {};
  goTab('orders');
}

/* ─── COMPLETED ──────────────────────────────────── */
function renderCompleted() {
  const container = document.getElementById('completed-list');
  const done = data.pedidos.filter(
    p => p.picker === pickerState.workerId && p.estado === 'Completado'
  );

  if (!done.length) {
    container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-check-double"></i><p>Aquí aparecerán los pedidos que completes</p></div>`;
    return;
  }

  container.innerHTML = done.reverse().map(p => {
    const total = p.items.reduce((s, i) => s + i.qty, 0);
    const esDespacho = p.entrega === 'Despacho a domicilio';
    return `
      <div class="completed-card">
        <div class="cc-top">
          <span class="cc-num">#${p.num}</span>
          <span class="cc-name">${p.cliente}</span>
          <span class="badge badge-green">Listo</span>
        </div>
        <div class="cc-meta">
          <i class="fa-solid fa-box" style="font-size:11px"></i> ${p.items.length} productos · ${total} un. &nbsp;·&nbsp;
          <i class="fa-solid ${esDespacho ? 'fa-truck' : 'fa-store'}" style="font-size:11px"></i> ${esDespacho ? 'Despacho' : 'Retiro'}
        </div>
      </div>`;
  }).join('');
}

/* ─── SIN STOCK MODAL ────────────────────────────── */
function showSinStock(prodId) {
  const prod = data.productos.find(p => p.id === prodId);
  document.getElementById('sinstock-name').textContent = prod?.nombre || 'Producto';
  document.getElementById('modal-sinstock').classList.add('open');
}

function closeSinStock() {
  document.getElementById('modal-sinstock').classList.remove('open');
}

function markSinStockOk(prodId) {
  // Allow checking it anyway (picker confirms the situation)
  pickerState.checkedItems[prodId] = true;
  const row = document.getElementById('row-' + prodId);
  if (row) row.classList.add('checked');
  closeSinStock();
  const pedido = data.pedidos.find(p => p.id === pickerState.activeOrderId);
  renderPickingProgress(pedido);
  pickerToast('Marcado como gestionado', 'warning');
}

/* ─── BADGES NAV ──────────────────────────────────── */
function updateBadges() {
  const pending = data.pedidos.filter(
    p => p.picker === pickerState.workerId && (p.estado === 'Pendiente' || p.estado === 'En Proceso')
  ).length;

  const dot = document.getElementById('orders-dot');
  if (dot) dot.style.display = pending > 0 ? 'block' : 'none';
}

/* ─── LOGOUT ──────────────────────────────────────── */
function logout() {
  pickerState.workerId      = null;
  pickerState.activeOrderId = null;
  pickerState.checkedItems  = {};
  document.querySelectorAll('.login-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('btn-login').disabled = true;
  showScreen('login');
}

/* ─── TOAST ──────────────────────────────────────── */
function pickerToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${msg}`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 2500);
}