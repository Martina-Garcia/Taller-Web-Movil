/* ═══════════════════════════════════════════
   PickMart — modals.js
   Genera e inyecta el HTML de todos los modales.
   Se carga antes de crud.js para que los listeners
   de .modal-overlay puedan adjuntarse al DOM.
═══════════════════════════════════════════ */

/* ─── Helpers de construcción ───────────── */
const CATS = `
  <option>Lácteos</option><option>Bebidas</option><option>Panadería</option>
  <option>Carnes</option><option>Frutas y Verduras</option>
  <option>Limpieza</option><option>Snacks</option><option>Congelados</option>`;

function modalIcon(colorClass, faIcon) {
  return `<div class="stat-icon ${colorClass}" style="margin-bottom:0;width:36px;height:36px;font-size:15px">
    <i class="fa-solid ${faIcon}"></i>
  </div>`;
}

function buildModal(id, maxWidth, iconHtml, titleId, defaultTitle, bodyHtml, saveFn, saveLabel = 'Guardar') {
  const widthStyle = maxWidth ? ` style="max-width:${maxWidth}"` : '';
  return `
  <div class="modal-overlay" id="${id}">
    <div class="modal"${widthStyle}>
      <div class="modal-head">
        ${iconHtml}
        <h3 id="${titleId}">${defaultTitle}</h3>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      <div class="modal-foot">
        <button class="btn btn-outline" onclick="closeModal('${id}')">Cancelar</button>
        <button class="btn btn-primary" onclick="${saveFn}()">
          <i class="fa-solid fa-check"></i> ${saveLabel}
        </button>
      </div>
    </div>
  </div>`;
}

/* ─── Modal: Producto ────────────────────── */
const modalProducto = buildModal(
  'modal-producto', '', modalIcon('si-green','fa-box'),
  'modal-producto-title', 'Nuevo Producto',
  `<div class="form-grid">
    <div class="form-group">
      <label>Código de Barra</label>
      <div class="input-with-icon">
        <i class="fa-solid fa-barcode"></i>
        <input type="text" id="prod-codigo" placeholder="7800001XXXXXX">
      </div>
    </div>
    <div class="form-group"><label>Nombre del Producto</label>
      <input type="text" id="prod-nombre" placeholder="Ej: Leche Entera 1L">
    </div>
    <div class="form-group"><label>Categoría</label>
      <select id="prod-categoria">${CATS}</select>
    </div>
    <div class="form-group"><label>Marca</label>
      <input type="text" id="prod-marca" placeholder="Ej: Colun">
    </div>
    <div class="form-group"><label>Pasillo</label>
      <select id="prod-pasillo"></select>
    </div>
    <div class="form-group"><label>Estante / Posición</label>
      <input type="text" id="prod-estante" placeholder="Ej: A3, B1">
    </div>
    <div class="form-group"><label>Stock Actual</label>
      <input type="number" id="prod-stock" placeholder="0" min="0">
    </div>
    <div class="form-group"><label>Stock Mínimo</label>
      <input type="number" id="prod-stock-min" placeholder="5" min="0">
    </div>
    <div class="form-group"><label>Unidad</label>
      <select id="prod-unidad"><option>un</option><option>kg</option><option>L</option><option>g</option></select>
    </div>
    <div class="form-group"><label>Estado</label>
      <select id="prod-estado"><option>Activo</option><option>Sin Stock</option><option>Discontinuado</option></select>
    </div>
  </div>`,
  'saveProducto'
);

/* ─── Modal: Pasillo ─────────────────────── */
const modalPasillo = buildModal(
  'modal-pasillo', '', modalIcon('si-blue','fa-map'),
  'modal-pasillo-title', 'Nuevo Pasillo',
  `<div class="form-grid">
    <div class="form-group"><label>Número de Pasillo</label>
      <input type="number" id="pas-numero" min="1" placeholder="1">
    </div>
    <div class="form-group"><label>Nombre del Pasillo</label>
      <input type="text" id="pas-nombre" placeholder="Ej: Lácteos y Huevos">
    </div>
    <div class="form-group"><label>Categoría Principal</label>
      <select id="pas-categoria">${CATS}</select>
    </div>
    <div class="form-group"><label>Número de Estantes</label>
      <input type="number" id="pas-estantes" min="1" placeholder="4">
    </div>
    <div class="form-group"><label>Color identificador</label>
      <input type="color" id="pas-color" value="#52b788" style="height:40px;cursor:pointer">
    </div>
    <div class="form-group"><label>Estado</label>
      <select id="pas-estado"><option>Activo</option><option>En Reposición</option><option>Bloqueado</option></select>
    </div>
    <div class="form-group full"><label>Notas / Descripción</label>
      <textarea id="pas-notas" placeholder="Información adicional del pasillo…"></textarea>
    </div>
  </div>`,
  'savePasillo'
);

/* ─── Modal: Trabajador ──────────────────── */
const modalTrabajador = buildModal(
  'modal-trabajador', '', modalIcon('si-orange','fa-user'),
  'modal-trabajador-title', 'Nuevo Trabajador',
  `<div class="form-grid">
    <div class="form-group"><label>Nombre</label>
      <input type="text" id="trab-nombre" placeholder="Nombre completo">
    </div>
    <div class="form-group"><label>RUT</label>
      <input type="text" id="trab-rut" placeholder="12.345.678-9">
    </div>
    <div class="form-group"><label>Turno</label>
      <select id="trab-turno">
        <option>Turno A (08:00-16:00)</option>
        <option>Turno B (16:00-00:00)</option>
        <option>Turno C (00:00-08:00)</option>
      </select>
    </div>
    <div class="form-group"><label>Rol</label>
      <select id="trab-rol"><option>Picker</option><option>Supervisor</option><option>Despachador</option></select>
    </div>
    <div class="form-group"><label>Teléfono</label>
      <input type="text" id="trab-tel" placeholder="+56 9 XXXX XXXX">
    </div>
    <div class="form-group"><label>Estado</label>
      <select id="trab-estado"><option>Activo</option><option>Inactivo</option><option>Vacaciones</option></select>
    </div>
  </div>`,
  'saveTrabajador'
);

/* ─── Modal: Pedido ──────────────────────── */
const modalPedido = buildModal(
  'modal-pedido', '640px', modalIcon('si-blue','fa-clipboard-list'),
  'modal-pedido-title', 'Nuevo Pedido',
  `<div class="form-grid">
    <div class="form-group"><label>Cliente</label>
      <input type="text" id="ped-cliente" placeholder="Nombre del cliente">
    </div>
    <div class="form-group"><label>Teléfono</label>
      <input type="text" id="ped-tel" placeholder="+56 9 XXXX XXXX">
    </div>
    <div class="form-group full"><label>Dirección de entrega</label>
      <input type="text" id="ped-dir" placeholder="Calle, número, departamento…">
    </div>
    <div class="form-group"><label>Tipo de entrega</label>
      <select id="ped-entrega"><option>Retiro en tienda</option><option>Despacho a domicilio</option></select>
    </div>
    <div class="form-group"><label>Picker asignado</label>
      <select id="ped-picker"></select>
    </div>
  </div>
  <div class="divider"></div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <div style="font-weight:600;font-size:14px">Productos del pedido</div>
    <button class="btn btn-sm btn-outline" onclick="addPedidoLine()">
      <i class="fa-solid fa-plus"></i> Agregar
    </button>
  </div>
  <div id="pedido-lines"></div>`,
  'savePedido', 'Guardar Pedido'
);

/* ─── Modal: Confirmar eliminación ──────── */
const modalConfirm = `
  <div class="modal-overlay" id="modal-confirm">
    <div class="modal" style="max-width:400px">
      <div class="modal-head">
        ${modalIcon('si-red','fa-trash')}
        <h3>Confirmar eliminación</h3>
      </div>
      <div class="modal-body">
        <p style="font-size:14px;color:var(--text-mid)" id="confirm-msg">
          ¿Estás seguro de que deseas eliminar este registro?
        </p>
      </div>
      <div class="modal-foot">
        <button class="btn btn-outline" onclick="closeModal('modal-confirm')">Cancelar</button>
        <button class="btn btn-danger" id="confirm-ok-btn">Eliminar</button>
      </div>
    </div>
  </div>`;

/* ─── Inyectar en el DOM ─────────────────── */
document.getElementById('modals-root').innerHTML =
  modalProducto + modalPasillo + modalTrabajador + modalPedido + modalConfirm;