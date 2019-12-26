let checkersTable = document.getElementById("svg-table");
let turnCounter = 0;
let isRedOrBlue = true;
let isCheckerSelected = false;
let isClicked = true;
let previousId = "120";
let possibleStepRight = "";
let possibleStepLeft = "";
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
                //TODO: set the id of all checkers to the id="xy"
                let checkers = document.createElement('div');
                square.id = `${x}${y}`;
                square.onclick = selectSquare;
                square.className = "black-squares";

                if (y < 4) {    // Blue checkers

                    checkers.id = square.id + '0';
                    checkers.className = "blue-checkers";
                    checkers.onclick = selectCheckerBlue;

                } else if (y > 5) {     // Red checkers

                    checkers.id = square.id + '0';
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

function selectSquare() {
    if (!(!!(document.getElementById(this.id + '0')))) {
        console.log(this.id === possibleStepLeft + " " + this.id === possibleStepRight);
        if (this.id === possibleStepLeft.toString()) {
            console.log(`SquareId: ${this.id} previousId: ${previousId}`);
            this.append(document.getElementById(previousId));
            document.getElementById(previousId).id = this.id + '0';
            previousId = this.id + '0';
            isRedOrBlue = !isRedOrBlue;
        } else if (this.id === possibleStepRight.toString()) {
            console.log(`SquareId: ${this.id} previousId: ${previousId}`);
            this.append(document.getElementById(previousId));
            document.getElementById(previousId).id = this.id + '0';
            previousId = this.id + '0';
            isRedOrBlue = !isRedOrBlue;
        }
    }
}

function selectCheckerBlue() {
    if (!isRedOrBlue) {
        if (previousId !== this.id)
        document.getElementById(previousId).style.opacity = '1.0';
        this.style.opacity = '0.7';
        previousId = this.id;
        console.log( isStepEmpty(this.id, isRedOrBlue));
    }
    // console.log(this.id);
}



function selectCheckerRed() {
    if (previousId !== this.id && isRedOrBlue) {
        document.getElementById(previousId).style.opacity = '1.0';
        this.style.opacity = '0.7';
        previousId = this.id;
        console.log( isStepEmpty(this.id, isRedOrBlue));
    }
    // console.log(this.id);
}

function isStepEmpty(id, checkersColor) {
    let positiveNumber;
    let negativeNumber;
    let lineNumberLeft;
    let lineNumberRight;
    let left;
    let right;
    let rightCheck;
    let leftCheck;


    if (checkersColor) {
        positiveNumber = 9;
        negativeNumber = 11;
        lineNumberLeft = "1";
        lineNumberRight = "9";
        right = id / 10 + positiveNumber;
        left = id / 10 - negativeNumber;
        rightCheck = !(!!(document.getElementById(right + '0'))) && right.toString()[0] !== lineNumberRight;
        leftCheck = !(!!(document.getElementById(left + '0'))) && (left).toString().length > 1;

    } else {
        positiveNumber = -9;
        negativeNumber = -11;
        lineNumberLeft = "9";
        lineNumberRight = (id / 10 + positiveNumber).toString().length > 1;
        right = id / 10 + positiveNumber;
        left = id / 10 - negativeNumber;
        rightCheck = !(!!(document.getElementById(right + '0'))) && lineNumberRight;
        leftCheck = !(!!(document.getElementById(left + '0'))) && (left).toString()[0] !== lineNumberLeft ;
    }


    let correct;

    // console.log("Left" + left + "Right" + right + "" + lineNumberRight);
    if (rightCheck && leftCheck) {
        correct = `${id / 10 + positiveNumber} and ${id / 10 - negativeNumber} is empty`;
        possibleStepRight = right;
        possibleStepLeft = left;
        // setStepColor(left, right);
    } else if (rightCheck) {
        correct = `${right} is empty`;
        possibleStepRight = right;
        possibleStepLeft = -1;
        // setStepColor(right, -1);
    } else if (leftCheck) {
        correct = `${left} is empty`;
        possibleStepRight = -1;
        possibleStepLeft = left;
        // setStepColor(-1, left);
    } else {
        possibleStepRight = -1;
        possibleStepLeft = -1;
        correct = `All full ${setStepColor(-1, -1)}`;
    }
    return correct;
}

function setStepColor(num1, num2) {
    if (num1 !== -1 && num2 !== -1) {
        document.getElementById(num1).style.borderColor = colors.red;
        document.getElementById(num2).style.borderColor = colors.red;
    } else if (num2 === -1 && num1 !== -1) {
        document.getElementById(num1).style.borderColor = colors.red;
    } else if (num1 === -1 && num2 !== -1) {
        document.getElementById(num1).style.borderColor = colors.red;
    } else {
        return 0;
    }
}