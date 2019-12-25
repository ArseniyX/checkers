let checkersTable = document.getElementById("svg-table");
let turnCounter = 0;
let isRedOrBlue = true;
let isClicked = false;
let colors = {
    red: "red",
    blue: "blue",
    redChecked: "#b24040",
    blueChecked: "#346ce5",
    black: "black",
    white: "white",
    none: "none",
};

window.onload = function() {

    for (let y = 1; y <= 8; y++) {
        // Row
        let tableRow = document.createElement('tr');
        for (let x = 1; x <= 8; x++) {
            let square = document.createElement('td');
            tableRow.className = "row-element";
            console.log(tableRow);

            if ((x % 2 === 0) && (y % 2 !== 0) || (x % 2 !== 0) && (y % 2 === 0)) {
                // Black squares
                let checkers = document.createElement('div');
                square.className = "black-squares";

                if (y < 4) {
                    // Blue checkers
                    checkers.className = "blue-checkers";
                    checkers.onclick = selectCheckerBlue;

                } else if (y > 5) {
                    // Red checkers
                    checkers.className = "red-checkers";
                    checkers.onclick = selectCheckerRed;
                }

                square.appendChild(checkers);
                tableRow.append(square);

            } else {
                // White squares
                square.className = "white-squares";
                tableRow.append(square);
            }
            checkersTable.append(tableRow);
        }
    }
    console.log("Checkers table showed!");
};

function selectCheckerBlue() {
    this.style.opacity = "0.7";
    selectPath(this);


    isRedOrBlue = true;
    console.log(isRedOrBlue);
}

function selectCheckerRed() {


    if (this.isClicked) {
        this.style.opacity = "0.7";
        isClicked = true;
    }

    isRedOrBlue = false;
    console.log();
}

function selectPath(doc) {
    console.log(doc);

}

