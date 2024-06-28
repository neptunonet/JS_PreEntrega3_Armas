const sim_form = document.querySelector('#add-simulation');
const simDiv = document.querySelector('#SimDiv');

// crear Simulacion 

function createSim({value, amount, deadline,client}) {
  const sims = JSON.parse(localStorage.getItem('sims'));

  const ids = sims.map(sim => sims.id);

  const newSim = {
    id: ids.length > 0 ? Math.max(...ids) + 1 : 0,
    value,
    amount,
    deadline,
    client
  }

  sims.push(newSim);

  localStorage.setItem('sims', JSON.stringify(sims));
  appendSimDiv();
}

// eliminarTarea

function deleteSim(id) {
  const sims = JSON.parse(localStorage.getItem('sims'));
  const newSim = sims.filter(sim => sim.id != id);

  localStorage.setItem('sims', JSON.stringify(newSim));
  appendSimDiv();
};

// actualizarTarea

function updateSim(id, data) {
  const sims = JSON.parse(localStorage.getItem('sims'));
  const newSim = sims.map(sim => sim.id == id && sim.status == data.status);

  localStorage.setItem('sims', JSON.stringify(newSim));
  appendSimDiv();
}


// actualizar En Dom

function appendSimDiv() {

  let sims = [];

  if (JSON.parse(localStorage.getItem('sims'))) {
    sims = JSON.parse(localStorage.getItem('sims'));
  } else {
    localStorage.setItem('sims', JSON.stringify([]));
  }

  simDiv.innerHTML = "";

  sims.forEach(sim => {
    const sim_container = document.createElement('article');
    sim_container.className = 'sim';
    sim_container.id = `sim-${sim.id}`;

    //    value,    amount,    deadline,    client
    sim_container.innerHTML = `
     <div>
        <h3>${sim.description}</h3>
        <p>${sim.deadline}</p>
      </div>
      <p class="${sim.status.toLowerCase()}">${sim.status}</p>
      <button id="btn-${sim.id}" class="btn-delete">Eliminar</button>
    `;

    simDiv.appendChild(sim_container);

    const deleteButton = document.querySelector(`#btn-${sim.id}`);
    deleteButton.addEventListener('click', (e) => {
      const id = e.target.id.split('-')[1];
      deleteSim(id);
      Toastify({
        text: "Tarea eliminada con éxito",
        className: "deleted-sim",
        style: {
          background: 'crimson',
          padding: '32px',
          width: '500px',
          textAlign: "center"
        },
        duration: 1000,
        gravity: 'bottom'
      }).showToast();
    });
  });
}

appendSimDiv();

sim_form.addEventListener('submit', (e) => {
  e.preventDefault();

  const sim = {
    value: e.target[0].value,
    amount: e.target[1].value,
    deadline: e.target[1].value,
    client: e.target[2].value
  }

  createSim(sim);
  Swal.fire({
    title: '¡Tarea creada exitosamente!',
    icon: 'success',
    confirmButtonText: 'Terminar'
  });

  sim_form.reset();
});

