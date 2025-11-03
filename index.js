const inputEl = document.querySelector("input")
document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4f70a2f8&t=${inputEl.value}`)
        .then(res => res.json())
        .then(data => console.log(data))
})