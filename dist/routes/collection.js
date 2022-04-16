"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("../middleware/auth"));
const collectionController_1 = require("../controllers/collectionController");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const fileType = (req, file, filterFile) => {
    if (file.mimetype === 'image/jpeg' || 'image/png') {
        filterFile(null, true);
    }
    else {
        filterFile(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter: fileType
}).single('image');
router.route('/')
    .get(auth_1.default, collectionController_1.getCollection)
    .post(auth_1.default, collectionController_1.postNewItem);
router
    .post('/add-new-album', auth_1.default, upload, collectionController_1.addNewAlbum);
router
    .get('/:itemId', auth_1.default, collectionController_1.getCollectionItem);
router
    .put('/:itemId/update', auth_1.default, collectionController_1.updateItem);
router
    .delete('/:itemId', auth_1.default, collectionController_1.deleteItem);
exports.default = router;
