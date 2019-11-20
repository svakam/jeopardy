'use strict';

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



// Laura - local storage:

// info we want to retain in local storage is: team names and their final scores
// that is: this.name and this.currentScore
var localStorageData = 'localStorageData';
// note that the allTeamsEver array will contain every team ever to play the game
var allTeamsEver = [];
// the teams array can be just for the two current teams playing
var teams = [];

function Team(name, newScore) {
  this.name = name;
  this.currentScore = newScore;
  // the following method can remain because we always want to push in each game's instances to the array.
  teams.push(this);

  this.loadData = function (data) {
    // data parameter will be a parsed object
    this.name = data.name;
    this.currentScore = data.currentScore;
  };
}

// we'll always use these two instantiations to create the new/current players for each game
var TeamA = new Team('Team A', 0);
var TeamB = new Team('Team B', 0);

//to determine whether to draw from local storage:
if (localStorage.getItem(localStorageData) === null) {
  // if localstorage is empty, just take in team names like normal and therefore the two current teams would also be all the teams ever
  allTeamsEver = teams;
} else {
  // if localstorage contains items, get them
  var jsonData = localStorage.getItem(localStorageData);
  // parse them
  var data = JSON.parse(jsonData);
  // load them PLUS the current teams into the array
  for (var i = 0; i < data.length; i++) {
    // load in the names and currentScores (which should be the final scores):
    var newTeam = new Team('', '');
    newTeam.loadData(data[i]);
    allTeamsEver.push(newTeam);
  }
  // ... in order to calculate all time high scores at end
}

function saveTeamDataLocally() {
  var jsonData = JSON.stringify(teams);
  localStorage.setItem(localStorageData, jsonData);
}

function gameOver() {
  // this is where we can render all time high scores based on local storage, ie, reference the allTeamsEver array
  saveTeamDataLocally(); // because we only want this fx to be called at the end of the game, when team.currentScore is the *final* score
}

// we will want to remove this fx call and only have it in the gameOVer fx:
saveTeamDataLocally();
// we will also want to clear the teams array within the gameOver fx
teams = [];

// end local storage


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

      if (categories[categoryIndex].clues[rowIndex][3] === true) {
        tdClue.textContent = `$${categories[categoryIndex].clues[rowIndex][0]}`;
        tdClue.addEventListener('click', tdClickManager);
      } else {
        tdClue.textContent = '';
      }
      trClueRow.append(tdClue);
    }
    domReference.append(trClueRow);
  }
}

function getCurrentScores() {
  var currentScores = `${TeamA.name}: $${TeamA.currentScore} | ${TeamB.name}: $${TeamB.currentScore}`;
  return currentScores;
}

function updateScore(team, newScore) {
  return team.currentScore += newScore;
}

function getValue(clueId) {
  var categoryIndex = clueId.charAt(2);
  var clueIndex = clueId.charAt(0);
  return categories[categoryIndex].clues[clueIndex][0];
}

function getAClue(clueId) {
  var categoryIndex = clueId.charAt(2);
  var clueIndex = clueId.charAt(0);
  return categories[categoryIndex].clues[clueIndex][1];
}

function getQuestion(clueId) {
  var categoryIndex = clueId.charAt(2);
  var clueIndex = clueId.charAt(0);
  return categories[categoryIndex].clues[clueIndex][2];
}

function setHidden(clueId) {
  var categoryIndex = clueId.charAt(2);
  var clueIndex = clueId.charAt(0);
  categories[categoryIndex].clues[clueIndex][3] = false;
}

function tdClickManager(event) {
  var clueToDisplay = getAClue(event.target.id);
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

  var questionDisplayDiv = document.createElement('div');
  questionDisplayDiv.setAttribute('class', 'bigQuestion');
  questionDisplayDiv.setAttribute('id', event.target.id);
  questionDisplayDiv.textContent = question;
  table.append(questionDisplayDiv);

  var bigScoreDiv = document.createElement('div');

  var scoresDiv = document.createElement('div');
  scoresDiv.setAttribute('class', 'scoreText');
  scoresDiv.textContent = getCurrentScores();
  bigScoreDiv.append(scoresDiv);

  var buttonsDisplayDiv = document.createElement('div');
  buttonsDisplayDiv.setAttribute('class', 'scoreDiv');

  var team1Correct = document.createElement('button');
  team1Correct.setAttribute('class', 'scoreButton');
  team1Correct.setAttribute('id', event.target.id);
  team1Correct.textContent = 'Team 1 Correct';
  team1Correct.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team1Correct);

  var team1Incorrect = document.createElement('button');
  team1Incorrect.setAttribute('class', 'scoreButton');
  team1Incorrect.setAttribute('id', event.target.id);
  team1Incorrect.textContent = 'Team 1 Incorrect';
  team1Incorrect.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team1Incorrect);

  var team2Correct = document.createElement('button');
  team2Correct.setAttribute('class', 'scoreButton');
  team2Correct.setAttribute('id', event.target.id);
  team2Correct.textContent = 'Team 2 Correct';
  team2Correct.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team2Correct);

  var team2Incorrect = document.createElement('button');
  team2Incorrect.setAttribute('class', 'scoreButton');
  team2Incorrect.setAttribute('id', event.target.id);
  team2Incorrect.textContent = 'Team 2 Incorrect';
  team2Incorrect.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team2Incorrect);

  bigScoreDiv.append(buttonsDisplayDiv);
  table.append(bigScoreDiv);
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
