const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 7020;
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const collectionRoutes = require('./routes/collection');
const wishlistRoutes = require('./routes/wishlist');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/collection', collectionRoutes);
app.use('/wishlist', wishlistRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));