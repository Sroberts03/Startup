export class OregonTrailGame {
    constructor() {
        this.life = 10;
        this.miles_left = 2170;
        this.percent = 0;
        this.water = 10;
        this.food = 50;
        this.first_aid = 1;
        this.game_over = false;
        this.game_won = false;
        this.message = '';
        this.day = 0;
    }

    getDay() {
        return this.day;
    }

    getMessage() {
        return this.message;
    }

    getLife() {
        return this.life;
    }

    getMilesLeft() {
        return this.miles_left;
    }

    getPercent() {
        return this.percent;
    }

    getWater() {
        return this.water;
    }

    getFood() {
        return this.food;
    }

    getFirstAid() {
        return this.first_aid;
    }

    getGameOver() {
        return this.game_over;
    }

    getGameWon() {
        return this.game_won;
    }

    setLife(life) {
        this.life = life;
    }

    setMilesLeft(miles_left) {
        this.miles_left = miles_left;
    }

    setPercent(percent) {
        this.percent = percent;
    }

    setWater(water) {
        this.water = water;
    }

    setFood(food) {
        this.food = food;
    }

    setFirstAid(first_aid) {
        this.first_aid = first_aid;
    }

    randomEvent(events) {
        const randomIndex = Math.floor(Math.random() * events.length);
        return events[randomIndex];
    }

    updateGameState() {
        if (this.life <= 0) {
            this.game_over = true;
        } 
        else if (this.miles_left <= 0) {
            this.game_won = true;
        }
    }

    dailyUpdates() {
        this.day += 1;
        this.water -= 1;
        if (this.water < 0) {
            this.water = 0;
        }
        if (this.water == 0) {
            this.life -= 1;
        }
        this.food -= 1;
        if (this.food < 0) {
            this.food = 0;
        }
        if (this.food == 0) {
            this.life -= 1;
        }
    }
    
    events() {
        const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const randomEvent = this.randomEvent(events);
        if (randomEvent == 1) {
            this.miles_left -= 100;
            this.percent = Math.floor((2170 - this.miles_left) / 2170 * 100);
            this.message = "Normal day of travel. 100 miles closer.";
        } 
        if (randomEvent == 2) {
            this.life -= 1;
            this.miles_left -= 50;
            this.percent = Math.floor((2170 - this.miles_left) / 2170 * 100);
            this.message = "You have lost 1 life and only travled 50 miles due to a broken leg";
        }
        if (randomEvent == 3) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 4) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 5) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 6) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 7) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 8) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 9) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
        if (randomEvent == 10) {
            this.life = 0;
            this.message = "You have died of dysentery";
        }
    }
}