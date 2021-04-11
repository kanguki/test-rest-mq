import {HighLevelProducer, KafkaConsumer, Message} from 'node-rdkafka';
import {log} from '../utils/log';
import config from '../config';
const kafkaProducer: HighLevelProducer = new HighLevelProducer({
  'client.id': config.kafka.producer.id,
  'metadata.broker.list': config.kafka.producer.brokerList,
  'enable.idempotence': config.kafka.producer.enableIndempotence,
  dr_cb: config.kafka.producer.dr_cb,
});
const kafkaConsumer: KafkaConsumer = new KafkaConsumer(
  {
    'group.id': config.kafka.consumer.groupId,
    'metadata.broker.list': config.kafka.consumer.brokerList,
  },
  {}
);
let defaultConsumerListener = (data: Message) => {
  console.log(data.value?.toString());
};

export const prepareKafka: () => void = () => {
  kafkaProducer.connect();
  kafkaConsumer.connect();
  kafkaProducer.on('ready', () => log.info('Producer is ready'));
  kafkaProducer.setPollInterval(100);
  kafkaProducer.on('disconnected', () => log.warn('Kafka Producer disconnected'));

  kafkaConsumer
    .on('ready', () => {
      log.info('Consumer is ready');
      kafkaConsumer.subscribe(config.kafka.consumer.topics);
      kafkaConsumer.consume();
    })
    .on('data', (data: Message) => defaultConsumerListener(data));
};

export function sendKafka(msgToSend: string, topic: string): void {
  log.info(`Send msg: ${msgToSend} to topic ${topic}`);
  const kafkaProducer = getKafkaProducer();
  kafkaProducer.produce(topic, null, Buffer.from(msgToSend), 'mo', Date.now(), (err, offset) => {
    console.log(offset);
  });
}

export function changeConsumerEventListener(listener: (data: Message) => void) {
  defaultConsumerListener = listener;
}

export const getKafkaProducer = (): HighLevelProducer => {
  return kafkaProducer;
};
export const getKafkaConsumer = (): KafkaConsumer => {
  return kafkaConsumer;
};
