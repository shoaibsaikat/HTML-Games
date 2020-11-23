var player = 1;
var rows = 6;
var cols = 7;
var win = false;

var cells = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

function vertical(player, j) {
    var count = 0;
    for (var k = 0; k < rows; k++) {
        if (cells[k][j] != player) {
            count = 0;
        } else {
            count++;
            if (count >= 4)
                return true;
        }
    }
    return false;
}

function horizontal(player, i) {
    var count = 0;
    for (var k = 0; k < cols; k++) {
        if (cells[i][k] != player) {
            count = 0;
        } else {
            count++;
            if (count >= 4)
                return true;
        }
    }
    return false;
}

function rightDiagonal(player, i, j) {
    while(i > 0 && j > 0) {
        i--;
        j--;
    }

    var count = 0;
    var k = i;
    var l = j;
    for (; k < rows && l < cols; k++, l++) {
        if (cells[k][l] != player) {
            count = 0;
        } else {
            count++;
            if (count >= 4)
                return true;
        }
    }
    return false;
}

function leftDiagonal(player, i, j) {
    while(i > 0 && j < cols - 1) {
        i--;
        j++;
    }

    var count = 0;
    var k = i;
    var l = j;
    for (; k < rows && l >= 0; k++, l--) {
        if (cells[k][l] != player) {
            count = 0;
        } else {
            count++;
            if (count >= 4)
                return true;
        }
    }
    return false;
}

function wins(player, i, j) {
    if (vertical(player, j) || horizontal(player, i) || rightDiagonal(player, i, j) || leftDiagonal(player, i, j))
        return true;
    return false;
}

$(document).ready(function() {

    $('.cell').click(function(event) {

        if (win)
            return;

        var id = $(this).attr("id");
        var col = id[1];
        for (var i = 0; i < rows; i++) {
            if (cells[i][col] == 0) {
                cells[i][col] = player;
                //check win
                if (wins(player, i, parseInt(col, 10))) {
                    if (player == 1) {
                        $(".instruction").html("Player One Wins!");
                    } else {
                        $(".instruction").html("Player Two Wins!");
                    }
                    win = true;
                }
                // set player and change color
                if (player == 1) {
                    $('#' + i + col).css("background", "darkblue");
                    if (!win)
                        $(".instruction").html("Player Two: It is your turn, please pick a column to drop your red chip.");
                    player = 2;
                } else {
                    $('#' + i + col).css("background", "crimson");
                    if (!win)
                        $(".instruction").html("Player One: It is your turn, please pick a column to drop your blue chip.");
                    player = 1;
                }
                break;
            }
        }
    });

    $('#restart').click(function(event) {
        player = 1;
        win = false;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                cells[i][j] = 0;
            }
        }
        $('.cell').css("background", "lightgrey");
        $(".instruction").html("Player One: It is your turn, please pick a column to drop your blue chip.");
    });
});
