## Tic Tac Toe ##

This is my implementation of a Tic Tac Toe game.  I chose to write a web game because it lent itself to the visual game better than a CLI app.  But I am NOT a designer by any stretch of the imagination.  Most of the UI here is leveraging Bootstrap.

I decided to create a 3x3 table with images inside of the cells.  I used the HTML5 data attributes to hold state while using CSS to change which image in the sprite was displayed.  The bulk of the Javascript in [js/index.js](js/index.js) is just iterating through the DOM and finding out the state to decide if the game is over or not.
