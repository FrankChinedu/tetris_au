import events from 'events';

const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(Infinity);

export default eventEmitter;
