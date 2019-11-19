'use strict';

// this is an array that holds all category objects
var jeopardyBoard = [];

// this function creates a Category object and pushes it to jeopardyBoard
function Category(name, questions) {
  this.name = name;
  this.questions = questions;
  jeopardyBoard.push(this);
}

// these are the question objects which end up getting pushed to the jeopardyBoard
var cat0 = new Category('science', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?'],
  [200, 'Earth is farthest from the sun during this month', 'July'],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel'],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic'],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten']]);

var cat1 = new Category('war stories', [
  [100, 'The African Queen by C.S. Forester', 'world war I'],
  [200, 'Mister Roberts & The Naked and the Dead', 'world war II'],
  [300, 'Gods and Generals by Jeff Shaara', 'the civil war'],
  [400, 'Rise to Rebellion by Jeff Shaara', 'the american revolution'],
  [500, 'The Last of the Mohicans', 'The French and Indian wars']]);

var cat2 = new Category('category 2', [
  [100, 'clue', 'question'],
  [200, 'clue', 'question'],
  [300, 'clue', 'question'],
  [400, 'clue', 'question'],
  [500, 'clue', 'question']]);

var cat3 = new Category('category 3', [
  [100, 'clue', 'question'],
  [200, 'clue', 'question'],
  [300, 'clue', 'question'],
  [400, 'clue', 'question'],
  [500, 'clue', 'question']]);

var cat4 = new Category('category 4', [
  [100, 'clue', 'question'],
  [200, 'clue', 'question'],
  [300, 'clue', 'question'],
  [400, 'clue', 'question'],
  [500, 'clue', 'question']]);

var cat5 = new Category('category 5', [
  [100, 'clue', 'question'],
  [200, 'clue', 'question'],
  [300, 'clue', 'question'],
  [400, 'clue', 'question'],
  [500, 'clue', 'question at bottom right']]);

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
    td.setAttribute('id', 'cat' + i);
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


var jeopardyDOM = document.getElementById('jeopardy-board');

function renderBoard(domReference) {
  var tr = document.createElement('tr');
  // for (var i = 0; i < category.length; i++) {
  //   var td = document.createElement('td');
  //   td.setAttribute('class', 'card');
  //   td.setAttribute('id', 'cat' + i);
  //   td.textContent = category[i];
  //   tr.append(td);
  // }


  for (var column = 0; column < jeopardyBoard.length; column++)
  {
    console.log(jeopardyBoard[column].name);
  }

  // console.log(jeopardyBoard[0].name);
  // console.log(jeopardyBoard[1].name);
  // console.log(jeopardyBoard[2].name);
  // console.log(jeopardyBoard[3].name);
  // console.log(jeopardyBoard[4].name);
  // console.log(jeopardyBoard[5].name);
  // console.log(jeopardyBoard[0].questions[0][0]);
  // console.log(jeopardyBoard[1].questions[0][0]);
  // console.log(jeopardyBoard[2].questions[0][0]);
  // console.log(jeopardyBoard[3].questions[0][0]);
  // console.log(jeopardyBoard[4].questions[0][0]);
  // console.log(jeopardyBoard[5].questions[0][0]);
  // console.log(jeopardyBoard[0].questions[1][0]);
  // console.log(jeopardyBoard[1].questions[1][0]);
  // console.log(jeopardyBoard[2].questions[1][0]);
  // console.log(jeopardyBoard[3].questions[1][0]);
  // console.log(jeopardyBoard[4].questions[1][0]);
  // console.log(jeopardyBoard[5].questions[1][0]);
  domReference.append(tr);
}
renderBoard(jeopardyDOM);

// Debugging shortcuts
// if i want to get to get data from a specific location do this:
// console.log('the value at bottom right is: ' + jeopardyBoard[0].questions[4][0]);
// console.log('clue at top left: ' + jeopardyBoard[0].questions[0][1]);
// console.log('answer at bottom right: ' + jeopardyBoard[5].questions[4][2]);
// console.log('logs out the entire array with all the objects: ' + jeopardyBoard);
