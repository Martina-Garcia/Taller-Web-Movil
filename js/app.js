/* ═══════════════════════════════════════════
   PickMart — app.js
   Controlador principal: navegación e init
═══════════════════════════════════════════ */

const VIEW_TITLES = {
  dashboard:    'Dashboard',
  productos:    'Productos',
  pasillos:     'Pasillos',
  trabajadores: 'Trabajadores',
  pedidos:      'Pedidos',
  picking:      'Lista de Picking',
};

function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.textContent.toLowerCase().includes(view)) n.classList.add('active');
  });

  document.getElementById('topbar-title').textContent = VIEW_TITLES[view] || view;
  renderAll();
}

function renderAll() {
  renderDashboard();
  renderProductos();
  renderPasillos();
  renderTrabajadores();
  renderPedidos();
  populateSelects();
  renderPickingSelect();
}

async function fetchInitialData() {
  try {
    const [productos, pasillos, trabajadores, pedidos] = await Promise.all([
      apiFetch('/products'),
      apiFetch('/aisles'),
      apiFetch('/workers'),
      apiFetch('/orders')
    ]);

    data.productos = productos;
    data.pasillos = pasillos;
    data.trabajadores = trabajadores;
    data.pedidos = pedidos;

   
    renderAll();
  } catch (error) {
    console.error("No se pudo cargar la data inicial", error);
  }
}

// ─── INIT REEMPLAZADO ────────────────────────────────
if(document.getElementById('view-dashboard')){
  fetchInitialData();
}