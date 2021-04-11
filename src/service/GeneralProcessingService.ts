import {Response} from 'express';
import {Message} from 'node-rdkafka';
import {Service} from 'typedi';
import {MSG_ID_PREFIX} from '../constants/constants';
import {changeConsumerEventListener, sendKafka} from '../kafka';
import {ResponseTemplate} from '../model/response/ResponseTemplate';
import {log} from '../utils/log';
import {toMsgKafka} from '../utils/toMsgKafka';

@Service()
export class GeneralProcessingService {
  sendRequest(uri: string, msg: string, topic: string) {
    const msgId: string = this.makeMsgId();
    sendKafka(toMsgKafka(uri, msgId, msg), topic);
    return msgId;
  }

  waitForResponseAndSend(msgId: string, res: Response) {
    const eventListener = (data: Message) => {
      log.package(`receive msg ${data.value?.toString().replace(/\n/g, '').replace(/\s/g, '')}`);
      const response = data.value?.toString() ? <ResponseTemplate>JSON.parse(data.value.toString()) : null;
      if (response && response.messageId === msgId) {
        res.send(response);
      }
    };
    changeConsumerEventListener(eventListener);
  }

  makeMsgId(): string {
    return `${MSG_ID_PREFIX}-${new Date().getTime()}`;
  }
}
