export class OregonTrailGame {
    constructor(userName) {
        this.life = 15;
        this.miles_left = 2170;
        this.percent = 0;
        this.water = 15;
        this.food = 50;
        this.first_aid = 5;
        this.game_over = false;
        this.game_won = false;
        this.message = '';
        this.day = 0;
        this.milesTraveledSinceLastTown = 0;
        this.userName = userName;
        this.hunting = false;
        this.fishing = false;
        this.collectWater = false;
        this.userName = userName;
    }

    getHunting() {
        return this.hunting;
    }

    getFishing() {
        return this.fishing;
    }

    getCollectWater() {
        return this.collectWater;
    }

    setHunting(hunting) {
        this.hunting = hunting;
    }

    setFishing(fishing) {
        this.fishing = fishing;
    }

    setCollectWater(collectWater) {
        this.collectWater = collectWater;
    }

    getUserName() {
        return this.userName;
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

    getMilesTraveledSinceLastTown() {
        return this.milesTraveledSinceLastTown;
    }

    setMilesTraveledSinceLastTown(miles) {
        this.milesTraveledSinceLastTown = miles;
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
        if (this.getFirstAid > 0) {
            this.addAndSubLife(1, 'add');
            this.addAndSubFistAid(1, 'subtract');
        }
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
        this.milesTraveledSinceLastTown += miles;
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
            if (this.water > 15) {
                this.water = 15;
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
            if (this.life > 15) {
                this.life = 15;
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
            if (this.first_aid > 5) {
                this.first_aid = 5;
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
        const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const randomEvent = this.randomEvent(events);
        if (randomEvent == 1 || randomEvent == 12) {
            this.message = "Normal day of travel. 100 miles closer.";
            this.subtrackMiles(100);
        } 
        else if (randomEvent == 2 || randomEvent == 13) {
            this.message = "You have lost 1 life and only travled 50 miles due to a broken leg";
            this.addAndSubLife(1, 'subtract');
            this.subtrackMiles(50);
        }
        else if (randomEvent == 3 && this.percent > 50) {
            this.message = "You have died of dysentery";
            this.life = 0;
        }
        else if (randomEvent == 3 && this.getFirstAid() == 0) {
            this.message = "You have lost 1 life due to diesease.";
            this.addAndSubLife(1, 'subtract');
        }
        else if (randomEvent == 3 && this.getFirstAid() > 0) {
            this.message = "You got sick but luckily you had a fisrt aid kit. You have used 1 first aid kit but stayed healthy.";
            this.addAndSubFistAid(1, 'subtract');
        }
        else if (randomEvent == 4 || randomEvent == 14) {
            this.hunting = true;
            this.message = "You have found a Hunting Ground. Would you like to stop and hunt?";
        }
        else if (randomEvent == 5) {
            this.fishing = true;
            this.message = "You have found a river with fish. Would you like to stop and fish?";
        }
        else if (randomEvent == 6 || randomEvent == 15) {
            this.collectWater = true;
            this.message = "You have found clean water. would you like to collect water?";
        }
        else if (randomEvent == 7) {
            this.message = "Broken wagon wheel. You made no progress today.";
        }
        else if (randomEvent == 8) {
            this.message = "Bandit attack. You have lost 1 life and 10 food.";
            this.addAndSubLife(1, 'subtract');
            this.addAndSubtractFood(10, 'subtract');
        }
        else if (randomEvent == 9) {
            this.message = "You have found a traveling tradesman. You have gained 1 first aid kit, and traveled 50 miles.";
            this.addAndSubLife(1, 'add');
            this.subtrackMiles(50);
            this.addAndSubFistAid(1, 'add');
        }
        else if (randomEvent == 10) {
            this.message = "You really pushed yourself today. You have lost 1 life, but traveled 150 miles.";
            this.addAndSubLife(1, 'subtract');
            this.subtrackMiles(150);
        }
        else if (randomEvent == 11 && this.getMilesTraveledSinceLastTown() >= 300) {
            this.message = "You made it to a town. You have gained full stats, and traveled 100 miles.";
            this.subtrackMiles(100);
            this.setLife(15);
            this.setWater(15);
            this.setFood(50);
            this.setFirstAid(5);
            this.setMilesTraveledSinceLastTown(0);
        }
        else if (randomEvent == 11 && this.getMilesTraveledSinceLastTown() < 300) {
            this.message = "You found another ox!! You traveled 200 miles but the ox is too tired to continue.";
            this.subtrackMiles(200);
        }
    }
}