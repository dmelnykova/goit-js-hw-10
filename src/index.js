import SlimSelect from 'slim-select';
import { fetchBreeds } from './plus/cat-api.js';
import { fetchCatByBreed } from './plus/cat-api.js';
import { Notify } from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

function createMarkupSelect(array) {
  return array
    .map(({id, name}) => {
      return `<option value = "${id}">${name}</option>`;
    })
    .join('');
}

fetchBreeds()
  .then(resultArray => {
    refs.select.style.display = 'none';
    refs.loader.style.display = 'none';
    refs.select.insertAdjacentHTML(
      'beforeend',
      createMarkupSelect(resultArray.data)
    );
    refs.select.style.display = 'block';
    new SlimSelect({
      select: '#breed-select',
    });
  })
  .catch(() => {
    Notify.failure('Oops! Something went wrong! Try reloading the page');
  });

refs.select.addEventListener('change', handlerSelect);

function handlerSelect(event) {
  const catBreed = event.target.value;
  refs.loader.style.display = 'block';
  refs.catInfo.style.display = 'none';

  fetchCatByBreed(catBreed)
    .then(cat => {
      refs.loader.style.display = 'none';
      refs.catInfo.style.display = 'block';
      if (catBreed === 'specialBreed') {
          Notify.info('Information about cat is on updating, try later');
      }
      refs.catInfo.innerHTML = createMarkUp(cat.data);
    })
    .catch(() => {
      Notify.failure('Oops! Something went wrong! Try reloading the page');
    });
}

function createMarkUp(array) {
  return array.map(({ url, breeds }) => {
    const { name, description, temperament } = breeds[0];
    return `
    <div class="card">
    <img class="image" src="${url}" alt="${name}">
    <div class="cat-about">
      <h2>${name}</h2>
      <p><span class="subtitle">Description:</span> ${description}</p>
      <p><span class="subtitle">Temperament:</span> ${temperament}</p>
    </div>
    </div>
    `;
  });
}