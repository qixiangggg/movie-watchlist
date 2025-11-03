let watchList = JSON.parse(localStorage.getItem("watchlist")) || []

function renderWatchlist(){
    document.querySelector("main").innerHTML = watchList.map(movie => 
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
                            <button class="remove-btn" data-imdbid=${movie.imdbID}>
                                <span class="remove-icon" data-imdbid=${movie.imdbID}>-</span>
                                <span data-imdbid=${movie.imdbID}>Remove</span>
                            </button>
                        </div>
                        <p class="movie-plot">${movie.Plot}</p>
                    </div>
                </section>
                <hr>
            </div>`).join()
    }
        
document.querySelector('main').addEventListener('click', function(e){
    if(e.target.dataset.imdbid){
        watchList = watchList.filter(movie => movie.imdbID !== e.target.dataset.imdbid)
        if (watchList.length > 0){
            localStorage.setItem('watchlist', JSON.stringify(watchList))
        }else{
            localStorage.clear()
            document.querySelector("main").innerHTML = `<p class="watchlist-empty">Your watchlist is looking a little empty...</p>
            <a class="add-movies-btn"><span class="add-icon">+</span><span> Let's add some movies!</span></a>`
        }
        console.log(watchList.length)
        renderWatchlist()
    }
})

watchList.length !== 0 ? renderWatchlist() : ''