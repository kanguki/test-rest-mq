# rest - kafka

By default it listens on port 3000

This service takes data (uri, data) from client, formats it as:
{"messageType":"xxx","messageId":"${msgId}","responseDestination":{"topic":"OUT_TOPIC","uri":"xxx"},"uri":"${uri}","data":${data}} //msgId is unique so as to map correct response of particular request

and send to topic (IN_TOPIC) corressonding to your domain/ service,... (for example, domain http://ukie:3000 -> service 'pang' will process msg consumed from topic "ukie")

To make this work, turn on one service which consumes messages from (IN_TOPIC), process and send msg response to topic sepecified in msg request itself (OUT_TOPIC)
