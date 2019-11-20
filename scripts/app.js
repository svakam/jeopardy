'use strict';

var categories = [];

function Category(name, clues) {
  this.name = name;
  this.clues = clues;
  categories.push(this);
}

var Cat0 = new Category('science', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', 'shown'],
  [200, 'Earth is farthest from the sun during this month', 'July', 'shown'],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', 'shown'],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', 'shown'],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', 'shown']
]);

var Cat1 = new Category('war stories', [
  [100, 'The African Queen by C.S. Forester', 'world war I', 'shown'],
  [200, 'Mister Roberts & The Naked and the Dead', 'world war II', 'shown'],
  [300, 'Gods and Generals by Jeff Shaara', 'the civil war', 'shown'],
  [400, 'Rise to Rebellion by Jeff Shaara', 'the american revolution', 'shown'],
  [500, 'The Last of the Mohicans', 'The French and Indian wars', 'shown']
]);

var Cat2 = new Category('Before & After', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', 'shown'],
  [200, 'Earth is farthest from the sun during this month', 'July', 'shown'],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', 'shown'],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', 'hidden'],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', 'shown']
]);

var Cat3 = new Category('category 3', [
  [100, 'category 3 100 clue', 'category 3 100 question', 'shown'],
  [200, 'category 3 200 clue', 'category 3 200 question', 'shown'],
  [300, 'category 3 300 clue', 'category 3 300 question', 'shown'],
  [400, 'category 3 400 clue', 'category 3 400 question', 'shown'],
  [500, 'category 3 500 clue', 'category 3 500 question', 'shown']
]);

var Cat4 = new Category('category 4', [
  [100, 'category 4 100 clue', 'category 4 100 question', 'shown'],
  [200, 'category 4 200 clue', 'category 4 200 question', 'shown'],
  [300, 'category 4 300 clue', 'category 4 300 question', 'shown'],
  [400, 'category 4 400 clue', 'category 4 400 question', 'shown'],
  [500, 'category 4 500 clue', 'category 4 500 question', 'shown']
]);

var Cat5 = new Category('category 5', [
  [100, 'category 5 100 clue', 'category 5 100 question', 'shown'],
  [200, 'category 5 200 clue', 'category 5 200 question', 'shown'],
  [300, 'category 5 300 clue', 'category 5 300 question', 'shown'],
  [400, 'category 5 400 clue', 'category 5 400 question', 'shown'],
  [500, 'category 5 500 clue', 'category 5 500 question', 'shown']
]);

var teams = [];

function Team(name, newScore) {
  this.name = name;
  this.currentScore = newScore;
  teams.push(this);
}

var TeamA = new Team(name, 0);
var TeamB = new Team(name, 0);

function renderBoard(domReference) {
  var tr1 = document.createElement('tr');

  for (var categoryTitleIndex = 0; categoryTitleIndex < categories.length; categoryTitleIndex++) {
    var td1 = document.createElement('td');

    td1.setAttribute('class', 'category');
    td1.textContent = categories[categoryTitleIndex].name;
    tr1.append(td1);
  }
  domReference.append(tr1);


  for (var rowIndex = 0; rowIndex < categories.length - 1; rowIndex++) {
    // PS: categories.lenght - 1 because we've used the first one for the top row
    var tr2 = document.createElement('tr');


    for (var clueIndex = 0; clueIndex < categories.length; clueIndex++) {
      var currentValue = categories[clueIndex].clues[rowIndex][0];
      var isShownFlag = categories[clueIndex].clues[rowIndex][3];
      var td2 = document.createElement('td');

      if (isShownFlag === 'shown') {
        td2.setAttribute('class', 'clue');
        td2.setAttribute('id', `${clueIndex},${rowIndex}`);
        // console.log(`clueIndex: ${clueIndex}, rowIndex: ${rowIndex}`);

        td2.textContent = `$${currentValue}`;
        td2.addEventListener('click', tdClickManager);

        tr2.append(td2);
      } else {
        tr2.append(td2.textContent = '');
      }
    }
    domReference.append(tr2);
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

  // console.log(`getValue clueId: ${clueId}, value: ${categories[categoryIndex].clues[clueIndex][0]}`);

  return categories[categoryIndex].clues[clueIndex][0];
}

function getAClue(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  // console.log(`getAClue clueID: ${clueId}`, `clue: ${categories[categoryIndex].clues[clueIndex][1]}`);

  return categories[categoryIndex].clues[clueIndex][1];
}

function getQuestion(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  // console.log(`getQuestion clueId: ${clueId}`, `question: ${categories[categoryIndex].clues[clueIndex][0]}`);

  return categories[categoryIndex].clues[clueIndex][2];
}

function setHidden(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  // console.log(`setHidden clueId: ${clueId}`, `question: ${categories[categoryIndex].clues[clueIndex][3]}`);

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
var titleFormScreen = document.getElementById('title-form-screen'); // get to html div for screen for intro/form

// render title screen and click on it to go to form
function renderIntroScreen(domRefTitleForm) {
  var title = document.createElement('h1');
  console.log(`Before: Team A ${TeamA.name}, Team B ${TeamB.name}`);
  title.textContent = 'JEOPARDY! (at Code Fellows)';
  domRefTitleForm.append(title);
  domRefTitleForm.addEventListener('click', welcomeClickManager);
}

// transition from title to form
function welcomeClickManager(event) {
  event.target.innerHTML = ''; // set title to blank
  console.log(event);
  console.log(event.target);
  renderForm(titleFormScreen, event.target);
}

// form appended to table to input team names
function renderForm(formInput, h1Content) {
  formInput.removeEventListener('click', welcomeClickManager);
  h1Content.removeEventListener('click', welcomeClickManager);
  h1Content.parentNode.removeChild(h1Content); // removes previous h1
  console.log(formInput);
  var inputStatement = document.createElement('h1');
  inputStatement.textContent = 'What are your team names?';
  formInput.append(inputStatement);

  var form = document.createElement('form');
  var team1Div = document.createElement('div');
  form.append(team1Div);
  var team1Label = document.createElement('label');
  team1Div.append(team1Label);
  team1Label.textContent = 'Team 1: ';
  var team1Input = document.createElement('input');
  team1Input.setAttribute('name', 'team1input');
  team1Div.append(team1Input);
  var team2Div = document.createElement('div');
  form.append(team2Div);
  var team2Label = document.createElement('label');
  team2Label.textContent = 'Team 2: ';
  team2Div.append(team2Label);
  var team2Input = document.createElement('input');
  team2Input.setAttribute('name', 'team2input');
  team2Div.append(team2Input);
  var submitNames = document.createElement('input');
  submitNames.setAttribute('type', 'submit');
  form.append(submitNames);
  formInput.append(form);
  submitNames.addEventListener('submit', function (event) {
    // prevent page reload
    event.preventDefault();

    // input team names to objects
    console.log(event.target.form[0].value);
    console.log(event.target.form[1].value);
    TeamA.name = event.target.form[0].value;
    TeamB.name = event.target.form[1].value;
    console.log(`After: Team A ${TeamA.name}, Team B ${TeamB.name}`);

    // render board
    renderBoard(table);
  });
}

renderIntroScreen(titleFormScreen);
