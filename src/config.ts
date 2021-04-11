const config = {
  port: 3000,
  requestTimeOut: 3 * 1000, //3s, as I'm impatient :P
  kafka: {
    producer: {
      id: process.env.kafkaProducerId || 'gateway',
      brokerList: process.env.kafkaProducerBrokerList || 'localhost:9092',
      enableIndempotence: true,
      dr_cb: true,
    },
    consumer: {
      groupId: 'rest-kafka',
      brokerList: process.env.kafkaConsumerBrokerList || 'localhost:9092',
      topics: ['mo-x'],
    },
  },
};
export default config;
