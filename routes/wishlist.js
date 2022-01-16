const router = require('express').Router();
const auth = require('../middleware/auth').auth;
const wishlistController = require('../controllers/wishlistController');

router.route('/')
    .get(auth, wishlistController.getWishlist)
    .post(auth, wishlistController.postNewItem)

router
    .get('/:itemId', auth, wishlistController.getWishlistItem)

router
    .put('/:itemId/update', auth, wishlistController.updateWishlistItem)

router
    .delete('/:itemId', auth, wishlistController.deleteItem);

module.exports = router;