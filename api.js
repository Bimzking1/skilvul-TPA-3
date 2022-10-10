const KEY = '7815984b9aed29ed2639bde418d7c56b'
const BASE_API_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_API_URL + 'discover/movie?sort_by=popularity.desc&api_key=' + KEY + '&page=1'
const SEARCH_API_URL = BASE_API_URL + 'search/movie?api_key=' + KEY

const movieContainer = document.getElementById('movie-list')
const searchContainer = document.getElementById('form')
const searchInput = document.getElementById('search-movie')

getMovieData(API_URL)

function getMovieData(API_URL) {
    fetch(API_URL)
    .then(res => 
        res.json()
    )
    .then(data => {
        showMovieData(data.results)
    })
}

function showMovieData(data) {
    console.log(data)
    movieContainer.innerHTML = ''

    data.forEach(element => {
        const { title, vote_average, release_date, poster_path } = element
        const movieElement = document.createElement('div')
        movieElement.innerHTML = 
            `
                <div class="row">
                    <div class="col">
                        <div class="card mb-4">
                            <img src="${`https://image.tmdb.org/t/p/w500` + poster_path}">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <b><h5>${title}</h5></b>
                                    <h5 style="color:#138808"><b>${vote_average}</b></h5>
                                </div>
                                <p>${release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            movieContainer.append(movieElement)
    });
}

searchContainer.addEventListener('submit', (element) => {
    element.preventDefault()
    const SEARCH_KEY = searchInput.value

    if(SEARCH_KEY == '') {
        getMovieData(API_URL)
    } else {
        getMovieData(SEARCH_API_URL + '&query=' + SEARCH_KEY + '&page=1')
    }
})