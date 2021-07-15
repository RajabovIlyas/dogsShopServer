import {Request, Response, Router} from 'express';
import size from '../controllers/size.controller'

const router = Router();


router.get('/size', size.get);

router.get('/dog-breed', size.getDogBreed)

export default router;
