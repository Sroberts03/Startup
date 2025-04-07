const GameEvent = {
  System: 'system',
  End: 'gameEnd',
  Start: 'gameStart',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];
  messageQueue = []; // Queue for messages when socket isn't ready

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    this.socket.onopen = () => {
      this.receiveEvent(new EventMessage('Oregon Trail Online', GameEvent.System, { msg: 'connected' }));
      // Send any queued messages once connected
      while (this.messageQueue.length > 0) {
        const event = this.messageQueue.shift();
        this.socket.send(JSON.stringify(event));
      }
    };

    this.socket.onclose = () => {
      this.receiveEvent(new EventMessage('Oregon Trail Online', GameEvent.System, { msg: 'disconnected' }));
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  getEvents() {
    return this.events;
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    } else {
      console.log('WebSocket not ready, queuing message:', event);
      this.messageQueue.push(event); // Queue the message if not connected
    }
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler); // Fix: Reassign filtered array
  }

  receiveEvent(event) {
    this.events.push(event);
    this.handlers.forEach((handler) => handler(event)); // Simplified event handling
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };