
document.addEventListener('DOMContentLoaded', function() {


document.getElementById('contact-link').addEventListener('click', function(event) {
    event.preventDefault();
    var contactSection = document.getElementById('contact-section');
    if (contactSection.style.display === 'none' || contactSection.style.display === '') {
        contactSection.style.display = 'block';
    } else {
        contactSection.style.display = 'none';
    }
});


document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault();
    var contactSection = document.getElementById('about-section');
    if (contactSection.style.display === 'none' || contactSection.style.display === '') {
        contactSection.style.display = 'block';
    } else {
        contactSection.style.display = 'none';
    }
});
document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-button').value.toLowerCase();
    console.log(searchTerm);
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to check if it's accessible
            const results = [];
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchTerm) || city.description.toLowerCase().includes(searchTerm)) {
                        results.push(city);
                    }
                });
            });
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchTerm) || temple.description.toLowerCase().includes(searchTerm)) {
                    results.push(temple);
                }
            });
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchTerm) || beach.description.toLowerCase().includes(searchTerm)) {
                    results.push(beach);
                }
            });
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-button').value = '';
    document.getElementById('results').innerHTML = '<h2>Results</h2>';
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>Results</h2>';
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}



});
