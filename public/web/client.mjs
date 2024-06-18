document.addEventListener("DOMContentLoaded", async () => {
    const content = document.getElementById("content");
    const homeLink = document.getElementById("home-link");
    const trendingLink = document.getElementById("trending-link");

    // Add event listeners to your links
    homeLink.addEventListener("click", loadHomePage);
    trendingLink.addEventListener("click", loadTrendingPage);
});

async function loadHomePage() {
    // Load home page content
}

async function loadTrendingPage() {
    content.innerHTML = `
    <h2>Trending Videos</h2>
    <label for="trending-Top">Top:</label>
    <input type="number" id="trending-TopMax" name="trending-Top">
    <label for="region">Region:</label>
    <select id="region" name="region">
        <option value="us">United States</option>
        <option value="gb">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="it">Italy</option>
        <option value="es">Spain</option>
        <option value="br">Brazil</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="ru">Russia</option>
        <option value="jp">Japan</option>
        </select>
    <button onclick="fetchAndDisplayTrendingVideos()">Load Trending Videos</button>
    <div id="trending-videos"></div>
    `;
}

async function getTrendingVideos(trendingTop, region) {
    const options = {
        method: 'GET',
        url: 'https://tiktok-scraper7.p.rapidapi.com/feed/list',
        params: {
            region: region,
            count: trendingTop
        },
        headers: {
            'x-rapidapi-key': 'a841967c43msh9f11ce89fba848ep119a78jsncfe166c11a5d',
            'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(options.url, options);
        const data = await response.json();
        return data.data || []; // Return 'data.data' assuming 'data' is an object containing 'data' property
    } catch (error) {
        console.error(error);
        return []; // Return an empty array if there is an error
    }
}

function displayTrendingVideos(data) {
    const videos = data; // Assuming 'data' is an array of videos

    // Get the trending videos element
    const trendingVideosElement = document.getElementById("trending-videos");

    // Clear the trending videos element
    trendingVideosElement.innerHTML = "";

    // Loop through the videos and add them to the trending videos element
    videos.forEach(video => {
        // Create a new div element for the video
        const videoElement = document.createElement("div");

        // Set the innerHTML of the video element
        videoElement.innerHTML = `
            <h3>${video.title}</h3>
            <img src="${video.cover}" alt="${video.title}">
            <p>Play Count: ${video.play_count}</p>
            <p>Digg Count: ${video.digg_count}</p>
            <p>Comment Count: ${video.comment_count}</p>
            <p>Share Count: ${video.share_count}</p>
        `;

        // Append the video element to the trending videos element
        trendingVideosElement.appendChild(videoElement);
    });
}

// Example usage:
window.fetchAndDisplayTrendingVideos = async function (){
    try {
        const trendingVideos = await getTrendingVideos( data.count, 'US'); // Fetch 10 trending videos from US region
        displayTrendingVideos(trendingVideos);
    } catch (error) {
        console.error('Failed to fetch or display trending videos:', error);
    }
}