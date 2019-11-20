var Cat0 = new Category('Category 0', [
  ['0-0', 'category 0 100 clue', 'category 0 100 question', true],
  ['0-1', 'category 0 200 clue', 'category 0 200 question', true],
  ['0-2', 'category 0 300 clue', 'category 0 300 question', true],
  ['0-3', 'category 0 400 clue', 'category 0 400 question', true],
  ['0-4', 'category 0 500 clue', 'category 0 500 question', true]
]);

var Cat1 = new Category('Category 1', [
  ['1-0', 'category 1 100 clue', 'category 1 100 question', true],
  ['1-1', 'category 1 200 clue', 'category 1 200 question', true],
  ['1-2', 'category 1 300 clue', 'category 1 300 question', true],
  ['1-3', 'category 1 400 clue', 'category 1 400 question', true],
  ['1-4', 'category 1 500 clue', 'category 1 500 question', true]
]);

var Cat2 = new Category('Category 2', [
  ['2-0', 'category 2 100 clue', 'category 2 100 question', true],
  ['2-1', 'category 2 200 clue', 'category 2 200 question', true],
  ['2-2', 'category 2 300 clue', 'category 2 300 question', true],
  ['2-3', 'category 2 400 clue', 'category 2 400 question', true],
  ['2-4', 'category 2 500 clue', 'category 2 500 question', true]
]);

var Cat3 = new Category('Category 3', [
  ['3-0', 'category 3 100 clue', 'category 3 100 question', true],
  ['3-1', 'category 3 200 clue', 'category 3 200 question', true],
  ['3-2', 'category 3 300 clue', 'category 3 300 question', true],
  ['3-3', 'category 3 400 clue', 'category 3 400 question', true],
  ['3-4', 'category 3 500 clue', 'category 3 500 question', true]
]);

var Cat4 = new Category('Category 4', [
  ['4-0', 'category 4 100 clue', 'category 4 100 question', true],
  ['4-1', 'category 4 200 clue', 'category 4 200 question', true],
  ['4-2', 'category 4 300 clue', 'category 4 300 question', true],
  ['4-3', 'category 4 400 clue', 'category 4 400 question', true],
  ['4-4', 'category 4 500 clue', 'category 4 500 question', true]
]);

var Cat5 = new Category('Category 5', [
  ['5-0', 'category 5 100 clue', 'category 5 100 question', true],
  ['5-1', 'category 5 200 clue', 'category 5 200 question', true],
  ['5-2', 'category 5 300 clue', 'category 5 300 question', true],
  ['5-3', 'category 5 400 clue', 'category 5 400 question', true],
  ['5-4', 'category 5 500 clue', 'category 5 500 question', true]
]);




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


    for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
      var currentValue = categories[categoryIndex].clues[rowIndex][0];
      var td2 = document.createElement('td');

      if (isShownFlag === true) {
        var isShownFlag = categories[categoryIndex].clues[rowIndex][3];
        console.log(`is shown=${isShownFlag}`)
        td2.setAttribute('class', 'clue');
        td2.setAttribute('id', `${rowIndex},${categoryIndex}`);
        // console.log(`rowIndex: ${rowIndex}, categoryIndex: ${categoryIndex}, value: ${categories[categoryIndex].clues[rowIndex][0]}, clue: ${categories[categoryIndex].clues[rowIndex][1]}, answer: ${categories[categoryIndex].clues[rowIndex][2]}, shown: ${categories[categoryIndex].clues[rowIndex][3]}`);
        td2.textContent = `$${currentValue}`;
        td2.addEventListener('click', tdClickManager);

        console.log(`shown=true rowIndex: ${rowIndex}, categoryIndex: ${categoryIndex}, shown: ${categories[categoryIndex].clues[rowIndex][3]}`)
      } else {
        td2.setAttribute('class', 'clue');
        td2.setAttribute('id', `${rowIndex},${categoryIndex}`);
        tr2.append(td2.textContent = '');
        tr2.append(td2);
        console.log(`shown=else rowIndex: ${rowIndex}, categoryIndex: ${categoryIndex}, shown: ${categories[categoryIndex].clues[rowIndex][3]}`)
      }
    }
    domReference.append(tr2);
  }
}

var table = document.getElementById('table');
renderBoard(table)