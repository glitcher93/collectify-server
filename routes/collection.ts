import express, { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import auth from '../middleware/auth';
import { getCollection, postNewItem, addNewAlbum, getCollectionItem, updateItem, deleteItem } from '../controllers/collectionController';

const router = express.Router();

interface File {
    mimetype: string
}

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileType = (req: Request, file: File, filterFile: FileFilterCallback) => {
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
    .get(auth, getCollection)
    .post(auth, postNewItem)

router
    .post('/add-new-album', auth, upload, addNewAlbum)

router
    .get('/:itemId', auth, getCollectionItem)

router
    .put('/:itemId/update', auth, updateItem)

router
    .delete('/:itemId', auth, deleteItem)

export default router;