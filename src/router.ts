import * as express from 'express';
import {Request, Response} from 'express';
import Container from 'typedi';
import {GeneralController} from './controller/GeneralController';

const router: express.Router = express.Router();
const generalController = Container.get(GeneralController);
router.get('/', (req: Request, res: Response) => res.send('Yay'));
router.post('/', generalController.processRequest);

export default router;
