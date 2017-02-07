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
];


setTimeout(() => {
  _.forEach(persons, (val) => {
   elevator.call(val);
  });
 }, 6000);


elevator.start();
