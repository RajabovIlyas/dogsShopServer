import {Request, Response, Router} from 'express';
import size from '../controllers/size.controller'

const router = Router();


router.get('/size', size.get);

router.get('/size-new', size.getSizeIlyas);

export default router;