'use strict';

var teams = [];

function Team(name, newScore) {
  this.name = name;
  this.currentScore = newScore;
  teams.push(this);
}

var TeamA = new Team('Team A', 0);
var TeamB = new Team('Team B', 0);

var categories = [];

function Category(name, clues) {
  this.name = name;
  this.clues = clues;
  categories.push(this);
}

var Cat0 = new Category('Category 0', [
  [100, 'category 0 100 clue', 'category 0 100 question', true],
  [200, 'category 0 200 clue', 'category 0 200 question', true],
  [300, 'category 0 300 clue', 'category 0 300 question', true],
  [400, 'category 0 400 clue', 'category 0 400 question', true],
  [500, 'category 0 500 clue', 'category 0 500 question', true]
]);

var Cat1 = new Category('Category 1', [
  [100, 'category 1 100 clue', 'category 1 100 question', true],
  [200, 'category 1 200 clue', 'category 1 200 question', true],
  [300, 'category 1 300 clue', 'category 1 300 question', true],
  [400, 'category 1 400 clue', 'category 1 400 question', true],
  [500, 'category 1 500 clue', 'category 1 500 question', true]
]);

var Cat2 = new Category('Category 2', [
  [100, 'category 2 100 clue', 'category 2 100 question', true],
  [200, 'category 2 200 clue', 'category 2 200 question', true],
  [300, 'category 2 300 clue', 'category 2 300 question', true],
  [400, 'category 2 400 clue', 'category 2 400 question', true],
  [500, 'category 2 500 clue', 'category 2 500 question', true]
]);

var Cat3 = new Category('Category 3', [
  [100, 'category 3 100 clue', 'category 3 100 question', true],
  [200, 'category 3 200 clue', 'category 3 200 question', true],
  [300, 'category 3 300 clue', 'category 3 300 question', true],
  [400, 'category 3 400 clue', 'category 3 400 question', true],
  [500, 'category 3 500 clue', 'category 3 500 question', true]
]);

var Cat4 = new Category('Category 4', [
  [100, 'category 4 100 clue', 'category 4 100 question', true],
  [200, 'category 4 200 clue', 'category 4 200 question', true],
  [300, 'category 4 300 clue', 'category 4 300 question', true],
  [400, 'category 4 400 clue', 'category 4 400 question', true],
  [500, 'category 4 500 clue', 'category 4 500 question', true]
]);

var Cat5 = new Category('Category 5', [
  [100, 'category 5 100 clue', 'category 5 100 question', true],
  [200, 'category 5 200 clue', 'category 5 200 question', true],
  [300, 'category 5 300 clue', 'category 5 300 question', true],
  [400, 'category 5 400 clue', 'category 5 400 question', true],
  [500, 'category 5 500 clue', 'category 5 500 question', true]
]);

function renderBoard(domReference) {
  var trCategories = document.createElement('tr');

  for (var categoryTitleIndex = 0; categoryTitleIndex < categories.length; categoryTitleIndex++) {
    var tdCategory = document.createElement('td');

    tdCategory.textContent = categories[categoryTitleIndex].name;

    tdCategory.setAttribute('class', 'category');
    trCategories.append(tdCategory);
  }
  domReference.append(trCategories);


  for (var rowIndex = 0; rowIndex < categories.length - 1; rowIndex++) {
    // PS: categories.lenght - 1 because we've used the first one for the top row
    var trClueRow = document.createElement('tr');

    for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
      var tdClue = document.createElement('td');

      tdClue.setAttribute('class', 'clue');
      tdClue.setAttribute('id', `${rowIndex},${categoryIndex}`);
      tdClue.setAttribute('id', `${rowIndex},${categoryIndex}`);
      tdClue.setAttribute('id', `${rowIndex},${categoryIndex}`);
      tdClue.addEventListener('click', tdClickManager);

      if (categories[categoryIndex].clues[rowIndex][3] === true) {
        tdClue.textContent = `${categories[categoryIndex].clues[rowIndex][0]}`;
      } else {
        tdClue.textContent = '';
      }
      trClueRow.append(tdClue);
    }
    domReference.append(trClueRow);
  }
}

function updateScore(team, newScore) {
  return team.currentScore += newScore;
}

function getScore(team) {
  return team.currentScore;
}

function getValue(clueId) {


  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);


  console.log(`getValue clueId: ${clueId}, value: ${categories[categoryIndex].clues[clueIndex][0]}`);

  return categories[categoryIndex].clues[clueIndex][0];
}

function getAClue(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  console.log(`getAClue clueID: ${clueId}`, `clue: ${categories[categoryIndex].clues[clueIndex][1]}`);

  return categories[categoryIndex].clues[clueIndex][1];
}

function getQuestion(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  console.log(`getQuestion clueId: ${clueId}`, `question: ${categories[categoryIndex].clues[clueIndex][0]}`);

  return categories[categoryIndex].clues[clueIndex][2];
}

function setHidden(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  console.log(`setHidden clueId: ${clueId}`, `question: ${categories[categoryIndex].clues[clueIndex][3]}`);

  categories[categoryIndex].clues[clueIndex][3] = 'hidden';
}

function tdClickManager(event) {
  var clueToDisplay = getAClue(event.target.id);

  console.log(event.target.id);

  setHidden(event.target.id);

  table.innerHTML = '';

  var clueDisplayDiv = document.createElement('div');
  clueDisplayDiv.textContent = clueToDisplay;
  clueDisplayDiv.setAttribute('id', event.target.id);
  clueDisplayDiv.setAttribute('class', 'bigClue');

  table.append(clueDisplayDiv);
  clueDisplayDiv.addEventListener('click', clueClickManager);
}

function clueClickManager(event) {
  var question = getQuestion(event.target.id);

  table.innerHTML = '';

  // display question
  var questionDisplayDiv = document.createElement('div');
  questionDisplayDiv.setAttribute('id', event.target.id);
  questionDisplayDiv.setAttribute('class', 'bigClue');
  questionDisplayDiv.textContent = question;
  table.append(questionDisplayDiv);

  // display buttons
  var buttonsDisplayDiv = document.createElement('div');
  buttonsDisplayDiv.setAttribute('class', 'bigClue');
  // put into separate function at some point?
  // make 4 buttons
  // put click event listeners on them which change team score
  var team1Correct = document.createElement('button');
  var team1Incorrect = document.createElement('button');
  var team2Correct = document.createElement('button');
  var team2Incorrect = document.createElement('button');

  team1Correct.setAttribute('id', event.target.id);
  team1Correct.textContent = 'Team 1 Correct';
  team1Incorrect.setAttribute('id', event.target.id);
  team1Incorrect.textContent = 'Team 1 Incorrect';

  team2Correct.setAttribute('id', event.target.id);
  team2Correct.textContent = 'Team 2 Correct';
  team2Incorrect.setAttribute('id', event.target.id);
  team2Incorrect.textContent = 'Team 2 Incorrect'; // CSS needs to be modified for the buttons to make them show up

  buttonsDisplayDiv.append(team1Correct);
  buttonsDisplayDiv.append(team1Incorrect);
  buttonsDisplayDiv.append(team2Correct);
  buttonsDisplayDiv.append(team2Incorrect);

  team1Correct.addEventListener('click', clickScoreManager);
  team1Incorrect.addEventListener('click', clickScoreManager);
  team2Correct.addEventListener('click', clickScoreManager);
  team2Incorrect.addEventListener('click', clickScoreManager);

  table.append(buttonsDisplayDiv);
}

function clickScoreManager(event) {
  var pointValue = getValue(event.target.id);
  // if a button clicked id = team1/2 correct/incorrect, change score by accessing the team constructor
  if (event.target.innerText === 'Team 1 Correct') {
    // increment team 1 score by the cell's score
    updateScore(TeamA, pointValue);
    console.log(`team a current score is now ${TeamA.currentScore}`);
  }

  if (event.target.innerText === 'Team 1 Incorrect') {
    // decrement team 1 score by the cell's score
    updateScore(TeamA, -pointValue);
    console.log(`team a current score is now ${TeamA.currentScore}`);
  }

  if (event.target.innerText === 'Team 2 Correct') {
    // increment team 2 score by the cell's score
    updateScore(TeamB, pointValue);
    console.log(`team b current score is now ${TeamB.currentScore}`);
  }

  if (event.target.innerText === 'Team 2 Incorrect') {
    // decrement team 2 score by the cell's score
    updateScore(TeamB, -pointValue);
    console.log(`team b current score is now ${TeamB.currentScore}`);
  }


  // toggle blank for that clue by accessing the clue constructor

  // clear table of buttons
  table.innerHTML = '';

  // render board
  renderBoard(table);
}

var table = document.getElementById('table');

renderBoard(table);
