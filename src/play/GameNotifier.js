 // gameNotifierSimulator.js
const GameEvent = {
    System: 'system',
    End: 'gameEnd',
    Start: 'gameStart',
  };
  
  class GameEventSimulator {
    constructor() {
      this.handlers = [];
      this.startSimulation();
    }
  
    startSimulation() {
      setInterval(() => {
        const randomPlayer = `Traveler${Math.floor(Math.random() * 100)}`;
        this.broadcastEvent(randomPlayer, GameEvent.Start, {});
      }, 5000);
  
      setInterval(() => {
        const randomPlayer = `Traveler${Math.floor(Math.random() * 100)}`;
        const percent = Math.floor(Math.random() * 100); // Random completion percentage
        const date = new Date().toLocaleDateString();
        const won = percent === 100; // Consider 100% as a win
        this.broadcastEvent(randomPlayer, GameEvent.End, {
          name: randomPlayer,
          score: percent,
          date: date,
          won: won,
        });
      }, 7000);
    }
  
    broadcastEvent(from, type, value) {
      const event = {
        from,
        type,
        value,
      };
      this.handlers.forEach((handler) => handler(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  }
  
  const GameSimulator = new GameEventSimulator();
  export { GameEvent, GameSimulator };