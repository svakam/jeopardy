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
// [0: points value, clue, answer, isShownFalg]
var cat0 = new Category('science', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', false],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

var cat1 = new Category('war stories', [
  [100, 'The African Queen by C.S. Forester', 'world war I', true],
  [200, 'Mister Roberts & The Naked and the Dead', 'world war II', true],
  [300, 'Gods and Generals by Jeff Shaara', 'the civil war', true],
  [400, 'Rise to Rebellion by Jeff Shaara', 'the american revolution', true],
  [500, 'The Last of the Mohicans', 'The French and Indian wars', true]
]);

var cat2 = new Category('Before & After', [
  [100, 'clue', 'question', true],
  [200, 'clue', 'question', true],
  [300, 'clue', 'question', true],
  [400, 'clue', 'question', true],
  [500, 'clue', 'question', true]]);

var cat3 = new Category('American History', [
  [100, 'clue', 'question', true],
  [200, 'clue', 'question', true],
  [300, 'clue', 'question', true],
  [400, 'clue', 'question', true],
  [500, 'clue', 'question', true]]);

var cat4 = new Category('Word Origins', [
  [100, 'clue', 'question', true],
  [200, 'clue', 'question', true],
  [300, 'clue', 'question', true],
  [400, 'clue', 'question', true],
  [500, 'clue', 'question', true]]);

var cat5 = new Category('category 5', [
  [100, 'clue', 'question', true],
  [200, 'clue', 'question', true],
  [300, 'clue', 'question', true],
  [400, 'clue', 'question', true],
  [500, 'clue', 'question at bottom right', true]]);

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





function renderBoard(domReference) {
  var tr1 = document.createElement('tr');

  for ( var columnIndexTopRow = 0; columnIndexTopRow < jeopardyBoard.length; columnIndexTopRow++ )
  {
    var td1 = document.createElement('td');
    td1.setAttribute('class', 'card');
    td1.setAttribute('id', 'category' + columnIndexTopRow);
    td1.textContent = jeopardyBoard[columnIndexTopRow].name;
    tr1.append(td1);
  }
  domReference.append(tr1);

  for ( var rowIndex = 0; rowIndex < 5; rowIndex++ ) {
    var tr2 = document.createElement('tr');

    for ( var columnIndexBody = 0; columnIndexBody < 6; columnIndexBody++ ) {
      var currentValue = jeopardyBoard[columnIndexBody].questions[rowIndex][0];
      var isShownFlag = jeopardyBoard[columnIndexBody].questions[rowIndex][3];

      var td2 = document.createElement('td');
      var ahref = document.createElement('a');

      td2.setAttribute('class', 'card');
      td2.setAttribute('id', 'category' + columnIndexBody + 'clue' + rowIndex);
      ahref.setAttribute('href', 'clue.html');
      ahref.textContent = currentValue;

      if (isShownFlag === true) {
        td2.append(ahref);
      } else {
        td2.append(ahref.textContent = '');
      }

      tr2.append(td2);
    }
    domReference.append(tr2);
  }
}



var jeopardyDOM = document.getElementById('jeopardy-board');

renderBoard(jeopardyDOM);

// Debugging shortcuts
// if i want to get to get data from a specific location do this:
// console.log('the value at bottom right is: ' + jeopardyBoard[0].questions[4][0]);
// console.log('clue at top left: ' + jeopardyBoard[0].questions[0][1]);
// console.log('answer at bottom right: ' + jeopardyBoard[5].questions[4][2]);
// console.log('logs out the entire array with all the objects: ' + jeopardyBoard);
