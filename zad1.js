class CoffeeMachine {
    constructor(coffeeAmount, waterAmount, powerStatus) {
      this.coffeeAmount = typeof coffeeAmount === "number" ? coffeeAmount : 0;
      this.waterAmount = typeof waterAmount === "number" ? waterAmount : 0;
      this.powerStatus = typeof powerStatus === "boolean" ? powerStatus : false;
    }
  
    turnMachineOn() {
      if (this.powerStatus === false) {
        this.powerStatus = true;
        return this.powerStatus;
      }
      console.log("Machine is already turned on!");
      return this.powerStatus;
    }
  
    turnMachineOff() {
      if (this.powerStatus === true) {
        this.powerStatus = false;
        return this.powerStatus;
      }
      console.log("Machine is already turned off!");
      return this.powerStatus;
    }
  
    refill(coffeeAmount, waterAmount) {
      if (typeof coffeeAmount === "number" && typeof waterAmount === "number") {
        if(coffeeAmount >= 0 && waterAmount >= 0) {
          this.coffeeAmount += coffeeAmount;
          this.waterAmount += waterAmount;
          console.log("Machine refilled !");
          return 200;
        }
        console.log("Invalid amount, you cannot refill negatively!");
        return 400
      }
      throw new Error("Illegal type");
    }
  
    makeCoffee() {
      if (this.coffeeAmount > 5 && this.waterAmount > 15) {
        this.coffeeAmount -= 5;
        this.waterAmount -= 15;
        console.log("Coffee is ready!");
        return true;
      } else {
        console.log("Refill is needed!");
        return false;
      }
    }
  }
  
  module.exports = CoffeeMachine;