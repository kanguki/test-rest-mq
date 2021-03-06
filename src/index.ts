import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import {Log} from './utils/log';
import router from './router';
import {prepareKafka} from './kafka';
import config from './config';

const log: Log = new Log();
const app: express.Application = express();

prepareKafka();
app.use(cors()); //to overcome cors problem
app.use(express.json()); //to parse request, so we can grab body, header,...
app.use(router);

const port = process.env.PORT || config.port;
const server = app.listen(port, () => log.info(`Up on ${port}`));
server.timeout = config.requestTimeOut;
