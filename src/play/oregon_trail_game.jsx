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
        this.addAndSubWater(1, 'subtract', true);
        this.addAndSubtractFood(1, 'subtract', true);
    }

    subtrackMiles(miles) {
        this.miles_left -= miles;
        if (this.miles_left < 0) {
            this.miles_left = 0;
        }
        this.percent = Math.floor((2170 - this.miles_left) / 2170 * 100);
    }

    addAndSubtractFood(food, condition, dailyUpdates = false) {
        if (condition == 'add') {
            this.food += food;
            if (this.food > 50) {
                this.food = 50;
            }
        }
        if (condition == 'subtract') {
            this.food -= food;
            if (this.food < 0) {
                this.food = 0;
            }
            if (dailyUpdates == true && this.food == 0) {
                this.addAndSubLife(1, 'subtract');
            }
        }
    }

    addAndSubWater(water, condition, dailyUpdates = false) {
        if (condition == 'add') {
            this.water += water;
            if (this.water > 10) {
                this.water = 10;
            }
        }
        if (condition == 'subtract') {
            this.water -= water;
            if (this.water < 0) {
                this.water = 0;
            }
            if (dailyUpdates= true && this.water == 0) {
                this.addAndSubLife(1, 'subtract');
            }
        }
    }

    addAndSubLife(life, condition) {
        if (condition == 'add') {
            this.life += life;
            if (this.life > 10) {
                this.life = 10;
            }
        }
        if (condition == 'subtract') {
            this.life -= life;
            if (this.life < 0) {
                this.life = 0;
            }
        }
    }

    addAndSubFistAid(first_aid, condition) {
        if (condition == 'add') {
            this.first_aid += first_aid;
            if (this.first_aid > 10) {
                this.first_aid = 10;
            }
        }
        if (condition == 'subtract') {
            this.first_aid -= first_aid;
            if (this.first_aid < 0) {
                this.first_aid = 0;
            }
        }
    }
    
    events() {
        const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const randomEvent = this.randomEvent(events);
        if (randomEvent == 1) {
            this.message = "Normal day of travel. 100 miles closer.";
            this.subtrackMiles(100);
        } 
        if (randomEvent == 2) {
            this.message = "You have lost 1 life and only travled 50 miles due to a broken leg";
            this.addAndSubLife(1, 'subtract');
            this.subtrackMiles(50);
        }
        if (randomEvent == 3) {
            this.message = "You have died of dysentery";
            this.life = 0;
        }
        if (randomEvent == 4) {
            var foodAmount = Math.floor(Math.random() * 10);
            this.message = "You have found a Hunting Ground. You have gained " + foodAmount + " food, and traveled 25 miles.";
            this.addAndSubtractFood(foodAmount, 'add');
            this.subtrackMiles(25);
        }
        if (randomEvent == 5) {
            this.message = "You have found a river with fish. You have gained 5 food, and traveled 25 miles.";
            this.addAndSubtractFood(5, 'add');
            this.subtrackMiles(25);
        }
        if (randomEvent == 6) {
            var waterAmount = Math.floor(Math.random() * 5);
            this.message = "You have found clean water. You have gained " + waterAmount + " water, and traveled 25 miles.";
            this.addAndSubWater(waterAmount, 'add');
        }
        if (randomEvent == 7) {
            this.message = "Broken wagon wheel. You made no progress today.";
        }
        if (randomEvent == 8) {
            this.message = "Bandit attack. You have lost 1 life and 10 food.";
            this.addAndSubLife(1, 'subtract');
            this.addAndSubtractFood(10, 'subtract');
        }
        if (randomEvent == 9) {
            this.message = "You have found a town. You have gained 1 first aid kit, and traveled 50 miles.";
            this.addAndSubLife(1, 'add');
            this.subtrackMiles(50);
            this.addAndSubFistAid(1, 'add');
        }
        if (randomEvent == 10) {
            this.message = "You really pushed yourself today. You have lost 1 life, but traveled 150 miles.";
            this.addAndSubLife(1, 'subtract');
            this.subtrackMiles(150);
        }
    }
}