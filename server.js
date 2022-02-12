const express = require('express');
const htmlRoutes = require('./routes/html');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});