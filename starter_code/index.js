/*jshint esversion: 6*/

const Elevator = require('./elevator.js');
const Person = require('./person.js');
var _ = require('lodash');

var elevator = new Elevator();

var persons= [
  new Person ("Pedro", 3, 9),
  new Person("Andres",9, 5),
  new Person("perico", 2, 6),
  new Person("Silvia",7,1),
  new Person("Alfredo",2,10),
  new Person("Felipe",10,1),
];


setTimeout(() => {
  _.forEach(persons, (val) => {
   elevator.call(val);
  });
}, 6000); //val es cada elemento de tipo Person, cada persona, que esta en el array persons.

// executes immediately. Christy should be first on the elevator
elevator.call(new Person('christy', 4, 0));

elevator.start();
