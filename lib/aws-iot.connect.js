import awsIot from 'aws-iot-device-sdk';
import config from '../.secret/config';

const device = awsIot.device({
  keyPath: config.keyPath,
  certPath: config.certPath,
  caPath: config.caPath,
  clientId: config.clientId,
  host: config.host,
  debug: true
});

export default (logger) => {
  device
    .on('connect', function() {
      logger.info('connect', config.clientId);
    });
  device
    .on('close', function() {
      logger.info('close');
    });
  device
    .on('reconnect', function() {
      logger.info('reconnect');
    });
  device
    .on('offline', function() {
      logger.info('offline');
    });
  device
    .on('error', function(error) {
      logger.info('error', error);
    });
  device
    .on('message', function(topic, payload) {
      logger.info('message', topic, payload.toString());
    });

  return device;
};
