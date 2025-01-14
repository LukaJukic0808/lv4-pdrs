const assert = require("chai").assert;
const AirFryer = require("./../zad2");

describe("AirFryer test", function () {
    describe("Inputing invalid types into constructor", function () {
        const testApp = new AirFryer(false, 0);
        it("Max capacity invalid", function () {
            assert.isNumber(testApp.maxCapacity);
            assert.equal(testApp.maxCapacity, 2);
        });
        it("Power status invalid", function () {
            assert.isBoolean(testApp.powerStatus);
            assert.equal(testApp.powerStatus, false);
        });
    });

    describe("Inputing valid types into constructor", function () {
        const testApp = new AirFryer(5, false);
        it("Max capacity check", function () {
            assert.isNumber(testApp.maxCapacity);
            assert.equal(testApp.maxCapacity, 5);
        });
        it("Power status check", function () {
            assert.isBoolean(testApp.powerStatus);
            assert.equal(testApp.powerStatus, false);
        });
        it("Default state check", function () {
            assert.equal(testApp.temperature, 0);
            assert.equal(testApp.basket.length, 0);
            assert.equal(testApp.isCooking, false);
            assert.equal(testApp.currentCapacity, 5);
        });
    });

    describe("Checking whether power functions exist and return status", function () {
        const testApp = new AirFryer(5, false);
        it("Turn machine on", function () {
            assert.exists(testApp.turnOn());
        });
        it("Turn machine off", function () {
            assert.exists(testApp.turnOff());
        });
        it("Turn machine on number type", function () {
            assert.isNumber(testApp.turnOn());
        });
        it("Turn machine off number type", function () {
            assert.isNumber(testApp.turnOff());
        });
    });

    describe("Turn on test", function () {
        const testApp = new AirFryer(5, false);
        it("Fryer currently off", function () {
            testApp.powerStatus = false;
            assert.equal(testApp.turnOn(), 200);
            assert.isTrue(testApp.powerStatus);
        });
        it("Fryer currently on", function () {
            testApp.powerStatus = true;
            assert.equal(testApp.turnOn(), 204);
            assert.isTrue(testApp.powerStatus);
        });
    });

    describe("Turn off test", function () {
        const testApp = new AirFryer(5, false);
        it("Fryer currently off", function () {
            testApp.powerStatus = false;
            assert.equal(testApp.turnOff(), 204);
            assert.isFalse(testApp.powerStatus);
            assert.isFalse(testApp.isCooking);
            assert.equal(testApp.temperature, 0);
        });
        it("Fryer currently on", function () {
            testApp.powerStatus = true;
            assert.equal(testApp.turnOff(), 200);
            assert.isFalse(testApp.powerStatus);
            assert.isFalse(testApp.isCooking);
            assert.equal(testApp.temperature, 0);
        });
    });

    describe("Set temperature test", function () {
        const testApp = new AirFryer(5, false);
        it("Fryer currently off", function () {
            assert.equal(testApp.setTemperature(200), 400);
            assert.equal(testApp.temperature, 0);
        });
        it("Invalid temperature inputs", function () {
            testApp.turnOn();
            assert.equal(testApp.setTemperature(false), 400);
            assert.equal(testApp.temperature, 0);
            assert.equal(testApp.setTemperature(99), 400);
            assert.equal(testApp.temperature, 0);
            assert.equal(testApp.setTemperature(251), 400);
            assert.equal(testApp.temperature, 0);
            testApp.turnOff();
        });
        it("Valid temperature input", function () {
            testApp.turnOn();
            assert.equal(testApp.setTemperature(200), 200);
            assert.equal(testApp.temperature, 200);
        });
    });

    describe("Start cooking test", function () {
        const testApp = new AirFryer(5, false);
        it("Fryer currently off", function () {
            assert.equal(testApp.startCooking(), 400);
        });
        it("Fryer currently cooking", function () {
            testApp.turnOn();
            testApp.isCooking = true;
            assert.equal(testApp.startCooking(), 400);
            testApp.isCooking = false;
        });
        it("Temperature not in valid range", function () {
            testApp.turnOn();
            testApp.temperature = 0;
            assert.equal(testApp.startCooking(), 400);
            testApp.temperature = 251;
            assert.equal(testApp.startCooking(), 400);
        });
        it("Basket is empty", function () {
            testApp.turnOn();
            testApp.setTemperature(150)
            assert.equal(testApp.startCooking(), 404);
        });
        it("Valid start cooking call", function () {
            testApp.turnOn();
            testApp.setTemperature(150)
            testApp.add("steak", 2);
            assert.equal(testApp.startCooking(), 200);
            assert.isTrue(testApp.isCooking);
        }); 
    });

    describe("Stop cooking test", function () {
        const testApp = new AirFryer(5, false);
        it("Fryer currently off", function () {
            assert.equal(testApp.stopCooking(), 400);
        });
        it("Fryer currently not cooking", function () {
            testApp.turnOn();
            assert.equal(testApp.stopCooking(), 400);
        });
        it("Valid stop cooking call", function () {
            testApp.turnOn();
            testApp.setTemperature(150)
            testApp.add("steak", 2);
            testApp.startCooking();
            assert.equal(testApp.stopCooking(), 200);
            assert.isFalse(testApp.isCooking);
            assert.equal(testApp.currentCapacity, 5);
            assert.equal(testApp.basket.length, 0);
        }); 
    });

    describe("Add food test", function () {
        const testApp = new AirFryer(5, false);
        it("Add invalid food test", function () {
            assert.equal(testApp.add("something", 2), 400);
        });
        it("Add invalid volume test", function () {
            assert.equal(testApp.add("steak", 0), 400);
        });
        it("Add too much food test", function () {
            assert.equal(testApp.add("steak", 6), 400);
        });
        it("Add valid food with valid volumes test", function () {
            assert.equal(testApp.add("steak", 2), 200);
            assert.equal(testApp.add("pommes frites", 1), 200);
            assert.equal(testApp.add("chicken nuggets", 1), 200);
            assert.equal(testApp.add("pizza", 1), 200);
            assert.equal(testApp.currentCapacity, 0);
            assert.equal(testApp.basket.length, 4);
            assert.isTrue(testApp.basket.includes("steak"));
            assert.isTrue(testApp.basket.includes("pommes frites"));
            assert.isTrue(testApp.basket.includes("chicken nuggets"));
            assert.isTrue(testApp.basket.includes("pizza"));
        });
    });
});