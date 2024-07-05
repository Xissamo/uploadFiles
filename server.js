const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const { sequelize } = require('./config/db');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', fileRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});
