// server.js
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Mount API routes
app.use(apiRoutes);

// Define HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
