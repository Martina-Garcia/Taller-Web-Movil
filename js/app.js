/* ═══════════════════════════════════════════════════
   PickMart — Sistema de Picking
   app.js
═══════════════════════════════════════════════════ */
 
/* ─── DATA ──────────────────────────────────────── */
let data = {
  pasillos: [
    { id:1, numero:1, nombre:'Lácteos y Huevos',       categoria:'Lácteos',           estantes:5, color:'#52b788', estado:'Activo',        notas:'Refrigerado. Revisar temperatura.' },
    { id:2, numero:2, nombre:'Bebidas y Jugos',         categoria:'Bebidas',           estantes:6, color:'#2b6cb0', estado:'Activo',        notas:'' },
    { id:3, numero:3, nombre:'Panadería y Cereales',    categoria:'Panadería',         estantes:4, color:'#c68642', estado:'Activo',        notas:'Productos de alta rotación.' },
    { id:4, numero:4, nombre:'Carnes y Embutidos',      categoria:'Carnes',            estantes:3, color:'#c0392b', estado:'Activo',        notas:'Zona refrigerada.' },
    { id:5, numero:5, nombre:'Frutas y Verduras',       categoria:'Frutas y Verduras', estantes:4, color:'#74c442', estado:'Activo',        notas:'Sección de pesaje.' },
    { id:6, numero:6, nombre:'Limpieza y Aseo',         categoria:'Limpieza',          estantes:5, color:'#9b59b6', estado:'Activo',        notas:'' },
    { id:7, numero:7, nombre:'Snacks y Confites',       categoria:'Snacks',            estantes:4, color:'#e07b39', estado:'En Reposición', notas:'Faltan productos en estante B.' },
    { id:8, numero:8, nombre:'Congelados',              categoria:'Congelados',        estantes:3, color:'#1a7abf', estado:'Activo',        notas:'' },
  ],
  productos: [
    { id:1,  codigo:'780000100001', nombre:'Leche Entera 1L',        categoria:'Lácteos',           marca:'Colun',     pasillo:1, estante:'A1', stock:24, stockMin:10, unidad:'un', estado:'Activo' },
    { id:2,  codigo:'780000100002', nombre:'Yogurt Natural 180g',    categoria:'Lácteos',           marca:'Soprole',   pasillo:1, estante:'A2', stock:15, stockMin:8,  unidad:'un', estado:'Activo' },
    { id:3,  codigo:'780000100003', nombre:'Queso Gouda 200g',       categoria:'Lácteos',           marca:'Colun',     pasillo:1, estante:'B1', stock:3,  stockMin:6,  unidad:'un', estado:'Sin Stock' },
    { id:4,  codigo:'780000100004', nombre:'Jugo de Naranja 1L',     categoria:'Bebidas',           marca:"Watt's",    pasillo:2, estante:'A1', stock:30, stockMin:12, unidad:'un', estado:'Activo' },
    { id:5,  codigo:'780000100005', nombre:'Agua Mineral 1.5L',      categoria:'Bebidas',           marca:'Cachantun', pasillo:2, estante:'B2', stock:50, stockMin:20, unidad:'un', estado:'Activo' },
    { id:6,  codigo:'780000100006', nombre:'Coca-Cola 2L',           categoria:'Bebidas',           marca:'Coca-Cola', pasillo:2, estante:'C1', stock:18, stockMin:10, unidad:'un', estado:'Activo' },
    { id:7,  codigo:'780000100007', nombre:'Pan Molde Integral',     categoria:'Panadería',         marca:'Ideal',     pasillo:3, estante:'A1', stock:7,  stockMin:6,  unidad:'un', estado:'Activo' },
    { id:8,  codigo:'780000100008', nombre:'Avena 500g',             categoria:'Panadería',         marca:'Quaker',    pasillo:3, estante:'B3', stock:12, stockMin:8,  unidad:'un', estado:'Activo' },
    { id:9,  codigo:'780000100009', nombre:'Pollo Entero kg',        categoria:'Carnes',            marca:'Agrosuper', pasillo:4, estante:'A1', stock:0,  stockMin:4,  unidad:'kg', estado:'Sin Stock' },
    { id:10, codigo:'780000100010', nombre:'Tomate kg',              categoria:'Frutas y Verduras', marca:'',          pasillo:5, estante:'A2', stock:8,  stockMin:5,  unidad:'kg', estado:'Activo' },
    { id:11, codigo:'780000100011', nombre:'Detergente Líquido 3L',  categoria:'Limpieza',          marca:'Omo',       pasillo:6, estante:'C2', stock:9,  stockMin:6,  unidad:'un', estado:'Activo' },
    { id:12, codigo:'780000100012', nombre:'Papas Fritas 200g',      categoria:'Snacks',            marca:'Lays',      pasillo:7, estante:'A1', stock:22, stockMin:10, unidad:'un', estado:'Activo' },
    { id:13, codigo:'780000100013', nombre:'Helado Vainilla 1L',     categoria:'Congelados',        marca:'Bresler',   pasillo:8, estante:'A1', stock:4,  stockMin:4,  unidad:'un', estado:'Activo' },
    { id:14, codigo:'780000100014', nombre:'Mantequilla 200g',       categoria:'Lácteos',           marca:'Colun',     pasillo:1, estante:'C1', stock:2,  stockMin:5,  unidad:'un', estado:'Sin Stock' },
    { id:15, codigo:'780000100015', nombre:'Fideos Tallarines 400g', categoria:'Panadería',         marca:'Carozzi',   pasillo:3, estante:'D2', stock:20, stockMin:8,  unidad:'un', estado:'Activo' },
  ],
  trabajadores: [
    { id:1, nombre:'Carlos Martínez', rut:'12.345.678-9', turno:'Turno A (08:00-16:00)', rol:'Picker',     tel:'+56 9 8765 4321', estado:'Activo',     pedidosHoy:5, pedidoActual:'#P-2024' },
    { id:2, nombre:'Ana Rodríguez',   rut:'13.456.789-0', turno:'Turno A (08:00-16:00)', rol:'Picker',     tel:'+56 9 7654 3210', estado:'Activo',     pedidosHoy:4, pedidoActual:'#P-2025' },
    { id:3, nombre:'Jorge Pérez',     rut:'14.567.890-1', turno:'Turno B (16:00-00:00)', rol:'Supervisor', tel:'+56 9 6543 2109', estado:'Activo',     pedidosHoy:0, pedidoActual:'-' },
    { id:4, nombre:'Valentina López', rut:'15.678.901-2', turno:'Turno A (08:00-16:00)', rol:'Picker',     tel:'+56 9 5432 1098', estado:'Vacaciones', pedidosHoy:0, pedidoActual:'-' },
    { id:5, nombre:'Diego Soto',      rut:'16.789.012-3', turno:'Turno B (16:00-00:00)', rol:'Picker',     tel:'+56 9 4321 0987', estado:'Activo',     pedidosHoy:3, pedidoActual:'-' },
  ],
  pedidos: [
    { id:1, num:'P-2020', cliente:'María González',  tel:'+56 9 1234 5678', direccion:'Av. Providencia 1234, Dpto 5', entrega:'Despacho a domicilio', picker:1, estado:'Completado', fecha:'2026-04-20', items:[{prodId:1,qty:2},{prodId:4,qty:3},{prodId:7,qty:1}] },
    { id:2, num:'P-2021', cliente:'Roberto Fuentes', tel:'+56 9 2345 6789', direccion:'',                             entrega:'Retiro en tienda',     picker:2, estado:'Completado', fecha:'2026-04-20', items:[{prodId:5,qty:6},{prodId:8,qty:2},{prodId:12,qty:3}] },
    { id:3, num:'P-2022', cliente:'Claudia Muñoz',   tel:'+56 9 3456 7890', direccion:'Los Leones 567, Las Condes',   entrega:'Despacho a domicilio', picker:1, estado:'Completado', fecha:'2026-04-20', items:[{prodId:2,qty:2},{prodId:10,qty:1},{prodId:11,qty:1}] },
    { id:4, num:'P-2023', cliente:'Felipe Torres',   tel:'+56 9 4567 8901', direccion:'',                             entrega:'Retiro en tienda',     picker:2, estado:'Completado', fecha:'2026-04-20', items:[{prodId:13,qty:2},{prodId:6,qty:2}] },
    { id:5, num:'P-2024', cliente:'Isabel Reyes',    tel:'+56 9 5678 9012', direccion:'Ñuñoa, Los Militares 45',     entrega:'Despacho a domicilio', picker:1, estado:'En Proceso',  fecha:'2026-04-20', items:[{prodId:1,qty:1},{prodId:2,qty:2},{prodId:7,qty:1},{prodId:15,qty:2},{prodId:10,qty:2}] },
    { id:6, num:'P-2025', cliente:'Andrés Castro',   tel:'+56 9 6789 0123', direccion:'Maipú Centro 800',            entrega:'Despacho a domicilio', picker:2, estado:'En Proceso',  fecha:'2026-04-20', items:[{prodId:4,qty:4},{prodId:5,qty:3},{prodId:12,qty:2},{prodId:11,qty:1}] },
    { id:7, num:'P-2026', cliente:'Sofía Herrera',   tel:'+56 9 7890 1234', direccion:'',                             entrega:'Retiro en tienda',     picker:5, estado:'Pendiente',   fecha:'2026-04-20', items:[{prodId:6,qty:2},{prodId:8,qty:1},{prodId:13,qty:1}] },
    { id:8, num:'P-2027', cliente:'Nicolás Vargas',  tel:'+56 9 8901 2345', direccion:'Vitacura Norte 212',          entrega:'Despacho a domicilio', picker:5, estado:'Pendiente',   fecha:'2026-04-20', items:[{prodId:1,qty:3},{prodId:4,qty:2},{prodId:10,qty:1},{prodId:15,qty:1}] },
    { id:9, num:'P-2028', cliente:'Camila Espinoza', tel:'+56 9 9012 3456', direccion:'',                             entrega:'Retiro en tienda',     picker:5, estado:'Pendiente',   fecha:'2026-04-20', items:[{prodId:2,qty:1},{prodId:12,qty:3},{prodId:11,qty:2}] },
  ],
};
 
let editingId       = {};
let confirmCallback = null;
let pedidoLines     = [];
 
/* ─── NAVIGATION ─────────────────────────────────── */
function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
 
  // Activate matching nav item
  document.querySelectorAll('.nav-item').forEach(n => {
    const label = view === 'picking' ? 'picking' : view === 'dashboard' ? 'dashboard' : view;
    if (n.textContent.toLowerCase().includes(label)) n.classList.add('active');
  });
 
  const titles = {
    dashboard:   'Dashboard',
    productos:   'Productos',
    pasillos:    'Pasillos',
    trabajadores:'Trabajadores',
    pedidos:     'Pedidos',
    picking:     'Lista de Picking',
  };
  document.getElementById('topbar-title').textContent = titles[view] || view;
  renderAll();
}
 
/* ─── RENDER COORDINATOR ─────────────────────────── */
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
  // Recent orders table
  const tbody = document.getElementById('dash-orders-table');
  tbody.innerHTML = data.pedidos.slice(-5).reverse().map(p => {
    const t = data.trabajadores.find(t => t.id === p.picker);
    return `<tr>
      <td><span class="text-mono">#${p.num}</span></td>
      <td>${p.cliente}</td>
      <td><span class="badge badge-gray">${p.items.length} items</span></td>
      <td>${statusBadge(p.estado)}</td>
      <td>${t ? t.nombre.split(' ')[0] : '—'}</td>
    </tr>`;
  }).join('');
 
  // Low stock table
  const lowStock = data.productos.filter(p => p.stock <= p.stockMin);
  document.getElementById('low-stock-table').innerHTML = lowStock.map(p => {
    const pas = data.pasillos.find(a => a.id === p.pasillo);
    return `<tr>
      <td>${p.nombre}</td>
      <td>${pas ? `<span class="aisle-pill" style="color:${pas.color};border-color:${pas.color}20;background:${pas.color}15">P${pas.numero}</span>` : '—'}</td>
      <td><span class="badge ${p.stock === 0 ? 'badge-red' : 'badge-orange'}">${p.stock} ${p.unidad}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">Sin alertas</td></tr>';
 
  // Pending badge
  const pendientes = data.pedidos.filter(p => p.estado === 'Pendiente').length;
  const badge = document.getElementById('pendientes-badge');
  badge.textContent = pendientes;
  badge.style.display = pendientes > 0 ? '' : 'none';
}
 
/* ─── PRODUCTOS ──────────────────────────────────── */
function renderProductos() {
  const tbody = document.getElementById('productos-table');
  tbody.innerHTML = data.productos.map(p => {
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
      <td>${statusBadgeProd(p.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editProducto(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('producto',${p.id},'${p.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-box"></i><p>No hay productos registrados</p></div></td></tr>';
 
  document.getElementById('productos-count').textContent = `${data.productos.length} productos`;
}
 
/* ─── PASILLOS ───────────────────────────────────── */
function renderPasillos() {
  const tbody = document.getElementById('pasillos-table');
  tbody.innerHTML = data.pasillos.map(p => {
    const count = data.productos.filter(pr => pr.pasillo === p.id).length;
    return `<tr>
      <td><span class="aisle-pill" style="color:${p.color};border-color:${p.color}50;background:${p.color}15;font-size:15px;font-weight:700">P${p.numero}</span></td>
      <td style="font-weight:600">${p.nombre}</td>
      <td><span class="badge badge-gray">${p.categoria}</span></td>
      <td>${p.estantes}</td>
      <td><span class="badge badge-blue">${count} productos</span></td>
      <td>${statusBadgePasillo(p.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editPasillo(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('pasillo',${p.id},'${p.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}
 
/* ─── TRABAJADORES ───────────────────────────────── */
function renderTrabajadores() {
  const tbody = document.getElementById('trabajadores-table');
  tbody.innerHTML = data.trabajadores.map(t => {
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
      <td>${statusBadgeTrab(t.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editTrabajador(${t.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('trabajador',${t.id},'${t.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}
 
/* ─── PEDIDOS ────────────────────────────────────── */
function renderPedidos() {
  const tbody = document.getElementById('pedidos-table');
  tbody.innerHTML = data.pedidos.map(p => {
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
      <td>${statusBadge(p.estado)}</td>
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
  const sel = document.getElementById('picking-order-select');
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
  document.getElementById('picking-order-select').value = orderId;
  renderPicking();
}
 
function renderPicking() {
  const orderId   = parseInt(document.getElementById('picking-order-select').value);
  const container = document.getElementById('picking-container');
 
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
 
  // Build items with location data
  const pickItems = pedido.items.map(item => {
    const prod = data.productos.find(p => p.id === item.prodId);
    const pas  = prod ? data.pasillos.find(a => a.id === prod.pasillo) : null;
    return { ...item, prod, pas };
  });
 
  // Sort by aisle number → shelf label
  pickItems.sort((a, b) => {
    const pa = a.pas ? a.pas.numero : 99;
    const pb = b.pas ? b.pas.numero : 99;
    if (pa !== pb) return pa - pb;
    return (a.prod?.estante || '').localeCompare(b.prod?.estante || '');
  });
 
  // Group by aisle
  const groups = {};
  pickItems.forEach(item => {
    const key = item.pas ? item.pas.id : 0;
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
          ${statusBadge(pedido.estado)}
        </div>
      </div>
    </div>
    ${Object.values(groups).map(g => renderPickingGroup(g)).join('')}
    <div style="margin-top:16px;padding:14px 18px;background:var(--lime-light);border:1.5px solid var(--lime);border-radius:var(--radius);display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--green-dark)">
      <i class="fa-solid fa-route"></i>
      Ruta optimizada: ${Object.keys(groups).length} pasillos · ${pickItems.length} productos
    </div>`;
}
 
function renderPickingGroup(g) {
  const pas   = g.pas;
  const color = pas ? pas.color : '#888';
  const total = g.items.reduce((s, i) => s + i.qty, 0);
  return `
    <div class="picking-section">
      <div class="picking-aisle-header" style="background:${color}dd">
        <div class="aisle-number" style="background:rgba(255,255,255,.9);color:${color}">
          ${pas ? pas.numero : '?'}
        </div>
        <div class="aisle-info">
          <h4>${pas ? pas.nombre : 'Sin ubicación'}</h4>
          <p>${g.items.length} producto${g.items.length !== 1 ? 's' : ''} · ${total} unidades totales</p>
        </div>
        <div class="aisle-progress">
          <div style="font-size:11px;opacity:.8">0 / ${g.items.length}</div>
          <div class="aisle-progress-bar"><div class="aisle-progress-fill" style="width:0%"></div></div>
        </div>
      </div>
      ${g.items.map((item, idx) => `
        <div class="picking-item" id="pick-${g.pas?.id || 0}-${idx}" onclick="togglePickItem(this)">
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
 
function printPicking() {
  window.print();
}
 
/* ─── STATUS BADGES ──────────────────────────────── */
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
 
/* ─── SELECTS POPULATORS ─────────────────────────── */
function populateSelects() {
  document.getElementById('prod-pasillo').innerHTML =
    data.pasillos.map(p => `<option value="${p.id}">P${p.numero} – ${p.nombre}</option>`).join('');
 
  document.getElementById('ped-picker').innerHTML =
    data.trabajadores
      .filter(t => t.estado === 'Activo')
      .map(t => `<option value="${t.id}">${t.nombre}</option>`)
      .join('');
}
 
/* ─── MODAL HELPERS ──────────────────────────────── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); editingId[id] = null; }
 
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});
 
/* ─── PRODUCTO CRUD ──────────────────────────────── */
function editProducto(id) {
  const p = data.productos.find(x => x.id === id);
  if (!p) return;
  populateSelects();
  document.getElementById('modal-producto-title').textContent = 'Editar Producto';
  document.getElementById('prod-codigo').value     = p.codigo;
  document.getElementById('prod-nombre').value     = p.nombre;
  document.getElementById('prod-categoria').value  = p.categoria;
  document.getElementById('prod-marca').value      = p.marca;
  document.getElementById('prod-pasillo').value    = p.pasillo;
  document.getElementById('prod-estante').value    = p.estante;
  document.getElementById('prod-stock').value      = p.stock;
  document.getElementById('prod-stock-min').value  = p.stockMin;
  document.getElementById('prod-unidad').value     = p.unidad;
  document.getElementById('prod-estado').value     = p.estado;
  editingId['modal-producto'] = id;
  openModal('modal-producto');
}
 
function saveProducto() {
  const vals = {
    codigo:    document.getElementById('prod-codigo').value.trim(),
    nombre:    document.getElementById('prod-nombre').value.trim(),
    categoria: document.getElementById('prod-categoria').value,
    marca:     document.getElementById('prod-marca').value.trim(),
    pasillo:   parseInt(document.getElementById('prod-pasillo').value),
    estante:   document.getElementById('prod-estante').value.trim().toUpperCase(),
    stock:     parseInt(document.getElementById('prod-stock').value)     || 0,
    stockMin:  parseInt(document.getElementById('prod-stock-min').value) || 0,
    unidad:    document.getElementById('prod-unidad').value,
    estado:    document.getElementById('prod-estado').value,
  };
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
  renderAll();
  document.getElementById('modal-producto-title').textContent = 'Nuevo Producto';
  ['prod-codigo','prod-nombre','prod-marca','prod-estante','prod-stock','prod-stock-min']
    .forEach(fieldId => { document.getElementById(fieldId).value = ''; });
}
 
/* ─── PASILLO CRUD ───────────────────────────────── */
function editPasillo(id) {
  const p = data.pasillos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-pasillo-title').textContent = 'Editar Pasillo';
  document.getElementById('pas-numero').value    = p.numero;
  document.getElementById('pas-nombre').value    = p.nombre;
  document.getElementById('pas-categoria').value = p.categoria;
  document.getElementById('pas-estantes').value  = p.estantes;
  document.getElementById('pas-color').value     = p.color;
  document.getElementById('pas-estado').value    = p.estado;
  document.getElementById('pas-notas').value     = p.notas;
  editingId['modal-pasillo'] = id;
  openModal('modal-pasillo');
}
 
function savePasillo() {
  const vals = {
    numero:    parseInt(document.getElementById('pas-numero').value) || 0,
    nombre:    document.getElementById('pas-nombre').value.trim(),
    categoria: document.getElementById('pas-categoria').value,
    estantes:  parseInt(document.getElementById('pas-estantes').value) || 1,
    color:     document.getElementById('pas-color').value,
    estado:    document.getElementById('pas-estado').value,
    notas:     document.getElementById('pas-notas').value.trim(),
  };
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
  renderAll();
  document.getElementById('modal-pasillo-title').textContent = 'Nuevo Pasillo';
  ['pas-numero','pas-nombre','pas-estantes','pas-notas']
    .forEach(fieldId => { document.getElementById(fieldId).value = ''; });
}
 
/* ─── TRABAJADOR CRUD ────────────────────────────── */
function editTrabajador(id) {
  const t = data.trabajadores.find(x => x.id === id);
  if (!t) return;
  document.getElementById('modal-trabajador-title').textContent = 'Editar Trabajador';
  document.getElementById('trab-nombre').value = t.nombre;
  document.getElementById('trab-rut').value    = t.rut;
  document.getElementById('trab-turno').value  = t.turno;
  document.getElementById('trab-rol').value    = t.rol;
  document.getElementById('trab-tel').value    = t.tel;
  document.getElementById('trab-estado').value = t.estado;
  editingId['modal-trabajador'] = id;
  openModal('modal-trabajador');
}
 
function saveTrabajador() {
  const vals = {
    nombre: document.getElementById('trab-nombre').value.trim(),
    rut:    document.getElementById('trab-rut').value.trim(),
    turno:  document.getElementById('trab-turno').value,
    rol:    document.getElementById('trab-rol').value,
    tel:    document.getElementById('trab-tel').value.trim(),
    estado: document.getElementById('trab-estado').value,
  };
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
  const lineId = Date.now() + Math.random();
  pedidoLines.push({ lineId, prodId, qty });
  renderPedidoLines();
}
 
function renderPedidoLines() {
  const container = document.getElementById('pedido-lines');
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
  if (line) line[key] = key === 'qty' ? parseInt(val) || 1 : val;
}
 
function removeLine(lineId) {
  pedidoLines = pedidoLines.filter(l => l.lineId != lineId);
  renderPedidoLines();
}
 
function editPedido(id) {
  const p = data.pedidos.find(x => x.id === id);
  if (!p) return;
  populateSelects();
  document.getElementById('modal-pedido-title').textContent = 'Editar Pedido';
  document.getElementById('ped-cliente').value = p.cliente;
  document.getElementById('ped-tel').value     = p.tel;
  document.getElementById('ped-dir').value     = p.direccion;
  document.getElementById('ped-entrega').value = p.entrega;
  document.getElementById('ped-picker').value  = p.picker;
  pedidoLines = p.items.map(i => ({ lineId: Date.now() + Math.random(), prodId: i.prodId, qty: i.qty }));
  renderPedidoLines();
  editingId['modal-pedido'] = id;
  openModal('modal-pedido');
}
 
function savePedido() {
  const vals = {
    cliente:   document.getElementById('ped-cliente').value.trim(),
    tel:       document.getElementById('ped-tel').value.trim(),
    direccion: document.getElementById('ped-dir').value.trim(),
    entrega:   document.getElementById('ped-entrega').value,
    picker:    parseInt(document.getElementById('ped-picker').value),
    items:     pedidoLines.filter(l => l.prodId).map(l => ({ prodId: parseInt(l.prodId), qty: l.qty })),
  };
  if (!vals.cliente)       { toast('El nombre del cliente es requerido', 'error'); return; }
  if (!vals.items.length)  { toast('Agrega al menos un producto', 'error'); return; }
 
  const id = editingId['modal-pedido'];
  if (id) {
    const idx = data.pedidos.findIndex(x => x.id === id);
    data.pedidos[idx] = { ...data.pedidos[idx], ...vals };
    toast('Pedido actualizado');
  } else {
    const num = 'P-' + (2029 + data.pedidos.length);
    data.pedidos.push({
      id: Date.now(), num,
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
 
/* ─── DELETE CONFIRM ─────────────────────────────── */
function confirmDelete(type, id, name) {
  document.getElementById('confirm-msg').textContent =
    `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`;
 
  confirmCallback = () => {
    if (type === 'producto')   data.productos    = data.productos.filter(x => x.id !== id);
    if (type === 'pasillo')    data.pasillos     = data.pasillos.filter(x => x.id !== id);
    if (type === 'trabajador') data.trabajadores = data.trabajadores.filter(x => x.id !== id);
    if (type === 'pedido')     data.pedidos      = data.pedidos.filter(x => x.id !== id);
    closeModal('modal-confirm');
    renderAll();
    toast('Registro eliminado', 'error');
  };
 
  document.getElementById('confirm-ok-btn').onclick = confirmCallback;
  openModal('modal-confirm');
}
 
/* ─── FILTERS ────────────────────────────────────── */
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
 
/* ─── TOAST ──────────────────────────────────────── */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> ${msg}`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
 
/* ─── INIT ───────────────────────────────────────── */
renderAll();