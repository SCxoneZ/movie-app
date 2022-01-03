const input = document.querySelector('.input-search');
const search = document.querySelector('.btn-search');
const container = document.querySelector('.movies');

const url = (title) => `https://api.themoviedb.org/3/search/movie?api_key=edc4b9ba425753e57f18c4c22891a5c0&query=${title}`;

const getData = (url) => {
  return fetch(url).then(res => res.json()).then(data => data).catch(err => err);
}

fetch('https://api.themoviedb.org/3/trending/all/day?api_key=edc4b9ba425753e57f18c4c22891a5c0')
.then(res => res.json())
.then(data => {

  for (let obj of data.results) {
    console.log(obj)
    container.innerHTML += `
    <div class="cards" data-id="${obj.id}">
    <img src="https://image.tmdb.org/t/p/w400/https://image.tmdb.org/t/p/w400${obj.poster_path}" class="poster">
    <div class="content">
    <div class="title">
    <h4>${
    (function () {
      if (obj.original_title) {
        return obj.original_title;
      } else {
        return obj.name;
      }
    })()
    }</h4>
    </div>
    <div class="date"><p>${
    (function () {
      if (obj.release_date) {
        return obj.release_date;
      } else {
        return obj.first_air_date;
      }
    })()
    }</p></div>
    <div role="progressbar" aria-valuenow="${obj.vote_average*10}" aria-valuemax="100" style="--value:${obj.vote_average*10}" class="progress"></div>
    <div class="btn-detail">Detail</div>
    </div>
    </div>
    `;
  }
  addListener();
})
.catch(err => err);

search.addEventListener('click', async () => {
  const data = await getData(url(input.value));

  container.innerHTML = '';

  if (data.results.length > 0) {

    for (let obj of data.results) {
      container.innerHTML += `
      <div class="cards" data-id="${obj.id}">
      <img src="https://image.tmdb.org/t/p/w400/https://image.tmdb.org/t/p/w400${obj.poster_path}" class="poster">
      <div class="content">
      <div class="title">
      <h4>${obj.original_title}</h4>
      </div>
      <div class="date"><p>${obj.release_date}</p></div>
      <div role="progressbar" aria-valuenow="${obj.vote_average*10}" aria-valuemax="100" style="--value:${obj.vote_average*10}" class="progress"></div>
      <div class="btn-detail">Detail</div>
      </div>
      </div>
      `
    }

    addListener();

  } else {
    container.innerHTML = '<h1>ERROR 400</h1>';
  }


});

function addListener() {
  const details = document.querySelectorAll('.btn-detail');
  details.forEach((el) => {
    el.addEventListener('click', (e) => {
      localStorage.setItem('selected_id', e.target.parentElement.parentElement.dataset.id);
      window.location.href = 'details.html';
    });
  });
}