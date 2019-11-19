var category = ['a', 'b', 'c', 'd', 'e'];

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
    var th = document.createElement('th');
    th.textContent = category[i];
    tr.append(th);
  }
  domReference.append(tr);
}

var array100 = [C1, C2, C3, C4, C5];
var array200 = [C6, C7, C8, C9, C10];
// king of arrays to come back later
// need to add more categories after MVP

function renderBody(domReference) {
  var tr = document.createElement('tr');

  for (var i = 0; i < array100.length; i++) {
    var td = document.createElement('td');
    td.addEventListener('click', tdClickManager);
    var currentArray = array100[i];
    td.textContent = currentArray.pointValue;
    td.setAttribute('id', `100-${i}`);
    tr.append(td);
  }
  domReference.append(tr);

  var tr = document.createElement('tr');

  for (var i = 0; i < array200.length; i++) {
    var td = document.createElement('td');
    td.addEventListener('click', tdClickManager);
    var currentArray = array200[i];
    td.textContent = currentArray.pointValue;
    td.setAttribute('id', `200-${i}`)
    tr.append(td);

  }
  domReference.append(tr);
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
  // 

}

renderHeader(table);
renderBody(table);
