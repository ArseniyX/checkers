let isRedOrBlue = true;
let previousId = "120";
let possibleStepRight = "";
let possibleStepLeft = "";
let fullColor = "1.0";
let alphaColor = "0.7";
let redCheckers = [];
let blueCheckers = [];

window.onload = function() {
    let checkersTable = document.getElementById("checkers-table");

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
                let checker = document.createElement('div');
                square.id = `${x}${y}`;
                square.onclick = selectSquare;
                square.className = "black-squares";

                function addCheckerToTable(className, onclick) {
                    checker.id = square.id + '0';
                    blueCheckers.push(checker.id);
                    checker.className = className;
                    checker.onclick = onclick;
                }

                if (y < 4)
                {    // Blue checkers
                    addCheckerToTable("blue-checkers", selectCheckerBlue);

                } else if (y > 5)
                {     // Red checkers
                    addCheckerToTable("red-checkers", selectCheckerRed);

                }
                square.append(checker);
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
        if (this.id === possibleStepLeft.toString() || this.id === possibleStepRight.toString()) {
            let prevElement = document.getElementById(previousId);
            consoleLog(this.id);
            this.append(prevElement);
            prevElement.style.opacity = fullColor;
            redCheckers[redCheckers.indexOf(prevElement.id)] = this.id + '0';
            blueCheckers[blueCheckers.indexOf(prevElement.id)] = this.id + '0';
            prevElement.id = this.id + '0';
            setStepColor(possibleStepRight, possibleStepLeft, fullColor);
            this.id.opacity = fullColor;
            previousId = this.id + '0';
            isRedOrBlue = !isRedOrBlue;
            checkAttackNeeded();
            console.log(blueCheckers);
        }
    }
    function consoleLog(id) {
        console.log(`SquareId: ${id} previousId: ${previousId}`);
    }
}

function checkAttackNeeded() { //TODO: End the check attack necessaries
    for (let x = 0; x < blueCheckers.length; x++) {
        for (let y = 0; y < redCheckers.length; y++) {
            if ((blueCheckers[x].toString() === (redCheckers[y] - 110).toString()) &&
                !(blueCheckers[x].toString() === (redCheckers[y] - 220).toString())) {
                console.log(`${blueCheckers[x].toString()} === ${redCheckers[y] - 110}`);
            }
            if ((blueCheckers[x].toString() === (Number(redCheckers[y]) + 90).toString()) &&
                !(blueCheckers[x].toString() === (Number(redCheckers[y]) + 180).toString())) {
                console.log(`${blueCheckers[x].toString()} === ${Number(redCheckers[y]) + 90}`);
            }
        }

    }
}

function selectCheckerBlue() { // Blue Turn
    if (!isRedOrBlue) { // Check the turn for select
        selectAnyChecker(this);
    }
}

function selectCheckerRed() { // Any checker selected
    if (isRedOrBlue) {
        selectAnyChecker(this);
    }
}

function selectAnyChecker(checkerId) {
    document.getElementById(previousId).style.opacity = fullColor;
    if (isStepEmpty(checkerId.id)) {
        checkerId.style.opacity = alphaColor;
    }
    previousId = checkerId.id;
    console.log(checkerId.id);
}

function isStepEmpty(checkerId) {
    let positiveNumber = 9;
    let negativeNumber = 11;

    if (!isRedOrBlue) {
        positiveNumber *= -1;
        negativeNumber *= -1;
    }
    let right = checkerId / 10 + positiveNumber;
    let left = checkerId / 10 - negativeNumber;

    return checkSquares(isSquareEmpty(right), isSquareEmpty(left), right, left);

    function isSquareEmpty(squareId) {
        return isElementNull(squareId) && isSingleCharId(squareId) && isOutOfBound(squareId);
    }

    function isElementNull(id) {
        return !(!!(document.getElementById(id + '0')));
    }

    function isOutOfBound(id) {
        return id.toString()[0] !== "9";
    }

    function isSingleCharId(id){
        return id.toString().length > 1;
    }
}

function checkSquares(rightCheck, leftCheck, right, left) {
    let correct;
    if (rightCheck && leftCheck) {
        correct = `${right} and ${left} is empty`;
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
        correct = false;
    }
    return correct;
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