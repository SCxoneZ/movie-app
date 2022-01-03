fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('selected_id')}?api_key=edc4b9ba425753e57f18c4c22891a5c0`)
.then(res => res.json())
.then(data => {
  //console.log(data);
  const container = document.querySelector('.container');
  document.body.innerHTML = `

  <div class="wrapper-1">
  <div class="poster">
  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
  </div>
  <div class="overview">
  <h5>Overview</h5>
  <p>${data.overview}</p>
  </div>
  </div>
  <div class="wrapper-2">

  <div class="date">
  <p>${data.release_date}</p>
  </div>
  <div class="title">
  <p>Title: <span class="bold">${data.title}</span></p>
  </div>
  <div class="budget">
  <p>Budget: <span class="bold">${data.budget}</span></p>
  </div>
  <div class="revenue">
  <p>Revenue: <span class="bold">${data.revenue}</span></p>
  </div>
  <div class="companies">
  <p>Companies: <span class="bold">${
  (function () {
    let companies = [];
    for (const c of data.production_companies) {
      companies.push(c.name);
    }
    companies.join(`,`);
    return companies;
  })()
  }</span></p>
  </div>
  <div class="genre">
  <p>Genre: <span class="bold">${
  (function () {
    let genres = [];
    for (const c of data.genres) {
      genres.push(c.name);
    }
    genres.join(`,`);
    return genres;
  })()
  }</span></p>
  </div>
  <div class="languages">
  <p>Languages: <span class="bold">${
  (function () {
    let languages = [];
    for (const c of data.spoken_languages) {
      languages.push(c.english_name);
    }
    languages.join(`,`);
    return languages;
  })()
  }</span></p>
  </div>
  <div class="cast">
  ${
  (function () {
    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('selected_id')}/credits?api_key=edc4b9ba425753e57f18c4c22891a5c0`)
    .then(data => data.json())
    .then(res => {

      let imgEl = ``;
      console.log(res)

      for (const o of res.cast) {
        if (o.profile_path !== null) {
          imgEl += `
          <div class="actor-wrapper">
          <img src="https://image.tmdb.org/t/p/w500${o.profile_path}" alt="${o.original_name}" class="actor">
          <p class="real-name">${o.name}</p>
          <p class="character-name">${o.character}</p>
          </div>`;
        }
        //console.log(o.original_name);
      }

      //console.log(imgEl);
      const cast = document.querySelector('.cast');
      cast.innerHTML = imgEl;

    })
    .catch(err => console.log(err));
  })()
  }
  </div>
  </div>

  `;
})
.catch(err => console.log(err));