import {Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import {GeneralProcessingService} from '../service/GeneralProcessingService';

@Service()
export class GeneralController {
  @Inject()
  private generalProcessingService: GeneralProcessingService;

  processRequest = (req: Request, res: Response) => {
    const msgId = this.forwardRequest(req);
    this.generalProcessingService.mapIdToResponse(msgId, res);
  };

  forwardRequest(req: Request) {
    const {topic, uri, msg} = req.body;
    return this.generalProcessingService.sendRequest(uri, msg, topic);
  }
}
