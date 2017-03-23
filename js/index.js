TicTacToe = (function() {
  function TicTacToe() {
    this.game_over = false;
    this.winner    = 0;
  }

  TicTacToe.prototype.is_match = function(first_coords, second_coords, third_coords) {
    var first  = $("img[data-x=" +  first_coords[0] + "][data-y=" +  first_coords[1] + "]");
    var second = $("img[data-x=" + second_coords[0] + "][data-y=" + second_coords[1] + "]");
    var third  = $("img[data-x=" +  third_coords[0] + "][data-y=" +  third_coords[1] + "]");
    
    if ((first.data("player") != "z") && (first.data("player") == second.data("player")) && (second.data("player") == third.data("player"))) {
      window.game.winner = first.data("player");
      first.parent().addClass("bg-success");
      second.parent().addClass("bg-success");
      third.parent().addClass("bg-success");
      return true;
    }
    return false;      
  }

  TicTacToe.prototype.current_player = function() {
    return $("#current_player").data("player");
  }

  TicTacToe.prototype.toggle_player = function() {
    if (window.game.current_player() == "x") {
      $("#current_player").data("player", "o");
      $("#current_player_name").html("Current Player: O");
    } else {
      $("#current_player").data("player", "x");
      $("#current_player_name").html("Current Player: X");
    }
  }

  TicTacToe.prototype.is_game_over = function() {
    // check the rows
    for (var y = 0; y < 3; y++) {
      if (window.game.is_match([0,y], [1,y], [2,y])) {
        return true;
      }
    }

    // check the columns
    for (var x = 0; x < 3; x++) {
      if (window.game.is_match([x,0], [x,1], [x,2])) {
        return true;
      }
    }

    // check left top to bottom right diagonal
    if (window.game.is_match([0,0], [1,1], [2,2])) {
      return true;
    }

    // check left top to bottom right diagonal
    if (window.game.is_match([2,0], [1,1], [0,2])) {
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

  TicTacToe.prototype.can_move = function(coordinate_owner, player) {
    if (coordinate_owner === "z") {
      $("#error_msg").html("").removeClass("bg-danger");
      return true;
    }
    if (player != coordinate_owner) {
      $("#error_msg").html("The other player owns this, you can't have it!").addClass("bg-danger");
      return false;
    }      
    if (player == coordinate_owner) {
      $("#error_msg").html("You already chose this one!").addClass("bg-danger");
      return false;
    }
  }

  TicTacToe.prototype.move = function(e) {
    if (window.game.game_over) {
      return false;
    }
    var x_coordinate      = $(e.target).data("x");
    var y_coordinate      = $(e.target).data("y");
    var coordinate_owner  = $(e.target).data("player");
    var player            = window.game.current_player();

    if (window.game.can_move(coordinate_owner, player)) {
      $(e.target).data("player", player).addClass("player-" + player);
      $(e.target).parent().addClass("parent-player-" + player);
      window.game.toggle_player();
    }

    if (window.game.is_game_over()) {
      window.game.game_over = true;
      var msg = "";
      if (window.game.winner == "z") {
        msg = "GAME OVER, NO ONE WINS";
        $("#error_msg").addClass("bg-danger");
      } else {
        msg = "GAME OVER, PLAYER " + window.game.winner.toUpperCase() + " WINS";
        $("#error_msg").addClass("bg-success");
      }
      $("#current_player_name").html("GAME OVER");
      $("#error_msg").html(msg);
    }
    e.preventDefault();
    return true;
  };

  return TicTacToe;

})();