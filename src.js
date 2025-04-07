async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(`/api/weather/${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {
    document.getElementById('temperature').textContent = `${Math.round(data.temperature)}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('humidity').textContent = `${Math.round(data.humidity)}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.windSpeed)} km/h`;
    
    // Update weather icon based on description
    const weatherIcon = document.getElementById('weatherIcon');
    const iconCode = getWeatherIconCode(data.description);
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getWeatherIconCode(description) {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '01d';
    if (desc.includes('cloud')) return '02d';
    if (desc.includes('rain')) return '10d';
    if (desc.includes('snow')) return '13d';
    if (desc.includes('thunder')) return '11d';
    if (desc.includes('mist') || desc.includes('fog')) return '50d';
    return '01d';
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}); 