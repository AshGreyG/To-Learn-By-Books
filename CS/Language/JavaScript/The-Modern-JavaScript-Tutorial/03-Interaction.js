// 'alert' function shows a message and waits for the user to press "Ok".
// The mini-window with the message is called a "modal" window. The word
// "modal" means that the visitor can't interact with the rest of the page,
// press other buttons, etc, until they have dealt with the window. In this
// case, until they press "Ok".

alert("Hello");

// The function 'prompt' accepts two arguments:
//
// result = prompt(title, [default])
//
// It shows a modal window with a text message, an input field for the visitor,
// and the buttons OK/Cancel. 'title' is the text to show the visitor. 'default'
// is an optional second parameter, the initial value for the input filed.

let age = prompt("How old are you?", 20); 

// Ok in JavaScript, actually 20 should be "20"
// In effect, the type of 'default' parameter is 'string'

// The function 'confirm' shows a modal window with a 'question' and two buttons
// Ok and Cancel. The result is true if Ok is pressed and 'false' otherwise.

let isBoss = confirm("Are you the boss?");

// Task: A simple page
// -------------------

let username = prompt("What's your name?");
alert("Your name is" + username);

// -------------------