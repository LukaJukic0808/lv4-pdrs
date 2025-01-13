const assert = require("chai").assert;
const CoffeeMachine = require("./../zad1");

describe("CoffeeMachine test", function () {
    describe("Inputing invalid types into constructor", function () {
        const testApp = new CoffeeMachine(false, false, 0);
        it("Coffee amount invalid", function () {
            assert.isNumber(testApp.coffeeAmount);
            assert.equal(testApp.coffeeAmount, 0);
        });
        it("Water amount invalid", function () {
            assert.isNumber(testApp.waterAmount);
            assert.equal(testApp.waterAmount, 0);
        });
        it("Power status invalid", function () {
            assert.isBoolean(testApp.powerStatus);
            assert.equal(testApp.powerStatus, false);
        });
    });

    describe("Inputing valid types into constructor", function () {
        const testApp = new CoffeeMachine(1, 1, false);
        it("Coffee amount check", function () {
            assert.isNumber(testApp.coffeeAmount);
            assert.equal(testApp.coffeeAmount, 1);
        });
        it("Water amount check", function () {
            assert.isNumber(testApp.waterAmount);
            assert.equal(testApp.waterAmount, 1);
        });
        it("Power status check", function () {
            assert.isBoolean(testApp.powerStatus);
            assert.equal(testApp.powerStatus, false);
        });
    });

    describe("Checking whether power functions exist and return boolean", function () {
        const testApp = new CoffeeMachine(1, 1, false);
        it("Turn machine on", function () {
            assert.exists(testApp.turnMachineOn());
        });
        it("Turn machine off", function () {
            assert.exists(testApp.turnMachineOff());
        });
        it("Turn machine on boolean type", function () {
            assert.isBoolean(testApp.turnMachineOn());
        });
        it("Turn machine off boolean type", function () {
            assert.isBoolean(testApp.turnMachineOff());
        });
    });

    describe("Turn machine on test", function () {
        const testApp = new CoffeeMachine(1, 1, false);
        it("Machine currently off", function () {
            testApp.powerStatus = false;
            testApp.turnMachineOn();
            assert.isTrue(testApp.powerStatus);
        });
        it("Machine currently on", function () {
            testApp.powerStatus = true;
            testApp.turnMachineOn();
            assert.isTrue(testApp.powerStatus);
        });
    });

    describe("Turn machine off test", function () {
        const testApp = new CoffeeMachine(1, 1, false);
        it("Machine currently off", function () {
            testApp.powerStatus = false;
            testApp.turnMachineOff();
            assert.isFalse(testApp.powerStatus);
        });
        it("Machine currently on", function () {
            testApp.powerStatus = true;
            testApp.turnMachineOff();
            assert.isFalse(testApp.powerStatus);
        });
    });

    describe("Refill method test", function () {
        const testApp = new CoffeeMachine(1, 1, false);
        it("Check if method exists", function () {
            assert.exists(testApp.refill(0, 0));
        });
        it("Check if method returns 200 and refills correctly", function () {
            assert.equal(testApp.refill(21, 11), 200);
            assert.equal(testApp.coffeeAmount, 22);
            assert.equal(testApp.waterAmount, 12);
        });
        it("Check if method returns 400 if parameters are negative", function () {
            assert.equal(testApp.refill(-1, -1), 400);
            assert.equal(testApp.coffeeAmount, 22);
            assert.equal(testApp.waterAmount, 12);
        });
        it("Error", function () {
            assert.throws(() => testApp.refill(undefined, null), Error);
        });
    });
    
    describe("Make Coffee method test", function () {
      const testApp = new CoffeeMachine(6, 16, false);
      it("Enough amount of water and coffee", function () {
        assert.isTrue(testApp.makeCoffee());
        assert.equal(1, testApp.coffeeAmount);
        assert.equal(1, testApp.waterAmount);
      });
  
      it("Shortage of water and coffee", function () {
        assert.isFalse(testApp.makeCoffee());
        assert.equal(1, testApp.coffeeAmount);
        assert.equal(1, testApp.waterAmount);
      });
    });
});