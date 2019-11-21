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

var localStorageData = 'localStorageData';

var allTeamsEver = [];

var teams = [];

function Team(name, newScore) {
  this.name = name;
  this.currentScore = newScore;
  teams.push(this);

  this.loadData = function (data) {
    // data parameter will be a parsed object
    this.name = data.name;
    this.currentScore = data.currentScore;
  };
}

var teamA = new Team(name, 0);
var teamB = new Team(name, 0);

//to determine whether to draw from local storage:
if (localStorage.getItem(localStorageData) === null) {
  // if localstorage is empty, just take in team names like normal and therefore the two current teams would also be all the teams ever
  // allTeamsEver = teams;
} else {
  // if localstorage contains items, get them
  var jsonData = localStorage.getItem(localStorageData);
  // parse them
  var data = JSON.parse(jsonData);
  // load them into the array (load current teams at end of game)
  for (var i = 0; i < data.length; i++) {
    // load in the names and currentScores (which should be the final scores):
    var newTeam = new Team('', '');
    newTeam.loadData(data[i]);
    allTeamsEver.push(newTeam);
  }
}

function saveTeamDataLocally() {
  var jsonData = JSON.stringify(teams);
  localStorage.setItem(localStorageData, jsonData);
}

function makeLeadersArray(arr) {
  // make temparray of ALL OBJECTS from allTeamsEver
  var tempArray = [];
  for (var i = 0; i < allTeamsEver.length; i++) {
    tempArray.push(allTeamsEver[i]);
  }

  // make a leadersarray which will contain ordered top 10 of all time
  var leadersArray = [];

  //loop this while leadersarray<10 long:
  while (leadersArray.length < 10) {
    var max = tempArray[0].currentScore;
    var maxIndex = 0;
    // find the max/indexOfMax of temparray
    for (var j = 1; j < tempArray.length; j++) {
      if (tempArray[j].currentScore > max) {
        maxIndex = j;
        max = tempArray[j].currentScore;
      }
    }
    // take that index and push the corresponding object into a leaders array
    leadersArray.push(tempArray[maxIndex]);
    // remove that index from the temparray
    tempArray.splice(maxIndex, 1);
  }
  return leadersArray;
}

function gameOver() {
  table.innerHTML = '';

  var gameOverPage = document.createElement('div');
  gameOverPage.setAttribute('class', 'game-over-page');

  var gameOverDisplay = document.createElement('p');
  gameOverDisplay.setAttribute('id', 'final-scores');
  gameOverDisplay.textContent = `Game Over! Final Scores: ${teams[0].name}: ${teams[0].currentScore}, ${teams[1].name}: ${teams[1].currentScore} `;
  gameOverPage.append(gameOverDisplay);

  var leaderboard = document.createElement('ol');
  leaderboard.setAttribute('id', 'leader-board');
  leaderboard.textContent = 'Check out the all time high scores:';

  allTeamsEver.push(teams[0]);
  allTeamsEver.push(teams[1]);

  var leadArray = makeLeadersArray();

  for (var i = 0; i < leadArray.length; i++) {
    var score = document.createElement('li');
    score.textContent = `${leadArray[i].name}: $${leadArray[i].currentScore}`;
    score.setAttribute('id', `score-${i}`);
    leaderboard.append(score);
  }

  gameOverPage.append(leaderboard);
  table.append(gameOverPage);

  saveTeamDataLocally();
  teams = [];
}

var clickCounter = 0;


function renderBoard(domReference) {
  if (clickCounter < 2) {
    var tableJeopardy = document.createElement('table');
    var trCategories = document.createElement('tr');
    for (var categoryTitleIndex = 0; categoryTitleIndex < categories.length; categoryTitleIndex++) {
      var tdCategory = document.createElement('td');

      tdCategory.textContent = categories[categoryTitleIndex].name;

      tdCategory.setAttribute('class', 'categoryTd');
      trCategories.append(tdCategory);
    }
    tableJeopardy.append(trCategories);


    for (var rowIndex = 0; rowIndex < categories.length - 1; rowIndex++) {
      var trClueRow = document.createElement('tr');

      for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
        var tdClue = document.createElement('td');

        tdClue.setAttribute('class', 'clueTd');
        tdClue.setAttribute('id', `${rowIndex},${categoryIndex}`);

        if (categories[categoryIndex].clues[rowIndex][3] === true) {
          tdClue.textContent = `$${categories[categoryIndex].clues[rowIndex][0]}`;
          tdClue.addEventListener('click', tdClickManager);
        } else {
          tdClue.textContent = '';
        }
        trClueRow.append(tdClue);
      }
      tableJeopardy.append(trClueRow);
    }
  } else {
    gameOver();
  }
  domReference.append(tableJeopardy);
}

function getCurrentScores() {
  var currentScores = `${teamA.name}: $${teamA.currentScore} | ${teamB.name}: $${teamB.currentScore}`;
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
  clickCounter++;
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
  bigScoreDiv.setAttribute('id', 'bigScoreDiv');

  var scoresDiv = document.createElement('div');
  scoresDiv.setAttribute('class', 'scoreText');
  scoresDiv.textContent = getCurrentScores();
  bigScoreDiv.append(scoresDiv);

  var buttonsDisplayDiv = document.createElement('div');
  buttonsDisplayDiv.setAttribute('class', 'scoreDiv');

  var team1Correct = document.createElement('button');
  team1Correct.setAttribute('class', 'scoreButton');
  team1Correct.setAttribute('id', event.target.id);
  team1Correct.textContent = `${teamA.name} correct`;
  team1Correct.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team1Correct);

  var team1Incorrect = document.createElement('button');
  team1Incorrect.setAttribute('class', 'scoreButton');
  team1Incorrect.setAttribute('id', event.target.id);
  team1Incorrect.textContent = `${teamA.name} incorrect`;
  team1Incorrect.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team1Incorrect);

  var team2Correct = document.createElement('button');
  team2Correct.setAttribute('class', 'scoreButton');
  team2Correct.setAttribute('id', event.target.id);
  team2Correct.textContent = `${teamB.name} correct`;
  team2Correct.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team2Correct);

  var team2Incorrect = document.createElement('button');
  team2Incorrect.setAttribute('class', 'scoreButton');
  team2Incorrect.setAttribute('id', event.target.id);
  team2Incorrect.textContent = `${teamB.name} incorrect`;
  team2Incorrect.addEventListener('click', clickScoreManager);
  buttonsDisplayDiv.append(team2Incorrect);

  bigScoreDiv.append(buttonsDisplayDiv);
  table.append(bigScoreDiv);
}

function clickScoreManager(event) {
  var pointValue = getValue(event.target.id);
  // if a button clicked id = team1/2 correct/incorrect, change score by accessing the team constructor
  if (event.target.innerText === `${teamA.name} correct`) {
    // increment team 1 score by the cell's score
    updateScore(teamA, pointValue);
    console.log(`team a current score is now ${teamA.currentScore}`);
  }

  if (event.target.innerText === `${teamA.name} incorrect`) {
    // decrement team 1 score by the cell's score
    updateScore(teamA, -pointValue);
    console.log(`team a current score is now ${teamA.currentScore}`);
  }

  if (event.target.innerText === `${teamB.name} correct`) {
    // increment team 2 score by the cell's score
    updateScore(teamB, pointValue);
    console.log(`team b current score is now ${teamB.currentScore}`);
  }

  if (event.target.innerText === `${teamB.name} incorrect`) {
    // decrement team 2 score by the cell's score
    updateScore(teamB, -pointValue);
    console.log(`team b current score is now ${teamB.currentScore}`);

  }

  // clear table of buttons
  table.innerHTML = '';

  renderBoard(table);
}

// render title screen and click on it to go to form
function renderIntroScreen(table) {
  var title = document.createElement('div');
  title.setAttribute('class', 'displayBig');
  title.textContent = 'JEOPARDY</>';
  table.append(title);
  table.addEventListener('click', welcomeClickManager);
}

// transition from title to form
function welcomeClickManager(event) {
  event.target.innerHTML = ''; // set title to blank

  renderForm(table, event.target);
}

// form appended to table to input team names
function renderForm(formInput, h1Content) {

  formInput.removeEventListener('click', welcomeClickManager);
  h1Content.removeEventListener('click', welcomeClickManager);
  h1Content.parentNode.removeChild(h1Content); // removes previous h1

  var inputStatement = document.createElement('h1');
  inputStatement.textContent = 'What are your team names?';

  formInput.append(inputStatement);

  var form = document.createElement('form');

  // team 1 elements
  var team1Div = document.createElement('div');
  form.append(team1Div);
  var team1Label = document.createElement('label');
  team1Div.append(team1Label);
  team1Label.textContent = 'Team 1: ';
  var team1Input = document.createElement('input');
  team1Input.setAttribute('name', 'team1input');
  team1Div.append(team1Input);

  // team 2 elements
  var team2Div = document.createElement('div');
  form.append(team2Div);
  var team2Label = document.createElement('label');
  team2Label.textContent = 'Team 2: ';
  team2Div.append(team2Label);
  var team2Input = document.createElement('input');
  team2Input.setAttribute('name', 'team2input');
  team2Div.append(team2Input);

  // submit element
  var submitNames = document.createElement('button');
  submitNames.setAttribute('type', 'submit');
  submitNames.textContent = 'Let\'s go!';
  form.append(submitNames);
  formInput.append(form);
  form.addEventListener('submit', submitNamesAndPlayManager);
}

function submitNamesAndPlayManager(event) {
  // prevent page reload
  // event.preventDefault();

  // input team names to objects
  var teamAinput = event.target[0];
  var teamBinput = event.target[1];
  teamA.name = teamAinput.value;
  teamB.name = teamBinput.value;
  console.log(`After: Team A ${teamA.name}, Team B ${teamB.name}`);

  // render board
  table.innerHTML = '';
  renderBoard(table);
}

var table = document.getElementById('Jeopardy!');
renderIntroScreen(table);
