import { Response} from 'express';
import {Message} from 'node-rdkafka';
import {Inject, Service} from 'typedi';
import {MSG_ID_PREFIX} from '../constants/constants';
import { GeneralProcessingDao } from '../dao/GeneralProcessingDao';
import {  sendKafka} from '../kafka';
import {ResponseTemplate} from '../model/response/ResponseTemplate';
import {log} from '../utils/log';
import {toMsgKafka} from '../utils/toMsgKafka';
import {v4 as uuidv4} from 'uuid'

@Service()
export class GeneralProcessingService {
  @Inject()
  private generalProcessingDao: GeneralProcessingDao;

  sendRequest(uri: string, msg: string, topic: string) {
    const msgId: string = this.makeMsgId();
    sendKafka(toMsgKafka(uri, msgId, msg), topic);
    return msgId;
  }

  mapIdToResponse(id: string, res: Response) {
    this.generalProcessingDao.setIdResponse(id, res);
  }

  processKafkaReceivedMessage(data: Message) {
      log.package(`receive msg ${data.value?.toString().replace(/\n/g, '').replace(/\s/g, '')}`);
      const response = data.value?.toString() ? <ResponseTemplate>JSON.parse(data.value.toString()) : null;
      if (!response || response && !response.messageId) log.error("Not a standard response. Skip!");
      if (response && response.messageId) {
        const res = this.generalProcessingDao.getResponseOfId(response.messageId);
        if (!res) {
          log.error("Found no matching response. Skip!");
          return;
        }
        res.send(response)
        this.generalProcessingDao.removeDoneResponse(response.messageId);
      }
  }

  makeMsgId(): string {
    return `${MSG_ID_PREFIX}-${uuidv4()}-${new Date().getTime()}`;
  }
}
