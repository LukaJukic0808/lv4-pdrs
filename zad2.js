/*
Potrebno je definirati klasu koja predstavlja fritezu. Stanje klase predstavlja maksimalan kapacitet spremnika,
dostupan kapacitet, informacija o tome radi li friteza, trenutna temperatura, informacija o tome peče li se 
nešto trenutno i što je trenutno u košari friteze.
Potrebno je omogućiti paljenje i gašenje friteze uz provjeru i prikladnu povratnu vrijednost ukoliko se
friteza već nalazi u željenom stanju, te u slučaju gašenja, prikladno ažuriranje stanja klase.
Potrebno je definirati metodu kojom će se postaviti radna temperatura friteze pod uvjetom da mora biti veća
ili jednaka 100 stupnjeva celzijevih i manje jednaka 250. U slučaju krivo predane vrijednosti, vratiti
prikladni statusni kod.
Potrebno je definirati metodu za početak pečenja koja, pod uvjetom ispravno namještene temperature i upaljene
friteze koja nije u stanju pečenja ili prazne košare, započinje pečenje. U slučaju krivog stanja, vratiti
prikladan kod pogreške.
Potrebno je definirati metodu za kraj pečenja koja resetira stanje klase i završava pečenje pod uvjetom da
friteza radi te da je u stanju pečenja.
Potrebno je definirati metodu za dodavanje hrane određenog volumena u košaru. Dozvoljene vrijednosti hrane su
"steak", "pommes frites", "chicken nuggets" i "pizza". Ukoliko u fritezi nije ostalo dovoljno mjesta ili
hrana nije jedna od navedenih, vratiti prikladnu povratnu vrijednost. Sukladno ažurirati i stanje klase.
Glavni oblik komunikacije trebaju biti HTTP Status kodovi, čije vrijednosti jasno upućuju na uspjeh ili
pogrešku.
*/

class AirFryer {
    constructor(maxCapacity, powerStatus) {
        this.maxCapacity = typeof maxCapacity === "number" ? maxCapacity : 2;
        this.currentCapacity = this.maxCapacity;
        this.powerStatus = typeof powerStatus === "boolean" ? powerStatus : false;
        this.temperature = 0;
        this.isCooking = false;
        this.basket = [];
    }

    turnOn() {
        if (this.powerStatus === false) {
            this.powerStatus = true;
            return 200;
        }
        return 204;
    }

    turnOff() {
        if (this.powerStatus === true) {
            this.powerStatus = false;
            this.temperature = 0;
            this.isCooking = false;
            return 200;
        }
        return 204;
    }

    setTemperature(degreesCelsius) {
        if (typeof degreesCelsius === "number" && degreesCelsius >= 100 && degreesCelsius <= 250 
            && this.powerStatus === true) {
            this.temperature = degreesCelsius;
            return 200;
        }
        return 400;
    }

    startCooking() {
        if (this.powerStatus === true && this.isCooking === false && this.temperature >= 100
            && this.temperature <= 250) {
            if (this.basket.length === 0) {
                return 404;
            }
            this.isCooking = true;
            return 200;
        }
        return 400;
    }

    stopCooking() {
        if (this.powerStatus === true && this.isCooking === true) {
            this.isCooking = false;
            this.currentCapacity = this.maxCapacity;
            this.basket = [];
            return 200;
        }
        return 400;
    }

    add(food, volume) {
        if (food === "steak" || food === "pommes frites" || food === "chicken nuggets" || food === "pizza") {
            if (volume > 0 && this.currentCapacity - volume >= 0) {
                this.basket.push(food);
                this.currentCapacity -= volume;
                return 200;
            }
        }
        return 400;
    }
}

module.exports = AirFryer;