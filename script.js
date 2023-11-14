document.getElementById('searchBtn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput.trim() !== '') {
        searchRecipes(searchInput);
    } else {
        alert('Please enter ingredients to search for recipes.');
    }
});

function searchRecipes(ingredients) {
    const apiKey = 'YOUR_EDAMAM_API_KEY';
    const apiEndpoint = 'https://api.edamam.com/search';
    const appId = 'YOUR_EDAMAM_APP_ID';

    const url = `${apiEndpoint}?q=${ingredients}&app_id=${appId}&app_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.hits))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
    } else {
        results.forEach(result => {
            const recipeTitle = result.recipe.label;
            const recipeUrl = result.recipe.url;

            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const titleElement = document.createElement('h3');
            titleElement.textContent = recipeTitle;

            const linkElement = document.createElement('a');
            linkElement.href = recipeUrl;
            linkElement.textContent = 'View Recipe';

            recipeCard.appendChild(titleElement);
            recipeCard.appendChild(linkElement);

            resultsContainer.appendChild(recipeCard);
        });
    }
}
