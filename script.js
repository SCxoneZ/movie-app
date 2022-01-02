// edc4b9ba425753e57f18c4c22891a5c0

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGM0YjliYTQyNTc1M2U1N2YxOGM0YzIyODkxYTVjMCIsInN1YiI6IjYxY2JmMDVhNDFhYWM0MDAxYzhiYTcxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gVHtK0ifBkOzlgvzli29sldx-yPHj19HuaEXEONBF_M

//https://image.tmdb.org/t/p/w500/2qhIDp44cAqP2clOgt2afQI07X8.jpg

//https://api.themoviedb.org/3/search/movie?api_key=edc4b9ba425753e57f18c4c22891a5c0&query=Spider-Man

//https://api.themoviedb.org/3/genre/movie/list?api_key=edc4b9ba425753e57f18c4c22891a5c0&query=Spider-Man

// https://api.themoviedb.org/3/movie/634649?api_key=edc4b9ba425753e57f18c4c22891a5c0

//cari persen = vove_average * 10

/*
    <div class="cards">
      <div class="poster"></div>
      <div class="content">
        <div class="title">
          <h4>Spider-Man: No Way Home</h4>
        </div>
        <div class="date"><p>2022-01-01</p></div>
        <div role="progressbar" aria-valuenow="65" aria-valuemax="100" style="--value:70" class="progress"></div>
        <div class="btn-detail">Detail</div>
      </div>
    </div>
*/

const input = document.querySelector('.input-search');
const search = document.querySelector('.btn-search');
const container = document.querySelector('.movies');

const url = (title) => `https://api.themoviedb.org/3/search/movie?api_key=edc4b9ba425753e57f18c4c22891a5c0&query=${title}`;

const getData = (url) => {
  return fetch(url).then(res => res.json()).then(data => data).catch(err => err);
}

search.addEventListener('click', async () => {
  const data = await getData(url(input.value));
  
  container.innerHTML = '';
  
  if(data.results.length > 0){
    
  for(let obj of data.results){
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
  
  const details = document.querySelectorAll('.btn-detail');
  details.forEach((el) => {
      el.addEventListener('click', (e) => {
        localStorage.setItem('selected_id', e.target.parentElement.parentElement.dataset.id);
        window.location.href = 'details.html';
      });
    });
  
  }else{
    container.innerHTML = '<h1>ERROR 400</h1>';
  }
  
  
});

