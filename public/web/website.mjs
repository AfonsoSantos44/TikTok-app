import express from "express";
import axios from "axios";

const apiRouter = express.Router();
apiRouter.use(express.json());
export { apiRouter };

// needs a function so it can be called wit a button on the website

// Trending Videos
apiRouter.get("/trending", async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://tiktok-scraper7.p.rapidapi.com/feed/list',
        params: {
            region: 'us',
            count: '10'
        },
        headers: {
            'x-rapidapi-key': 'a841967c43msh9f11ce89fba848ep119a78jsncfe166c11a5d',
            'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});
