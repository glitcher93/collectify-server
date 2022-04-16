import express from 'express';
import auth from '../middleware/auth'
import { getWishlist, postNewItem, getWishlistItem, updateWishlistItem, deleteItem } from '../controllers/wishlistController'

const router = express.Router()

router.route('/')
    .get(auth, getWishlist)
    .post(auth, postNewItem)

router
    .get('/:itemId', auth, getWishlistItem)

router
    .put('/:itemId/update', auth, updateWishlistItem)

router
    .delete('/:itemId', auth, deleteItem);

export default router;