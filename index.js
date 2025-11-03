const inputEl = document.querySelector("input")
const imdbIDList = []
let movieList = []
const watchList = JSON.parse(localStorage.getItem("watchlist"))
document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault()
    const responseMovieId = await fetch(`https://www.omdbapi.com/?apikey=4f70a2f8&s=${inputEl.value}`)
    const movieIdData = await responseMovieId.json()
    const movieIDList = movieIdData.Search.map(movie => movie.imdbID)
    movieList= await Promise.all(
        movieIDList.map(async (movieID) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=4f70a2f8&i=${movieID}`)
            return response.json()
        })
    )
    document.querySelector("main").innerHTML = movieList.map(
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
        
    ).join()   
})

document.querySelector("main").addEventListener('click',function(e){
    if(e.target.dataset.imdbid){
        const selectedMovie = movieList.find(movie => movie.imdbID === e.target.dataset.imdbid)
        if (!watchList.includes(selectedMovie)){
            watchList.push(selectedMovie)
            console.log(watchList)
            localStorage.setItem("watchlist",JSON.stringify(watchList))
        }
    }

})