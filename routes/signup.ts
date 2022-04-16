import express from 'express';
import signup from '../controllers/signupController';

const router = express.Router()

router.post("/", signup);

export default router;