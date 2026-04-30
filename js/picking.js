/* ═══════════════════════════════════════════
   PickMart — picking.js
   Módulo de lista de picking optimizada por pasillo
═══════════════════════════════════════════ */

function renderPickingSelect() {
  const sel     = document.getElementById('picking-order-select');
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

  // Enriquecer items con datos de producto y pasillo
  const pickItems = pedido.items.map(item => {
    const prod = data.productos.find(p => p.id === item.prodId);
    const pas  = prod ? data.pasillos.find(a => a.id === prod.pasillo) : null;
    return { ...item, prod, pas };
  });

  // Ordenar por pasillo → estante
  pickItems.sort((a, b) => {
    const pa = a.pas?.numero ?? 99;
    const pb = b.pas?.numero ?? 99;
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
          ${statusBadge(pedido.estado)}
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
  const color = pas?.color ?? '#888';
  const total = g.items.reduce((s, i) => s + i.qty, 0);
  return `
    <div class="picking-section">
      <div class="picking-aisle-header" style="background:${color}dd">
        <div class="aisle-number" style="background:rgba(255,255,255,.9);color:${color}">
          ${pas?.numero ?? '?'}
        </div>
        <div class="aisle-info">
          <h4>${pas?.nombre ?? 'Sin ubicación'}</h4>
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
          <div class="pick-shelf">${item.prod?.estante ?? '—'}</div>
          <div class="pick-name">
            <div>${item.prod?.nombre ?? 'Producto no encontrado'}</div>
            <div style="font-size:11.5px;color:var(--text-muted)">${item.prod?.codigo ?? ''} · ${item.prod?.marca ?? ''}</div>
          </div>
          <div class="pick-qty">×${item.qty}</div>
          <div class="pick-unit">${item.prod?.unidad ?? 'un'}</div>
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