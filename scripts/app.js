var categories = [];

function Category(name, clues) {
  this.name = name;
  this.clues = clues;
  categories.push(this);
}

// eslint-disable-next-line no-unused-vars
var cat0 = new Category('Computer Science', [
  [100, 'This javascript statement terminates the current loop or statement', 'What is \'break?\'', true],
  [200, 'This word is reserved in JS for removing a property from an object', 'What is \'delete\'?', true],
  [300, 'This compiled language used for data processing has been in use for 60 years', 'What is COBOL?', true],
  [400, 'This famous actress and inventor created an encryption system based on the principles behind player pianos', 'Who is Hedy Lamarr?', true],
  [500, 'This type of callback function is executed immediately when its outer function is invoked', 'What is a \'synchronous callback\'?', true],
]);

// eslint-disable-next-line no-unused-vars
var cat1 = new Category('Pop Culture', [
  [100, 'This former NBA player is perhaps best known for a brief marriage to Kim Kardashian', 'Who is Kris Humphries?', true],
  [200, 'January Jones is a former model married to a Manhattan advertising executive in this AMC original show', 'What is Mad Men?', true],
  [300, 'This actress got her big break in the Harry Potter film series and later became known for her work as a women’s rights activist.', 'Who is Emma Watson?', true],
  [400, 'This fictional character also goes by the name Art Vandelay', 'Who is George Costanza?', true],
  [500, 'This pop singer\'s given name is Ashley Nicolette Frangipane', 'Who is Halsey?', true]
]);

// eslint-disable-next-line no-unused-vars
var cat2 = new Category('Seattle', [
  [100, 'This Seattle icon was built in 1962 as part of the World\'s Fair', 'What is the Space Needle?', true],
  [200, 'One of the members of this band from Aberdeen is part of the ‘27 Club’; other members of that club include Janis Joplin, Jimi Hendrix, and Jim Morrison', 'What is Nirvana?', true],
  [300, 'You get a great view at the top of this 76-story building, the highest in the state of Washington', 'What is the Columbia Center?', true],
  [400, 'These large glass domes are home to over 40,000 plants, as well as workspace for Amazon employees and retail stores', 'What are the Amazon spheres?', true],
  [500, 'At the time of European settlers arriving, the area that is now Seattle was largely populated by these Native Americans', 'Who are the Duwamish tribe?', true]
]);

// eslint-disable-next-line no-unused-vars
var cat3 = new Category('US Presidents', [
  [100, 'He has owned several beauty pageants, sleeps only  3-4 hours per night, and has called golf his \'primary form of exercise\'', 'Who is Donald Trump?', true],
  [200, 'He initially tried to refuse a salary, but Congress insisted and he ended up receiving $25,000 per year during his term', 'Who is George Washington?', true],
  [300, 'This former president now spends his time painting, poetry, fly-fishing, and volunteering with Habitat for Humanity', 'Who is Jimmy Carter?', true],
  [400, 'This president served only 30 days in office', 'Who is William Harrison?', true],
  [500, 'The only person to serve two non-consecutive terms as president', 'Who is Grover Cleveland?', true]
]);

// eslint-disable-next-line no-unused-vars
var cat4 = new Category('Potpourri', [
  [100, 'This heavyweight champion is the only one to finish his career undefeated', 'Who is Rocky Marciano?', true],
  [200, 'This sport involves a bat, a ball, and a wicket at each end of the pitch', 'What is cricket?', true],
  [300, 'This monk with a recognizable name is credited with inventing champagne', 'Who is Dom Perignon?', true],
  [400, 'This type of craftsman takes care of horse hooves, including trimming hooves and placing horseshoes.', 'What is a farrier?', true],
  [500, 'This state, known for its libertarian leanings, has a motto of \'Live Free or Die\'', 'What is New Hampshire?', true]
]);

// eslint-disable-next-line no-unused-vars
var cat5 = new Category('Word Origins', [
  [100, '\'Vaccination\' comes from the Latin word vacca, the word for this animal', 'What is \'cow\'?', true],
  [200, 'The word \'buckaroo\' is a play on this Spanish word meaning cowboy', 'What is \'vaquero\'?', true],
  [300, 'This medical term comes from a combination of Greek words meaning \'against\' and \'life\'', 'What is \'antibiotic\'?', true],
  [400, 'This word describing confusion and uproar comes from the name \'Hospital of St Mary of Bethlehem\', a mental hospital in the 1300s', 'What is \'bedlam\'?', true],
  [500, 'This clothing item was named for a coral reef in the Marshall Islands which was a site of nuclear testing', 'What is a bikini?', true]
]);

var localStorageData = 'localStorageData';

var allTeamsEver = [];

var teams = [];

function Team(name, newScore) {
  this.name = name;
  this.currentScore = newScore;
  teams.push(this);

  this.loadData = function (data) {
    this.name = data.name;
    this.currentScore = data.currentScore;
  };
}

var teamA = new Team(name, 0);
var teamB = new Team(name, 0);


if (localStorage.getItem(localStorageData) === null) {
  allTeamsEver.push(teams[0]);
  allTeamsEver.push(teams[1]);
} else {
  var jsonData = localStorage.getItem(localStorageData);
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

function makeLeadersArray() {
  // temparray of ALL OBJECTS from allTeamsEver
  var tempArray = [];
  for (var i = 0; i < allTeamsEver.length; i++) {
    tempArray.push(allTeamsEver[i]);
    console.log(tempArray[i]);
  }
  console.log(tempArray);
  var leadersArray = [];

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
    tableJeopardy.setAttribute('class', 'jeopardy-page');
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
    domReference.append(tableJeopardy);
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
  clueDisplayDiv.setAttribute('class', 'clue-page');

  table.append(clueDisplayDiv);
  clueDisplayDiv.addEventListener('click', clueClickManager);
}

function clueClickManager(event) {
  var question = getQuestion(event.target.id);
  table.innerHTML = '';

  var questionPage = document.createElement('div');
  questionPage.setAttribute('class', 'question-page');

  var questionDisplayDiv = document.createElement('div');
  questionDisplayDiv.setAttribute('class', 'question-page-upper-half');
  questionDisplayDiv.setAttribute('id', event.target.id);
  questionDisplayDiv.textContent = question;
  questionPage.append(questionDisplayDiv);

  // div for both score display and buttons
  var bigScoreDiv = document.createElement('div');
  bigScoreDiv.setAttribute('id', 'bigScoreDiv');


  // div for scores
  var scoresDiv = document.createElement('div');
  scoresDiv.setAttribute('class', 'scoreText');
  scoresDiv.textContent = getCurrentScores();
  bigScoreDiv.append(scoresDiv);

  // div for buttons
  var buttonsDisplayDiv = document.createElement('div');
  buttonsDisplayDiv.setAttribute('class', 'scoreDiv');

  // container for team 1
  var team1Article = document.createElement('article');
  team1Article.setAttribute('id', 'team1Article');

  var team1Correct = document.createElement('button');
  team1Correct.setAttribute('class', 'scoreButton green');
  team1Correct.setAttribute('id', `${event.target.id} team1correct`);
  console.log(`team 1 correct ${team1Correct.getAttribute('id')}`);
  team1Correct.textContent = 'Correct';
  team1Correct.addEventListener('click', clickScoreManager);
  team1Article.append(team1Correct);

  var team1Incorrect = document.createElement('button');
  team1Incorrect.setAttribute('class', 'scoreButton red');
  team1Incorrect.setAttribute('id', `${event.target.id} team1incorrect`);

  console.log(`team 1 incorrect ${team1Incorrect.getAttribute('id')}`);

  team1Incorrect.textContent = 'Incorrect';
  team1Incorrect.addEventListener('click', clickScoreManager);
  team1Article.append(team1Incorrect);

  // container for pass
  var passArticle = document.createElement('article');
  passArticle.setAttribute('id', 'passArticle');

  var pass = document.createElement('button');
  pass.setAttribute('class', 'scoreButton');
  pass.setAttribute('id', event.target.id);
  pass.textContent = 'PASS';
  pass.addEventListener('click', clickScoreManager);
  passArticle.append(pass);

  // container for team 2
  var team2Article = document.createElement('article');
  team2Article.setAttribute('id', 'team2Article');

  var team2Correct = document.createElement('button');
  team2Correct.setAttribute('class', 'scoreButton green');
  team2Correct.setAttribute('id', `${event.target.id} team2correct`);

  console.log(`team 2 correct ${team2Correct.getAttribute('id')}`);

  team2Correct.textContent = 'Correct';
  team2Correct.addEventListener('click', clickScoreManager);
  team2Article.append(team2Correct);

  var team2Incorrect = document.createElement('button');
  team2Incorrect.setAttribute('class', 'scoreButton red'); // assigning multiple classes through JS like this! took me a long time to figure this out - va
  team2Incorrect.setAttribute('id', `${event.target.id} team2incorrect`);

  console.log(`team 2 incorrect ${team2Incorrect.getAttribute('id')}`);

  team2Incorrect.textContent = 'Incorrect';
  team2Incorrect.addEventListener('click', clickScoreManager);
  team2Article.append(team2Incorrect);

  // append question and button containers to table
  buttonsDisplayDiv.append(team1Article);
  buttonsDisplayDiv.append(passArticle);
  buttonsDisplayDiv.append(team2Article);
  bigScoreDiv.append(buttonsDisplayDiv);

  questionPage.append(bigScoreDiv);
  table.append(questionPage);
}

function clickScoreManager(event) {
  var pointValue = getValue(event.target.id);
  console.log(pointValue);
  console.log(event.target.id);
  console.log(event.target.id.includes('team1correct'));
  // if a button clicked id = team1/2 correct/incorrect, change score by accessing the team constructor
  if (event.target.id.includes('team1correct')) {
    // increment team 1 score by the cell's score
    updateScore(teamA, pointValue);
    console.log(`team a current score is now ${teamA.currentScore}`);
  }

  if (event.target.id.includes('team1incorrect')) {
    // decrement team 1 score by the cell's score
    updateScore(teamA, -pointValue);
    console.log(`team a current score is now ${teamA.currentScore}`);
  }

  if (event.target.innerText === 'PASS') {
    // do nothing
    console.log('pass');
  }

  if (event.target.id.includes('team2correct')) {
    // increment team 2 score by the cell's score
    updateScore(teamB, pointValue);
    console.log(`team b current score is now ${teamB.currentScore}`);
  }

  if (event.target.id.includes('team2incorrect')) {
    // decrement team 2 score by the cell's score
    updateScore(teamB, -pointValue);
    console.log(event.target.id.includes('team1correct'));
    console.log(event.target.id.includes('team2incorrect'));
    console.log(`team b current score is now ${teamB.currentScore}`);
  }

  // clear table of buttons
  table.innerHTML = '';

  renderBoard(table);
}

// render title screen and click on it to go to form
function renderIntroScreen(table) {
  var title = document.createElement('div');
  title.setAttribute('class', 'intro-page');
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
function renderForm(formInput, introContent) {

  formInput.removeEventListener('click', welcomeClickManager);
  introContent.removeEventListener('click', welcomeClickManager);
  introContent.parentNode.removeChild(introContent); // removes previous content

  var formPage = document.createElement('div');
  formPage.setAttribute('class', 'form-page');

  var inputStatement = document.createElement('p');
  inputStatement.textContent = 'What are your team names?';

  formPage.append(inputStatement);
  formInput.append(formPage);



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

  formPage.append(form);
  formInput.append(formPage);

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
