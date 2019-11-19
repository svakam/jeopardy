'use strict';

var category = [
  'Before & After',
  'Science',
  'Literature',
  'American History',
  'Potpourri',
  'Word Origins'
];

function Cell(clue, pointValue, question, categoryIndex) {
  this.clue = clue;
  this.pointValue = pointValue;
  this.question = question;
  this.category = category[categoryIndex];
  this.makeBlank = false;

  // trying to put cells into respective arrays according to their point values
  // function () {
  //   for (var i = 100; i < 500; i += 100) {
  //     if (Cell.pointValue === i) {
  //       array100.push(Cell);
  //     }
  //   }
  // }
}

function Team(name, score) {
  this.name = name;
  this.score = score;
}

var C1 = new Cell('say hi', 100, 'hi', 0);
var C2 = new Cell('say hello', 100, 'hello', 1);
var C3 = new Cell('say whatsup', 100, 'whatsup', 2);
var C4 = new Cell('say ay', 100, 'ay', 3);
var C5 = new Cell('say ayo', 100, 'ayo', 4);
var C6 = new Cell('say hi2', 200, 'hi2', 0);
var C7 = new Cell('say hello2', 200, 'hello2', 1);
var C8 = new Cell('say whatsup2', 200, 'whatsup2', 2);
var C9 = new Cell('say ay2', 200, 'ay2', 3);
var C10 = new Cell('say ayo2', 200, 'ayo2', 4);

var table = document.getElementById('testtable');

function renderHeader(domReference) {
  var tr = document.createElement('tr');

  for (var i = 0; i < category.length; i++) {
    var td = document.createElement('td');
    td.setAttribute('class', 'card');
    td.setAttribute('id', 'clue' + i);
    td.textContent = category[i];
    tr.append(td);
  }
  domReference.append(tr);
}

var array100 = [C1, C2, C3, C4, C5];
var array200 = [C6, C7, C8, C9, C10];
// king of arrays to come back later
// need to add more categories after MVP

function renderBody(domReference) {
  var tr100 = document.createElement('tr');

  // for an array, making a td and also giving it an event listener and an id
  for (var i = 0; i < array100.length; i++) {
    var td100 = document.createElement('td');
    var currentArray100 = array100[i];
    td100.textContent = currentArray100.pointValue;
    td100.setAttribute('id', `100-${i}`);
    td100.addEventListener('click', tdClickManager);
    tr100.append(td100);
  }
  domReference.append(tr100);

  var tr200 = document.createElement('tr');

  for (var j = 0; j < array200.length; j++) {
    var td200 = document.createElement('td');
    var currentArray200 = array200[j];
    td200.textContent = currentArray200.pointValue;
    td200.setAttribute('id', `200-${j}`);
    td200.addEventListener('click', tdClickManager);
    tr200.append(td200);

  }
  domReference.append(tr200);
}

function idSplitter(str) {
  // takes in id of tdClick and returns an array with two integers: the points and the category index
  // get the point value array
  var nums = str.split('-');
  var pointValue = parseInt(nums[0]);
  // get the category index
  var catIndex = parseInt(nums[1]);
  nums = [];
  nums.push(pointValue, catIndex);
  return nums;
}

function findObject(arr) {
  // takes in the array from idsplitter function and determines which clue object to reference

  // figure out which pointValue array
  var arrayFinder = `array${arr[0]}`;
  arrayFinder = window[arrayFinder];
  console.log(arrayFinder);
  // figure out which object in the array we want
  var cellFinder = arrayFinder[arr[1]];
  return cellFinder;
}

function tdClickManager(event) {
  // call id splitter and object finder functions when a cell is clicked on, to get the object
  var idReference = idSplitter(event.target.id);
  var objectReference = findObject(idReference);
  console.log(objectReference.clue);
  table.innerHTML = '';
  var clueDisplayDiv = document.createElement('div');
  clueDisplayDiv.textContent = objectReference.clue;
  table.append(clueDisplayDiv); // accessed the clue and put it on the screen
  clueDisplayDiv.addEventListener('click', clueClickManager);
}

function clueClickManager(event) {
  table.innerHTML = '';
  // stopped here. next step is to display the question and buttons to indicate team correct/incorrect, which changes scores
}

renderHeader(table);
renderBody(table);
