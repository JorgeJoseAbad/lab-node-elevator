/*jshint esversion: 6*/
var _ = require('lodash');

class Elevator {
  constructor(){
    this.floor       = 0;
    this.MAXFLOOR    = 10;
    this.requests    = []; // aquí entrará la cola de peticiones.
    this.direction   = "up";
    this.destination = undefined;
    this.interval    = null;
    this.waitingList = [];
    this.passengers  = [];

}
//console.log(`${2+2}`);

  start(){
    //var count=0;
      this.interval=setInterval(()=>{
      this.update();
      console.log("paso intervalo");

    }, 1000);

  }

  stop() {

    clearInterval(this.interval);
    this.interval=null;

  }

  update(){

    if (this.destination !== undefined){
            if (this.direction === 'up'){
             this.floorUp();
            }
            else {
              this.floorDown();
            }

            this.log();
            _.remove(this.requests, (val) => {
              return val === this.floor;
            }); //retira de las peticiones aquellas que ya se han cumplido (estamos
                 //en el piso requerido)
            this._passengersLeave(); //salen pasajeros
            this._passengersEnter(); //entran pasajeros

            if (this.floor === this.destination){
                this.destination = undefined;
            }
        }

    else {
           this.destination = this.requests.shift();
           if (this.destination !== undefined){
             if (this.destination > this.floor) this.direction = 'up';
             else this.direction = 'down';
           }
    }
   if (this.requests[0]===undefined&&this.waitingList[0]===undefined) this.stop();
  }


  _passengersEnter() {
        let waitingHere = _.remove(this.waitingList, (val) => {
          return this.floor === val.originFloor;
        }); // donde se guardan pasajeros que estan en el piso actual y que
        //estan esperando el ascensor

        let newFloors = _.map(waitingHere, (val) => {
           return val.destinationFloor;
         }); //averigua donde van esos pasajeros y lo guarda en array

         this.passengers = _.concat(this.passengers, waitingHere);
         this.requests = _.concat(this.requests, newFloors); //union impedia nuevas
                                                            //peticiones

         _.forEach(waitingHere, (val) => {
           console.log(val.name + " has entered the elevator.");
         });
  }

  _passengersLeave() {

    let personsLeaving = _.remove(this.passengers, (val) => {
           return this.floor === val.destinationFloor;
         }); //pasajeros que se bajan en este piso

         _.forEach(personsLeaving, (val) => {
           console.log(val.name + " has left the elevator.");
         });
  }



  floorUp() {
    this.direction="up";
    if (this.floor<this.MAXFLOOR){
        this.floor=this.floor+1;
    }
      else {
        this.floor=this.floor;
      }
  }


  floorDown() {
    this.direction="down";
    if (this.floor>0){this.floor=this.floor-1;}
    else {
      this.floor=this.floor;
    }
  }

  call(person) {
  this.waitingList.push(person);
       if (!_.includes(this.requests, person.originFloor)){
         this.requests.push(person.originFloor);
      }
    }





  log() {
    console.log("Direction: "+this.direction+" | "+"Floor: "+this.floor);
  }

}
module.exports = Elevator;

/*
var elevator = new Elevator();

elevator.start();
elevator.log();
elevator.floorUp();
elevator.log();
elevator.floorUp();
elevator.floorUp();
elevator.floorUp();
elevator.floorUp();

elevator.floorDown();
elevator.floorDown();
elevator.floorDown();
elevator.floorDown();
elevator.floorDown();
elevator.floorDown();

/*

//elevator.update();
//elevator.log();



//log();


//update();
*/
