const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hungry naki node server running!');
})

app.listen(port, () => {
    console.log(`Hungry naki node server is running on port ${port}`);
})