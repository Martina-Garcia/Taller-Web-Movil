/* ═══════════════════════════════════════════
   PickMart — renders.js
   Renderizado de vistas: dashboard, tablas y selects
═══════════════════════════════════════════ */

/* ─── Dashboard ─────────────────────────── */
function renderDashboard() {
  // Tabla de pedidos recientes
  document.getElementById('dash-orders-table').innerHTML = data.pedidos.slice(-5).reverse().map(p => {
    const t = data.trabajadores.find(t => t.id === p.picker);
    return `<tr>
      <td><span class="text-mono">#${p.num}</span></td>
      <td>${p.cliente}</td>
      <td><span class="badge badge-gray">${p.items.length} items</span></td>
      <td>${statusBadge(p.estado)}</td>
      <td>${t ? t.nombre.split(' ')[0] : '—'}</td>
    </tr>`;
  }).join('');

  // Tabla de bajo stock
  const lowStock = data.productos.filter(p => p.stock <= p.stockMin);
  document.getElementById('low-stock-table').innerHTML = lowStock.map(p => {
    const pas = data.pasillos.find(a => a.id === p.pasillo);
    return `<tr>
      <td>${p.nombre}</td>
      <td>${pas ? `<span class="aisle-pill" style="color:${pas.color};border-color:${pas.color}20;background:${pas.color}15">P${pas.numero}</span>` : '—'}</td>
      <td><span class="badge ${p.stock === 0 ? 'badge-red' : 'badge-orange'}">${p.stock} ${p.unidad}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">Sin alertas</td></tr>';

  // Badge de pendientes en sidebar
  const pendientes = data.pedidos.filter(p => p.estado === 'Pendiente').length;
  const badge = document.getElementById('pendientes-badge');
  badge.textContent = pendientes;
  badge.style.display = pendientes > 0 ? '' : 'none';
}

/* ─── Productos ─────────────────────────── */
function renderProductos() {
  document.getElementById('productos-table').innerHTML = data.productos.map(p => {
    const pas = data.pasillos.find(a => a.id === p.pasillo);
    const aisleHtml = pas
      ? `<span class="aisle-pill" style="color:${pas.color};border-color:${pas.color}40;background:${pas.color}15">
           <i class="fa-solid fa-map-pin" style="font-size:10px"></i> P${pas.numero} – ${pas.nombre.split(' ')[0]}
         </span>`
      : '—';
    const stockClass = p.stock === 0 ? 'badge-red' : p.stock <= p.stockMin ? 'badge-orange' : 'badge-green';
    return `<tr>
      <td><span class="text-mono" style="font-size:11px">${p.codigo}</span></td>
      <td>${p.nombre}</td>
      <td><span class="badge badge-gray">${p.categoria}</span></td>
      <td>${aisleHtml}</td>
      <td><span class="text-mono" style="background:var(--surface2);padding:2px 7px;border-radius:4px">${p.estante}</span></td>
      <td><span class="badge ${stockClass}">${p.stock} ${p.unidad}</span></td>
      <td>${statusBadgeProd(p.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editProducto(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('producto',${p.id},'${p.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-box"></i><p>No hay productos registrados</p></div></td></tr>';

  document.getElementById('productos-count').textContent = `${data.productos.length} productos`;
}

/* ─── Pasillos ──────────────────────────── */
function renderPasillos() {
  document.getElementById('pasillos-table').innerHTML = data.pasillos.map(p => {
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

/* ─── Trabajadores ──────────────────────── */
function renderTrabajadores() {
  document.getElementById('trabajadores-table').innerHTML = data.trabajadores.map(t => {
    const initials = t.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);
    const pedActual = t.pedidoActual !== '-'
      ? `<span class="text-mono" style="color:var(--blue)">${t.pedidoActual}</span>`
      : '<span style="color:var(--text-muted)">—</span>';
    return `<tr>
      <td><span class="text-mono">T-00${t.id}</span></td>
      <td style="display:flex;align-items:center;gap:9px">
        <div class="user-avatar" style="background:var(--green-acc);width:28px;height:28px;font-size:11px">${initials}</div>
        ${t.nombre}
      </td>
      <td>${t.turno.split(' ')[1]}</td>
      <td><span class="badge badge-dark">${t.pedidosHoy}</span></td>
      <td>${pedActual}</td>
      <td>${statusBadgeTrab(t.estado)}</td>
      <td><div class="action-btns">
        <button class="btn btn-xs btn-outline" onclick="editTrabajador(${t.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-xs btn-danger"  onclick="confirmDelete('trabajador',${t.id},'${t.nombre}')"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

/* ─── Pedidos ───────────────────────────── */
function renderPedidos() {
  document.getElementById('pedidos-table').innerHTML = data.pedidos.map(p => {
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

/* ─── Selects dinámicos ─────────────────── */
function populateSelects() {
  document.getElementById('prod-pasillo').innerHTML =
    data.pasillos.map(p => `<option value="${p.id}">P${p.numero} – ${p.nombre}</option>`).join('');

  document.getElementById('ped-picker').innerHTML =
    data.trabajadores
      .filter(t => t.estado === 'Activo')
      .map(t => `<option value="${t.id}">${t.nombre}</option>`)
      .join('');
}