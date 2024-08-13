const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: '*', // Replace with your allowed origin
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.get('/wc/ping/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ts, auth, rwcToken, dmz, v1, v2 } = req.query;

        if (!ts || !auth || !rwcToken || !dmz || !v1 || !v2) {
            return res.status(400).json({ error: "Missing required query parameters." });
        }

        const url_ = `https://${v1}.${v2}.zoom.us/wc/ping/${id}?ts=${ts}&auth=${auth}&rwcToken=${rwcToken}&dmz=${dmz}`;
        console.log(url_)
        const response = await axios.get(url_);
        
        // Sending the response data as JSON
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
