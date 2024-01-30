// JS for api.html
document.addEventListener("DOMContentLoaded",()=>{

        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');
        const movieResults = document.getElementById('movie-results');

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();

            if (searchTerm === '') {
                showMessage('Enter Movie Title');
            } else {
                searchMovies(searchTerm);
            }
        });

        async function searchMovies(searchTerm) {
            try {
                const apiKey = '6c44a256'; 
                const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();

                
                if (data.Search && data.Search.length > 0) {
                    displayMovies(data.Search);
                } else {
                    showMessage('Please check spelling');
                }
            } catch (error) {
                showMessage('Error: Try after some time');
            }
        }

        function displayMovies(movies) {
            movieResults.innerHTML = '';

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const title = movie.Title;
                const year = movie.Year;
                const poster = movie.Poster === 'N/A' ? 'placeholder.png' : movie.Poster;
                const overview = movie.Plot;

                movieCard.innerHTML = `
                    <img src="${poster}" alt="${title}">
                    <h3>${title}</h3>
                    <p>Year: ${year}</p>
                    <p>${overview}</p>
                `;

                movieResults.appendChild(movieCard);
            });
        }

        function showMessage(message) {
            movieResults.innerHTML = `<p id="error-message">${message}</p>`;
        }
        })
