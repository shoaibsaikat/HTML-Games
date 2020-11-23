var boxes = document.querySelectorAll("td");
for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function(e) {
        var text = this.textContent;
        if (text == "") {
            this.textContent = "X";
        } else if (text == "X") {
            this.textContent = "O";
        } else {
            this.textContent = "";
        }
    });
}

var restart = document.querySelector("#restart");
restart.addEventListener('click', function(e) {
    var list = document.querySelectorAll("td");
    for(var i = 0; i < list.length; i++) {
        list[i].textContent = "";
    }
});
