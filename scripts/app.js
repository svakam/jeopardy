var categories = [];

function Category(name, clues) {
  this.name = name;
  this.clues = clues;
  categories.push(this);
}

var cat0 = new Category('Computer Science', [
  [100, 'This javascript statement terminates the current loop or statement', 'What is \'break?\'', true],
  [200, 'This word is reserved in JS for removing a property from an object', 'What is \'delete\'?', true],
  [300, 'This programming language was developed by Apple and introduced in 2014', 'What is Swift?', true],
  [400, 'This word is used to describe the process of creating and initializing an object', 'What is construction (or instantiation?', true],
  [500, 'This type of function is declared without any named identifier', 'What is an \'anonymous function\'?', true],
]);

var cat1 = new Category('Pop Culture', [
  [100, 'This former NBA player is perhaps best known for his brief marriage to Kim Kardashian', 'Who is Kris Humphries?', true],
  [200, 'Don Draper is an advertising executive in this AMC original show', 'What is Mad Men?', true],
  [300, 'This actress got her big break in the Harry Potter film series as Hermione Granger', 'Who is Emma Watson?', true],
  [400, 'This fictional sitcom character also goes by the name Art Vandelay', 'Who is George Costanza?', true],
  [500, 'This pop singer, known for hits like \'Bad At Love\' and \'Without Me\', is actually named Ashley Nicolette Frangipane', 'Who is Halsey?', true]
]);

var cat2 = new Category('Seattle', [
  [100, 'This Seattle icon was built in 1962 as part of the World\'s Fair', 'What is the Space Needle?', true],
  [200, 'One of the members of this band from Aberdeen is part of the ‘27 Club’; other members of that club include Janis Joplin, Jimi Hendrix, and Jim Morrison', 'What is Nirvana?', true],
  [300, 'You get a great view at the top of this 76-story building, the highest in the state of Washington', 'What is the Columbia Center?', true],
  [400, 'These large glass domes at the Amazon headquarters are home to over 40,000 plants, as well as workspace for employees and retail stores', 'What are the Amazon spheres?', true],
  [500, 'At the time of European settlers arriving, the area that is now Seattle was populated by these Native Americans', 'Who are the Duwamish tribe?', true]
]);

var cat3 = new Category('US Presidents', [
  [100, 'He has owned several beauty pageants, sleeps only  3-4 hours per night, and has called golf his \'primary form of exercise\'', 'Who is Donald Trump?', true],
  [200, 'In addition to chopping down cherry trees, this president also tried to refuse a salary, but Congress insisted on him getting paid $25,000/year', 'Who is George Washington?', true],
  [300, 'This former president is known for his work volunteering with Habitat for Humanity', 'Who is Jimmy Carter?', true],
  [400, 'This president served four terms, guiding the country through the Great Depression', 'Who is FDR?', true],
  [500, 'The only person to serve two non-consecutive terms as president', 'Who is Grover Cleveland?', true]
]);

var cat4 = new Category('Potpourri', [
  [100, 'This heavyweight champion is the only one to finish his career undefeated', 'Who is Rocky Marciano?', true],
  [200, 'This sport involves a bat, a ball, and a wooden wicket at each end of the pitch', 'What is cricket?', true],
  [300, 'This famous golfer made the news in 2010 when his wife attacked his SUV with a golf club', 'Who is Tiger Woods?', true],
  [400, 'The name of a person who makes or repairs shoes', 'What is a cobbler?', true],
  [500, 'This state, known for its libertarian leanings, has a motto of \'Live Free or Die\'', 'What is New Hampshire?', true]
]);

var cat5 = new Category('Word Origins', [
  [100, '\'Vaccination\' comes from the Latin word vacca, the word for this animal', 'What is \'cow\'?', true],
  [200, 'The word \'buckaroo\' is a play on this Spanish word meaning cowboy', 'What is \'vaquero\'?', true],
  [300, 'This medical term for drugs used to fight infections comes from a combination of Greek words meaning \'against\' and \'life\'', 'What is \'antibiotic\'?', true],
  [400, 'This word describing confusion or uproar comes from the name \'Hospital of St Mary of Bethlehem\', a mental hospital in the 1300s', 'What is \'bedlam\'?', true],
  [500, 'This alcoholic drink (Vinicio\'s favorite!) gets its name from a gaelic word that means \'water of life\'', 'What is whiskey?', true]
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


if (localStorage.getItem(localStorageData) !== null) {
  var jsonData = localStorage.getItem(localStorageData);
  var data = JSON.parse(jsonData);

  for (var i = 0; i < data.length; i++) {
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
  allTeamsEver.push(teamA);
  allTeamsEver.push(teamB);

  var tempArray = [];

  for (var i = 0; i < allTeamsEver.length; i++) {
    tempArray.push(allTeamsEver[i]);
  }

  if (allTeamsEver.length >= 10) {
    var num = 10;
  } else {
    num = allTeamsEver.length;
  }

  var leadersArray = [];

  while (leadersArray.length < num) {
    var max = tempArray[0].currentScore;
    var maxIndex = 0;

    for (var j = 1; j < tempArray.length; j++) {
      if (tempArray[j].currentScore > max) {
        maxIndex = j;
        max = tempArray[j].currentScore;
      }
    }
    leadersArray.push(tempArray[maxIndex]);
    tempArray.splice(maxIndex, 1);
  }
  return leadersArray;
}

function gameOver() {
  table.innerHTML = '';

  var gameOverPage = document.createElement('div');
  gameOverPage.setAttribute('class', 'game-over-page');

  var gameOverDisplay = document.createElement('p');
  gameOverDisplay.setAttribute('id', 'game-over');
  gameOverDisplay.textContent = 'Game Over!';
  gameOverPage.append(gameOverDisplay);

  var ScoresDisplay = document.createElement('p');
  ScoresDisplay.setAttribute('id', 'final-scores');
  ScoresDisplay.textContent =
  `${teamA.name} : $${teamA.currentScore} --- vs --- $${teamB.currentScore} : ${teamB.name}`;
  gameOverPage.append(ScoresDisplay);

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

  var refresh = document.createElement('button');
  refresh.setAttribute('type', 'submit');
  refresh.setAttribute('class', 'scoreButton');
  refresh.setAttribute('onClick', 'window.location.reload();');
  refresh.textContent = 'Play Again!';

  gameOverPage.append(refresh);
}

var clickCounter = 0;


function renderBoard(domReference) {
  if (clickCounter < 7) {
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
}

function getCurrentScores() {
  var currentScores =
  `${teamA.name} : $${teamA.currentScore} --- vs --- $${teamB.currentScore} : ${teamB.name}`;
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

  var bigScoreDiv = document.createElement('div');
  bigScoreDiv.setAttribute('id', 'bigScoreDiv');

  var scoresDiv = document.createElement('div');
  scoresDiv.setAttribute('class', 'scoreText');
  scoresDiv.textContent = getCurrentScores();
  bigScoreDiv.append(scoresDiv);

  var buttonsDisplayDiv = document.createElement('div');
  buttonsDisplayDiv.setAttribute('class', 'scoreDiv');

  var team1Article = document.createElement('article');
  team1Article.setAttribute('id', 'team1Article');

  var team1Correct = document.createElement('button');
  team1Correct.setAttribute('class', 'scoreButton green');
  team1Correct.setAttribute('id', `${event.target.id} team1correct`);
  team1Correct.textContent = 'Correct';
  team1Correct.addEventListener('click', clickScoreManager);
  team1Article.append(team1Correct);

  var team1Incorrect = document.createElement('button');
  team1Incorrect.setAttribute('class', 'scoreButton red');
  team1Incorrect.setAttribute('id', `${event.target.id} team1incorrect`);
  team1Incorrect.textContent = 'Incorrect';
  team1Incorrect.addEventListener('click', clickScoreManager);
  team1Article.append(team1Incorrect);

  var passArticle = document.createElement('article');
  passArticle.setAttribute('id', 'passArticle');

  var pass = document.createElement('button');
  pass.setAttribute('class', 'scoreButton');
  pass.setAttribute('id', event.target.id);
  pass.textContent = 'PASS';
  pass.addEventListener('click', clickScoreManager);
  passArticle.append(pass);

  var team2Article = document.createElement('article');
  team2Article.setAttribute('id', 'team2Article');

  var team2Correct = document.createElement('button');
  team2Correct.setAttribute('class', 'scoreButton green');
  team2Correct.setAttribute('id', `${event.target.id} team2correct`);
  team2Correct.textContent = 'Correct';
  team2Correct.addEventListener('click', clickScoreManager);
  team2Article.append(team2Correct);

  var team2Incorrect = document.createElement('button');
  team2Incorrect.setAttribute('class', 'scoreButton red');
  team2Incorrect.setAttribute('id', `${event.target.id} team2incorrect`);
  team2Incorrect.textContent = 'Incorrect';
  team2Incorrect.addEventListener('click', clickScoreManager);
  team2Article.append(team2Incorrect);

  buttonsDisplayDiv.append(team1Article);
  buttonsDisplayDiv.append(passArticle);
  buttonsDisplayDiv.append(team2Article);
  bigScoreDiv.append(buttonsDisplayDiv);

  questionPage.append(bigScoreDiv);
  table.append(questionPage);
}

function clickScoreManager(event) {
  var pointValue = getValue(event.target.id);

  if (event.target.id.includes('team1correct')) {
    updateScore(teamA, pointValue);
  }

  if (event.target.id.includes('team1incorrect')) {
    updateScore(teamA, -pointValue);
  }

  if (event.target.innerText === 'PASS') {
    updateScore(teamA, 0);
    updateScore(teamB, 0);
  }

  if (event.target.id.includes('team2correct')) {
    updateScore(teamB, pointValue);
  }

  if (event.target.id.includes('team2incorrect')) {
    updateScore(teamB, -pointValue);
  }

  table.innerHTML = '';
  renderBoard(table);
}

function renderIntroScreen(table) {
  var title = document.createElement('div');
  title.setAttribute('class', 'intro-page');
  title.textContent = 'JEOPARDY</>';
  table.append(title);
  table.addEventListener('click', welcomeClickManager);
}

function welcomeClickManager(event) {
  event.target.innerHTML = '';
  renderForm(table, event.target);
}

function renderForm(formInput, introContent) {
  formInput.removeEventListener('click', welcomeClickManager);

  introContent.removeEventListener('click', welcomeClickManager);
  introContent.parentNode.removeChild(introContent);

  var formPage = document.createElement('div');
  formPage.setAttribute('class', 'form-page');

  var inputStatement = document.createElement('p');
  inputStatement.textContent = 'What are your team names?';

  formPage.append(inputStatement);
  formInput.append(formPage);

  var form = document.createElement('form');

  var team1Div = document.createElement('div');
  form.append(team1Div);

  var team1Label = document.createElement('label');
  team1Div.append(team1Label);

  var team1Input = document.createElement('input');
  team1Input.setAttribute('name', 'team1input');
  team1Input.setAttribute('placeholder', 'Team 1 Name:');
  team1Input.setAttribute('id', 'teamForm');
  team1Div.append(team1Input);

  var team2Div = document.createElement('div');
  form.append(team2Div);

  var team2Label = document.createElement('label');
  team2Div.append(team2Label);

  var team2Input = document.createElement('input');
  team2Input.setAttribute('name', 'team2input');
  team2Input.setAttribute('placeholder', 'Team 2 Name:');
  team2Input.setAttribute('id', 'teamForm');
  team2Div.append(team2Input);

  var submitNames = document.createElement('button');
  submitNames.setAttribute('type', 'submit');
  submitNames.setAttribute('class', 'scoreButton');
  submitNames.setAttribute('id', 'letsplayadjust');
  submitNames.textContent = 'Let\'s play!';
  form.append(submitNames);

  formPage.append(form);
  formInput.append(formPage);

  form.addEventListener('submit', submitNamesAndPlayManager);
}

function submitNamesAndPlayManager(event) {
  event.preventDefault();

  var teamAinput = event.target[0];
  var teamBinput = event.target[1];
  teamA.name = teamAinput.value;
  teamB.name = teamBinput.value;

  table.innerHTML = '';
  renderBoard(table);
}

var table = document.getElementById('Jeopardy!');
renderIntroScreen(table);
