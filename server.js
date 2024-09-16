import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = 5000;

app.get('/play-audio', async (req, res) => {
    const audioUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/37/MCPON%27s_speech_to_USS_George_Washington%27s_crew_%28April_2022%29.mp3';

    try {
        const response = await fetch(audioUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch the audio file');
        }

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline');
        response.body.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Failed to download file');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});