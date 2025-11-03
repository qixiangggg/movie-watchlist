const inputEl = document.querySelector("input")
const imdbIDList = []
let movieList = []
const watchList = JSON.parse(localStorage.getItem("watchlist")) || []
const mainEl = document.querySelector("main")
document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault()
    const responseMovieId = await fetch(`https://www.omdbapi.com/?apikey=4f70a2f8&s=${inputEl.value}`)
    const movieIdData = await responseMovieId.json()
    if(movieIdData.Response==="False"){
        mainEl.innerHTML = `
        <div class="container">
            <p class="movie-not-found">Unable to find what you're looking for. Please try another search.</p>
        </div>`
        
    }else{
        renderMovieList(movieIdData)
    }
    
    
})

mainEl.addEventListener('click',function(e){
    const selectedMovideId = e.target.dataset.imdbid
    if(selectedMovideId){
        const selectedMovie = movieList.find(movie => movie.imdbID === selectedMovideId)
        if (!watchList.some(selectedMovie => selectedMovie.imdbID === selectedMovideId)){
            watchList.push(selectedMovie)
            localStorage.setItem("watchlist",JSON.stringify(watchList))
        }
    }

})

async function renderMovieList(movieIdData){
    const movieIDList = movieIdData.Search.map(movie => movie.imdbID)
    movieList = await Promise.all(
        movieIDList.map(async (movieID) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=4f70a2f8&i=${movieID}`)
            return response.json()
        })
    )
    mainEl.innerHTML = movieList.map(
        movie =>
        `
        <div class="container">
            <section class="movie-section">
                <img src=${movie.Poster} class="movie-poster">
                <div class="movie-description">
                    <div class="movie-header">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <div class="ratings">
                            <img src="./images/ratings-icon.png" class="ratings-icon">
                            <p class="ratings-text">${movie.Ratings[0].Value.slice(0,-3)}</p>
                        </div>
                    </div>
                    <div class="movie-subheader">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button class="watchlist-btn" data-imdbid=${movie.imdbID}>
                            <span class="watchlist-icon" data-imdbid=${movie.imdbID}>+</span>
                            <span data-imdbid=${movie.imdbID}>Watchlist</span>
                        </button>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </section>
            <hr>
        </div>
        `
        
    ).join('')   
}