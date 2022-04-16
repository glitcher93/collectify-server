"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const wishlistController_1 = require("../controllers/wishlistController");
const router = express_1.default.Router();
router.route('/')
    .get(auth_1.default, wishlistController_1.getWishlist)
    .post(auth_1.default, wishlistController_1.postNewItem);
router
    .get('/:itemId', auth_1.default, wishlistController_1.getWishlistItem);
router
    .put('/:itemId/update', auth_1.default, wishlistController_1.updateWishlistItem);
router
    .delete('/:itemId', auth_1.default, wishlistController_1.deleteItem);
exports.default = router;
