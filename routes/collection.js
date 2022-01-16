const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth').auth
const collectionController = require('../controllers/collectionController');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileType = (req, file, filterFile) => {
    if (file.mimetype === 'image/jpeg' || 'image/png') {
        filterFile(null, true)
    } else {
        filterFile(null, false)
    }
}

const upload = multer({
    storage,
    fileFilter: fileType
}).single('image')

router.route('/')
    .get(auth, collectionController.getCollection)
    .post(auth, collectionController.postNewItem)

router
    .post('/add-new-album', auth, upload, collectionController.addNewAlbum)

router
    .get('/:itemId', auth, collectionController.getCollectionItem)

router
    .put('/:itemId/update', auth, collectionController.updateItem)

router
    .delete('/:itemId', auth, collectionController.deleteItem)

module.exports = router;