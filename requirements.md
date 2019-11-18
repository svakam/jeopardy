# Software requirements 

## Vision: 
Our vision is to create an interactive game similar to the gameshow Jeopardy, where users can select answers on a game board and try to guess the question, accruing points in doing so correctly. We intend to have scores stored and displayed at the end of the game. The purpose of this project is to provide a fun and interactive trivia game for the user to enjoy.

## Scope: 
Our product will take in the user’s name to keep track of their score. We will store a bank of questions and answers with corresponding point values based on the questions’ difficulty. There will be a table on the page with each cell rendered to contain a point value, which on click changes to display an answer in full-screen. The user guesses at the corresponding question, and if they are correct, the score increments by the appropriate point value.
	
Our product will NOT take user-entered text as a response (Instead, the correct response will be shown and the user will simply check a yes or no box to indicate whether they guessed correctly) 

## MVP: 
We are using a constructor function for players to store their name and points accrued. For storing the questions, answers, their point values, and the category names, we will use another constructor

A full screen table element in HTML, minimally styled, with there is a `<tr>` to contain <th> to contain the category headers, all <td>s that will be appended to <tr>s with appropriate dollar amount, question/answer content, and a ‘blank’ or empty string (the dollar amount is shown initially). At this point the table is fully rendered with dollar amounts shown. The audience/team chooses their desired question, and when clicked, the question is displayed via a pseudo-selector in CSS. This also displays a checkbox (yes/no) to indicate whether question was answered correctly, and the response in that checkbox either increments or decrements the score. After clicking the checkbox, the <td> is changed to the blank state to show that question has been completed, and the player can select another question. At the completion of the game, the overall score is stored in local storage.

## Stretch goals: 
CSS animations (flipping card, transition to full screen). Display all time high scores. Daily double. Final jeopardy. Picture/video questions. Storing current state of board beyond page refresh.

## Functional requirements: 
A user can enter their name/team name. A user can click the box/table cell that they want to try to guess. The table cell, when clicked, displays the answer to a question for the user to try to guess. The user makes a guess, and then the correct question is displayed. The user must click a box to indicate whether they guessed correctly. The user’s score is adjusted based on that response. When all cells have been clicked, the final score results are displayed.
