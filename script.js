
let byTreatments = '';

const createCard = (name, address, treatments, img, description) => {
    const card = `
    <div class="card">
    <div class="foto"style="background-image: url('${img}')"></div>
      <h2>${name}</h2>
      <div class="card-body">
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Working hours: </strong> ${description}</p>
          <p><strong>Number of Treatments:</strong> ${treatments}</p>
        </div>
    </div>
    `

  return card;
}

const renderList = (salons) => {
  const list = document.getElementById('list');
  list.innerHTML = '';

  if (salons.length === 0) {
    return list.innerHTML = 'No items.';
  }
  salons.forEach((salon) => {
    const card = createCard(salon.name, salon.address, salon.treatments.length, salon.img, salon.description);
    return list.innerHTML += card;
  })
}

const getSalons = async (search = '', byTreatments = false) => {
  const res = await fetch(`http://localhost:3000/salons?search=${search}&byTreatments=${byTreatments}`)
  const data = await res.json();
  return data;
}


const onLoad = async () => {
  const salons = await getSalons();
  renderList(salons);
}


const changeByTreatments = (byTreatmentsValue) => {
  byTreatments = byTreatmentsValue;

  const salonsButton = document.getElementById('salonsButton');
  const treatmentsButton = document.getElementById('treatmentsButton');

  if (!byTreatments) {
    salonsButton.className = 'salons selected';
    treatmentsButton.className = 'treatments'
  }

  else {
    salonsButton.className = 'salons';
    treatmentsButton.className = 'treatments selected'
  }
}

const onClear = async () => {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';

  const salons = await getSalons();
  renderList(salons);
}

const onSearch = async () => {
  const searchInput = document.getElementById('searchInput');
  
  const search = searchInput.value;

  const salons = await getSalons(search, byTreatments);

  renderList(salons);
}


onLoad()
