import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import signupRoute from './routes/signup';
import loginRoute from './routes/login'
import collectionRoutes from './routes/collection'
import wishlistRoutes from './routes/wishlist';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 7020;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/collection', collectionRoutes);
app.use('/wishlist', wishlistRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));