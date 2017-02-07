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

  start(){
    //var count=0;
      this.interval=setInterval(()=>{
      this.update();
      console.log("paso intervalo");

    }, 1000);

  }

  stop() {

    clearInterval(this.interval);

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
            });
            this._passengersLeave();
            this._passengersEnter();

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

  }
  _passengersEnter() {
    let waitingHere = _.remove(this.waitingList, (val) => {
          return this.floor === val.originFloor;
         });

         let newFloors = _.map(waitingHere, (val) => {
           return val.destinationFloor;
         });
         this.passengers = _.concat(this.passengers, waitingHere);
         this.requests = _.union(this.requests, newFloors);
         _.forEach(waitingHere, (val) => {
           console.log(val.name + " has entered the elevator.");
         });

  }

  _passengersLeave() {

    let personsLeaving = _.remove(this.passengers, (val) => {
           return this.floor === val.destinationFloor;
         });
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
