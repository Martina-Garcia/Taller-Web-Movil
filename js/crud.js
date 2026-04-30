/* ═══════════════════════════════════════════
   PickMart — crud.js
   CRUD de entidades + control de modales
═══════════════════════════════════════════ */

/* ─── Modal helpers ─────────────────────── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); editingId[id] = null; }

// Cerrar modal al hacer clic fuera de él (modals.js ya inyectó el HTML)
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

/* ─── Confirmar eliminación ─────────────── */
function confirmDelete(type, id, name) {
  document.getElementById('confirm-msg').textContent =
    `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`;

  document.getElementById('confirm-ok-btn').onclick = () => {
    if (type === 'producto')   data.productos    = data.productos.filter(x => x.id !== id);
    if (type === 'pasillo')    data.pasillos     = data.pasillos.filter(x => x.id !== id);
    if (type === 'trabajador') data.trabajadores = data.trabajadores.filter(x => x.id !== id);
    if (type === 'pedido')     data.pedidos      = data.pedidos.filter(x => x.id !== id);
    closeModal('modal-confirm');
    renderAll();
    toast('Registro eliminado', 'error');
  };

  openModal('modal-confirm');
}

/* ─── CRUD: Producto ────────────────────── */
function editProducto(id) {
  const p = data.productos.find(x => x.id === id);
  if (!p) return;
  populateSelects();
  document.getElementById('modal-producto-title').textContent = 'Editar Producto';
  document.getElementById('prod-codigo').value    = p.codigo;
  document.getElementById('prod-nombre').value    = p.nombre;
  document.getElementById('prod-categoria').value = p.categoria;
  document.getElementById('prod-marca').value     = p.marca;
  document.getElementById('prod-pasillo').value   = p.pasillo;
  document.getElementById('prod-estante').value   = p.estante;
  document.getElementById('prod-stock').value     = p.stock;
  document.getElementById('prod-stock-min').value = p.stockMin;
  document.getElementById('prod-unidad').value    = p.unidad;
  document.getElementById('prod-estado').value    = p.estado;
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
    .forEach(fId => { document.getElementById(fId).value = ''; });
}

/* ─── CRUD: Pasillo ─────────────────────── */
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
    .forEach(fId => { document.getElementById(fId).value = ''; });
}

/* ─── CRUD: Trabajador ──────────────────── */
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

/* ─── CRUD: Pedido ──────────────────────── */
function addPedidoLine(prodId = '', qty = 1) {
  pedidoLines.push({ lineId: Date.now() + Math.random(), prodId, qty });
  renderPedidoLines();
}

function renderPedidoLines() {
  const container = document.getElementById('pedido-lines');
  if (!pedidoLines.length) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:12px">Sin productos aún</p>';
    return;
  }
  const inputStyle = 'border:1.5px solid var(--border);border-radius:7px;padding:7px 10px;font-family:\'DM Sans\',sans-serif;font-size:13px';
  container.innerHTML = pedidoLines.map(line => `
    <div style="display:grid;grid-template-columns:1fr 80px 30px;gap:8px;margin-bottom:8px;align-items:center">
      <select onchange="updateLine('${line.lineId}','prodId',this.value)" style="${inputStyle}">
        <option value="">— Producto —</option>
        ${data.productos.map(p => `<option value="${p.id}" ${p.id == line.prodId ? 'selected' : ''}>${p.nombre}</option>`).join('')}
      </select>
      <input type="number" min="1" value="${line.qty}"
        onchange="updateLine('${line.lineId}','qty',parseInt(this.value)||1)"
        style="${inputStyle};text-align:center">
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
  if (!vals.cliente)      { toast('El nombre del cliente es requerido', 'error'); return; }
  if (!vals.items.length) { toast('Agrega al menos un producto', 'error'); return; }

  const id = editingId['modal-pedido'];
  if (id) {
    const idx = data.pedidos.findIndex(x => x.id === id);
    data.pedidos[idx] = { ...data.pedidos[idx], ...vals };
    toast('Pedido actualizado');
  } else {
    const num = 'P-' + (2029 + data.pedidos.length);
    data.pedidos.push({ id: Date.now(), num, fecha: new Date().toISOString().split('T')[0], estado: 'Pendiente', ...vals });
    toast('Pedido creado');
  }

  pedidoLines = [];
  closeModal('modal-pedido');
  renderAll();
}