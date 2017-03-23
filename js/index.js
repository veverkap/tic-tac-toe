TicTacToe = (function() {
  // This sets up the default status.  game_over is false obviously
  // and the winner is set to the "magic string" z.  Typically I don't
  // like magic strings, but this seemed to be a good compromise
  function TicTacToe() {
    this.game_over = false;
    this.winner    = "z";
  }

  // This iterates through the game board to check whether we have a
  // winner or not.  First, it goes through the rows, then the columns,
  // then the diagonals and finally it checks whether all cells have
  // been selected for no winner
  TicTacToe.prototype.is_game_over = function() {
    // check the rows
    for (var y = 0; y < 3; y++) {
      if (window.game.has_same_owner([0,y], [1,y], [2,y])) {
        return true;
      }
    }

    // check the columns
    for (var x = 0; x < 3; x++) {
      if (window.game.has_same_owner([x,0], [x,1], [x,2])) {
        return true;
      }
    }

    // check left top to bottom right diagonal
    if (window.game.has_same_owner([0,0], [1,1], [2,2])) {
      return true;
    }

    // check left top to bottom right diagonal
    if (window.game.has_same_owner([2,0], [1,1], [0,2])) {
      return true;
    }

    // check that there are spots without owners
    var count = $("img.player").filter(function(item) {
      return $(this).data("player") == "z";
    }).length;
    
    if (count == 0) {
      window.game.winner = "z";
      return true;
    }
    return false;
  }

  // This is a helper method of sorts for checking three different cells
  // to see if they have the same owner or not.
  TicTacToe.prototype.has_same_owner = function(first_coords, second_coords, third_coords) {
    // get all three cells into jQuery objects
    var first  = $("img[data-x=" +  first_coords[0]  + "][data-y=" + first_coords[1]  + "]");
    var second = $("img[data-x=" +  second_coords[0] + "][data-y=" + second_coords[1] + "]");
    var third  = $("img[data-x=" +  third_coords[0]  + "][data-y=" + third_coords[1]  + "]");
    
    // we need to check that they all match AND that none of them 
    // are set to "z"
    if ((first.data("player") != "z") && (first.data("player") == second.data("player")) && (second.data("player") == third.data("player"))) {
      window.game.winner = first.data("player");
      first.parent().addClass("bg-success");
      second.parent().addClass("bg-success");
      third.parent().addClass("bg-success");
      return true;
    }
    return false;      
  }

  // This is a helper method to grab the current player from the table header
  TicTacToe.prototype.current_player = function() {
    return $("#current_player").data("player");
  }

  // This toggles the UI to display who the current player is
  TicTacToe.prototype.toggle_player = function() {
    if (window.game.current_player() == "x") {
      $("#current_player").data("player", "o");
      $("#current_player_name").html("Current Player: O");
    } else {
      $("#current_player").data("player", "x");
      $("#current_player_name").html("Current Player: X");
    }
  }

  // This is the bulk of the logic.  It updates the cell's owner
  // if it can and then checks to see if the game is over.
  // This method is called on the img.player click
  TicTacToe.prototype.mark_cell = function(e) {
    // If the game has ended, don't allow any cells to change.
    if (window.game.game_over) {
      return false;
    }
    var cell_owner = $(e.target).data("player");
    var player     = window.game.current_player();

    // Check if we can mark this cell or not
    if (window.game.can_mark(cell_owner, player)) {
      // update the "data-player" attribute and style the cell with the image
      $(e.target).data("player", player).addClass("player-" + player); 
      // make the parent TD change color
      $(e.target).parent().addClass("parent-player-" + player);
      // flip the player
      window.game.toggle_player();
    }

    // Check if the game is over or not
    if (window.game.is_game_over()) {
      window.game.game_over = true;
      var msg = "";
      if (window.game.winner == "z") {
        // If we have no winner, we show a particular message
        msg = "GAME OVER, NO ONE WINS";
        $("#error_msg").addClass("bg-danger");
      } else {
        // IF we have a winner, we show that with success
        msg = "GAME OVER, PLAYER " + window.game.winner.toUpperCase() + " WINS";
        $("#error_msg").addClass("bg-success");
      }
      $("#current_player_name").html("GAME OVER");
      $("#error_msg").html(msg);
    }
    e.preventDefault();
    return true;
  };

  // This looks at the cell and sees if it is already spoken for
  TicTacToe.prototype.can_mark = function(cell_owner, player) {
    // If the owner is "z", that means we can mark it
    if (cell_owner === "z") {
      $("#error_msg").html("").removeClass("bg-danger");
      return true;
    }
    // If the cell owner isn't the current user, we show an error
    if (player != cell_owner) {
      $("#error_msg").html("The other player owns this, you can't have it!").addClass("bg-danger");
      return false;
    }      
    // If the cell owner is the current user, we show an error too.
    if (player == cell_owner) {
      $("#error_msg").html("You already chose this one!").addClass("bg-danger");
      return false;
    }
  }
  return TicTacToe;
})();