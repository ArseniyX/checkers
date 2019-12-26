let checkersTable = document.getElementById("svg-table");
let isRedOrBlue = true;
let previousId = "120";
let possibleStepRight = "";
let possibleStepLeft = "";
let fullColor = "1.0";
let alphaColor = "0.7";

window.onload = function() {

    for (let y = 1; y <= 8; y++)
    {
        // Row
        let tableRow = document.createElement('tr');
        for (let x = 1; x <= 8; x++) {
            let square = document.createElement('td');
            tableRow.className = "row-element";
            console.log(tableRow);

            if ((x % 2 === 0) && (y % 2 !== 0) || (x % 2 !== 0) && (y % 2 === 0))
            {
                // Black squares
                let checkers = document.createElement('div');
                square.id = `${x}${y}`;
                square.onclick = selectSquare;
                square.className = "black-squares";

                if (y < 4)
                {    // Blue checkers
                    checkers.id = square.id + '0';
                    checkers.className = "blue-checkers";
                    checkers.onclick = selectCheckerBlue;
                } else if (y > 5)
                {     // Red checkers
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
        if (this.id === possibleStepLeft.toString() || this.id === possibleStepRight.toString()) {
            consoleLog(this.id);
            this.append(document.getElementById(previousId));
            document.getElementById(previousId).style.opacity = fullColor;
            document.getElementById(previousId).id = this.id + '0';
            setStepColor(possibleStepRight, possibleStepLeft, fullColor);
            this.id.opacity = fullColor;
            previousId = this.id + '0';
            isRedOrBlue = !isRedOrBlue;
        }
    }
    function consoleLog(id) {
        console.log(`SquareId: ${id} previousId: ${previousId}`);
    }
}

function selectCheckerBlue() { // Blue Turn
    if (!isRedOrBlue) { // Check the turn for select
        if (previousId !== this.id)
        document.getElementById(previousId).style.opacity = fullColor;
        this.style.opacity = alphaColor;
        previousId = this.id;
        console.log(isStepEmpty(this.id));
    }
}

function selectCheckerRed() {
    if (previousId !== this.id && isRedOrBlue) {
        document.getElementById(previousId).style.opacity = fullColor;
        this.style.opacity = alphaColor;
        previousId = this.id;
        console.log(isStepEmpty(this.id));
    }
}

function isStepEmpty(id) {
    let positiveNumber = 9;
    let negativeNumber = 11;

    if (!isRedOrBlue) {
        positiveNumber *= -1;
        negativeNumber *= -1;
    }
    let right = id / 10 + positiveNumber;
    let left = id / 10 - negativeNumber;

    let rightCheck = isElementNull(right) && isOneCharId(right) && isOutOfBound(right);
    let leftCheck = isElementNull(left) && isOneCharId(left) && isOutOfBound(left);

    let correct;

    if (rightCheck && leftCheck) {
        correct = `${id / 10 + positiveNumber} and ${id / 10 - negativeNumber} is empty`;
        possibleStepRight = right;
        possibleStepLeft = left;
        setStepColor(right, left, alphaColor)
    } else if (rightCheck) {
        correct = `${right} is empty`;
        possibleStepRight = right;
        possibleStepLeft = -1;
        setStepColor(right, -1, alphaColor);
    } else if (leftCheck) {
        correct = `${left} is empty`;
        possibleStepRight = -1;
        possibleStepLeft = left;
        setStepColor(-1, left, alphaColor);
    } else {
        possibleStepRight = -1;
        possibleStepLeft = -1;
        correct = `All full ${setStepColor(-1, -1, alphaColor)}`;
    }
    return correct;

    function isElementNull(id) {
        return !(!!(document.getElementById(id + '0')));
    }

    function isOutOfBound(id) {
        return id.toString()[0] !== "9";
    }

    function isOneCharId(id){
        return id.toString().length > 1;
    }
}

function setStepColor(num1, num2, color) {
    if (num1 !== -1 && num2 !== -1) {
        document.getElementById(num1).style.opacity = color;
        document.getElementById(num2).style.opacity = color;
    } else if (num2 === -1 && num1 !== -1) {
        document.getElementById(num1).style.opacity = color;
    } else if (num1 === -1 && num2 !== -1) {
        document.getElementById(num2).style.opacity = color;
    }
}