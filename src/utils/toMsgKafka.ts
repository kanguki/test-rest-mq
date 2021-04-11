export function toMsgKafka(uri: string, msgId: string, data: string): string {
  return `{"messageType":"MESSAGE","messageId":"${msgId}","responseDestination":{"topic":"mo-x","uri":"REQUEST_RESPONSE"},"uri":"${uri}","data":${data}}`;
}
