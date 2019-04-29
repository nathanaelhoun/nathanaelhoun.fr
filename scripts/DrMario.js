/**
 * Retro game Dr Mario
 * DrMario.js
 *
 * @author Nathanaël Houn
 */

// ##########################################################################################
// ###################################### Variables #########################################
// ##########################################################################################

//General variables
var isOnFocus = true;
var isOnPause = false;

var gravityRecheck = false;
var isMedicineFalling = false;

var numLevel = 1;
var victory = false;
var defeat = false;
var topScore = 10000;
var playerScore = 0;
var levelNumberOfVirus = 1;

//Rendering variables
var showStartTimer = 0;
var showStartText = false;

//Ground
var bottle = [];

const EMPTY_BOX = {
    type: 0,
    color: 0,
    attached: 0
};

// Coloration variables
const COLORS = ["blue", "red", "yellow"];
const BACKGROUND_COLOR = "grey";
const BORDERS_COLOR = "darkblue";

// Miscellaneous
const BOX_WIDTH = 25;
const BOX_HEIGHT = BOX_WIDTH;
const BOTTLE_HEIGHT = 16;
const BOTTLE_WIDTH = 8;

const VIRUS = 1;
const CAPSULE = 2;
const FALLING_CAPSULE = 3;

const REFRESH_SPEED = 1000;
const GRAVITY_SPEED = 300;

// Medicines
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

var medicine = {
    x: -1,
    y: -1,
    direction: RIGHT,
    color1: "green",
    color2: "green"
};

var nextMedicine = {
    x: -1,
    y: -1,
    direction: RIGHT,
    color1: "green",
    color2: "green"
};

// ##########################################################################################
// ###################################### Functions #########################################
// ##########################################################################################

/**
 * Check if this is a victory for the player
 * @return true if the player wins
 */
function isVictory() {
    return countRemainingVirusNumber(bottle) == 0;
}

/**
 * Check if the player loses
 * @return true if the player loses
 */
function isDefeat() {
    return bottle[0][3].type != 0 || bottle[0][4].type != 0;
}

/**
 * When 'enter' key is pressed, replay or go to next level
 */
function replayTheGame() {
    if (victory) {
        numLevel++;
        victory = false;
        isMedicineFalling = true;

        bottle = bottleInitialization(bottle);
        bottle = randomVirus(bottle, 4 * numLevel);

        medicine = createMedicine(medicine);
    } else if (defeat) {
        defeat = false;
        playerScore = 0;

        bottle = bottleInitialization(bottle);
        bottle = randomVirus(bottle, 4 * numLevel);

        medicine = createMedicine(medicine);
    }
}

/**
 * @return a random number corresponding to a color in the COLORS array
 */
function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Create an empty bottle
 * @param {*} matrice the matrice you want to make empty
 * @return an empty matrice
 */
function bottleInitialization(matrice) {
    for (var i = 0; i < BOTTLE_HEIGHT; i++) {
        var line = [];
        for (var j = 0; j < BOTTLE_WIDTH; j++) {
            line[j] = JSON.parse(JSON.stringify(EMPTY_BOX));
        }
        matrice[i] = line;
    }
    return matrice;
}

/**
 * Fill the bottle with randomly generated virus with random colors
 * @param {*} matrice the matrice which will be filled
 * @param {*} numberOfVirus the number of virus which need to be created
 * @return the matrice with the virus
 */
function randomVirus(matrice, numberOfVirus) {
    var actualNumberOfVirus = 0;
    while (actualNumberOfVirus < numberOfVirus && !isBottleFilled(matrice)) {
        var randomLine = -1;
        var randomColumn = -1;

        do {
            randomLine = Math.floor(Math.random() * (BOTTLE_HEIGHT - 4) + 4);
            randomColumn = Math.floor(Math.random() * BOTTLE_WIDTH);
        } while (
            matrice[randomLine][randomColumn].type !== 0 &&
            !isBottleFilled(matrice)
        );

        if (randomLine >= 0 && randomColumn >= 0) {
            matrice[randomLine][randomColumn].color = randomColor();
            matrice[randomLine][randomColumn].type = VIRUS;
            matrice[randomLine][randomColumn].attached = -1;
            actualNumberOfVirus++;
        }
    }
    levelNumberOfVirus = numberOfVirus;
    return matrice;
}

/**
 * Check if the bottle is filled
 * @param {*} matrice
 * @return true if it is
 */
function isBottleFilled(matrice) {
    var existOneEmptyBox = false;
    var i = 4;
    var j = 0;
    while (i < BOTTLE_HEIGHT && !existOneEmptyBox) {
        j = 0;
        while (j < BOTTLE_WIDTH && !existOneEmptyBox) {
            if (matrice[i][j].type === 0) {
                existOneEmptyBox = true;
            }
            j++;
        }
        i++;
    }
    return !existOneEmptyBox;
}

/**
 * Count the number of remaining virus
 * @param {*} matrice the bottle
 * @return the number of remaining virus
 */
function countRemainingVirusNumber(matrice) {
    var virusNumber = 0;

    for (var i = 0; i < BOTTLE_HEIGHT; i++) {
        for (var j = 0; j < BOTTLE_WIDTH; j++) {
            if (matrice[i][j].type == VIRUS) {
                virusNumber++;
            }
        }
    }

    return virusNumber;
}

/**
 * Detect 4-wide alignement of virus and capsules with the same color and destroy them.
 * @param {*} matrice the bottle in an 2-dim array
 */
function detectColorMatching(matrice) {
    //vertical
    var isVerticalMatchingFound;
    do {
        isVerticalMatchingFound = false;
        var i = 15;
        while (i >= 3 && !isVerticalMatchingFound) {
            var j = 0;
            while (j < 8 && !isVerticalMatchingFound) {
                if (bottle[i][j].type != 0) {
                    if (
                        matrice[i][j].color == matrice[i - 1][j].color &&
                        matrice[i][j].color == matrice[i - 2][j].color &&
                        matrice[i][j].color == matrice[i - 3][j].color
                    ) {
                        isVerticalMatchingFound = true;

                        //Destroy
                        var y = i;
                        do {
                            //Un-attach the attached part
                            switch (matrice[y][j].attached) {
                                case RIGHT:
                                    matrice[y][j + 1].attached = -1;
                                    break;

                                case TOP:
                                    matrice[y - 1][j].attached = -1;
                                    break;

                                case LEFT:
                                    matrice[y][j - 1].attached = -1;
                                    break;

                                case BOTTOM:
                                    matrice[y + 1][j].attached = -1;
                                    break;
                            }
                            //Destroy
                            matrice[y][j] = JSON.parse(JSON.stringify(EMPTY_BOX));

                            y--;
                        } while (matrice[y][j].color == matrice[y - 1][j].color);

                        //Last one
                        //Un-attach the attached part
                        switch (matrice[y][j].attached) {
                            case RIGHT:
                                matrice[y][j + 1].attached = -1;
                                break;

                            case TOP:
                                matrice[y - 1][j].attached = -1;
                                break;

                            case LEFT:
                                matrice[y][j - 1].attached = -1;
                                break;

                            case BOTTOM:
                                matrice[y + 1][j].attached = -1;
                                break;
                        }
                        //Destroy
                        matrice[y][j] = JSON.parse(JSON.stringify(EMPTY_BOX));

                        gravityRecheck = true;
                    }
                }
                j++;
            }
            i--;
        }
    } while (isVerticalMatchingFound);

    //Horizontal
    var isHorizontalMatchingFound;
    do {
        isHorizontalMatchingFound = false;
        var i = 15;
        while (i >= 0 && !isHorizontalMatchingFound) {
            var j = 0;
            while (j < 5 && !isHorizontalMatchingFound) {
                if (bottle[i][j].type != 0) {
                    if (
                        matrice[i][j].color == matrice[i][j + 1].color &&
                        matrice[i][j].color == matrice[i][j + 2].color &&
                        matrice[i][j].color == matrice[i][j + 3].color
                    ) {
                        isHorizontalMatchingFound = true;
                        var x = j;
                        while (matrice[i][x].color == matrice[i][x + 1].color) {
                            switch (matrice[i][x].attached) {
                                case RIGHT:
                                    matrice[i][x + 1].attached = -1;
                                    break;

                                case TOP:
                                    matrice[i - 1][x].attached = -1;
                                    break;

                                case LEFT:
                                    matrice[i][x - 1].attached = -1;
                                    break;

                                case BOTTOM:
                                    matrice[i + 1][x].attached = -1;
                                    break;
                            }
                            matrice[i][x] = JSON.parse(JSON.stringify(EMPTY_BOX));
                            x++;
                        }

                        switch (matrice[i][x].attached) {
                            case RIGHT:
                                matrice[i][x + 1].attached = -1;
                                break;

                            case TOP:
                                matrice[i - 1][x].attached = -1;
                                break;

                            case LEFT:
                                matrice[i][x - 1].attached = -1;
                                break;

                            case BOTTOM:
                                matrice[i + 1][x].attached = -1;
                                break;
                        }
                        matrice[i][x] = JSON.parse(JSON.stringify(EMPTY_BOX));

                        gravityRecheck = true;
                    }
                }
                j++;
            }
            i--;
        }
    } while (isHorizontalMatchingFound);

    return matrice;
}

/**
 * Make the capsules fall if there is nothing under them
 * @param {*} matrice the bottle
 * @return the updated bottle
 */
function capsuleGravity(matrice) {
    gravityRecheck = false;
    //Detect
    for (var i = 14; i >= 0; i--) {
        for (var j = 0; j < 8; j++) {
            if (matrice[i][j].type === CAPSULE) {
                if (
                    i + 1 < 16 &&
                    (matrice[i + 1][j].type == 0 ||
                        matrice[i + 1][j].type == FALLING_CAPSULE)
                ) {
                    var fall = true;
                    switch (matrice[i][j].attached) {
                        case RIGHT:
                            if (
                                matrice[i + 1][j + 1].type != 0 &&
                                matrice[i + 1][j + 1].type != FALLING_CAPSULE
                            ) {
                                fall = false;
                            }
                            break;

                        case LEFT:
                            if (
                                matrice[i + 1][j - 1].type != 0 &&
                                matrice[i + 1][j - 1].type != FALLING_CAPSULE
                            ) {
                                fall = false;
                            }
                            break;
                    }

                    if (fall) {
                        gravityRecheck = true;
                        matrice[i][j].type = FALLING_CAPSULE;
                    }
                }
            }
        }
    }

    //Make fall
    for (var i = 14; i >= 0; i--) {
        for (var j = 0; j < 8; j++) {
            if (matrice[i][j].type === FALLING_CAPSULE) {
                matrice[i + 1][j].color = matrice[i][j].color;
                matrice[i + 1][j].type = CAPSULE;
                matrice[i + 1][j].attached = matrice[i][j].attached;
                matrice[i][j] = JSON.parse(JSON.stringify(EMPTY_BOX));
            }
        }
    }

    return matrice;
}

/**
 * Create a medicine with random colors
 * @param {*} med the medicine you want to reset
 * @return the medicine created
 */
function createMedicine(med) {
    med = {
        x: 3,
        y: 0,
        direction: RIGHT,
        color1: randomColor(),
        color2: randomColor()
    };
    return med;
}

/**
 * Copy the content of oldMed into newMed
 * @param {*} oldMed the med you want to copy
 * @param {*} newMed the destination med
 * @return {*} the new med filled with the content of the old one
 */
function copyMedicine(oldMed, newMed) {
    newMed = {
        x: oldMed.x,
        y: oldMed.y,
        direction: oldMed.direction,
        color1: oldMed.color1,
        color2: oldMed.color2
    };
    isMedicineFalling = true;
    gravityRecheck = false;
    return newMed;
}

/**
 * Check if a medicine can fall (modify global var isMedicineFalling) and if yes, make it fall
 * @param {*} med the medicine
 * @return med the medicine with updated coordinates
 */
function medicineFalling(med) {
    if (med.y >= 15) {
        isMedicineFalling = false;
    } else {
        if (bottle[med.y + 1][med.x].type != 0) {
            isMedicineFalling = false;
        } else {
            switch (med.direction) {
                case RIGHT:
                    if (bottle[med.y + 1][med.x + 1].type != 0) {
                        isMedicineFalling = false;
                    }
                    break;

                case LEFT:
                    if (bottle[med.y + 1][med.x - 1].type != 0) {
                        isMedicineFalling = false;
                    }
                    break;

                case BOTTOM:
                    if (med.y >= 14) {
                        isMedicineFalling = false;
                    } else if (bottle[med.y + 2][med.x].type != 0) {
                        isMedicineFalling = false;
                    }
                    break;
            }
        }
    }
    if (isMedicineFalling) {
        med.y++;
    }
    return med;
}

/**
 * Does exactly what you expect & reset the medicine var
 * @param {*} matrice the bottle you want to transfer in
 * @param {*} med the medicine you want to transfer
 * @return the updated bottle
 */
function transferMedicineToBottle(matrice, med) {
    if (med.x != -1) {
        matrice[med.y][med.x].type = CAPSULE;
        matrice[med.y][med.x].color = med.color1;
        matrice[med.y][med.x].attached = med.direction;

        var x2, y2, direction2;
        switch (med.direction) {
            case RIGHT:
                x2 = med.x + 1;
                y2 = med.y;
                direction2 = LEFT;
                break;

            case BOTTOM:
                x2 = med.x;
                y2 = med.y + 1;
                direction2 = TOP;
                break;

            case LEFT:
                x2 = med.x - 1;
                y2 = med.y;
                direction2 = RIGHT;
                break;

            case TOP:
                x2 = med.x;
                y2 = med.y - 1;
                direction2 = BOTTOM;
                break;
        }
        matrice[y2][x2].type = CAPSULE;
        matrice[y2][x2].color = med.color2;
        matrice[y2][x2].attached = direction2;

        medicine = {
            x: -1,
            y: -1,
            direction: RIGHT,
            color1: "green",
            color2: "green"
        };
        gravityRecheck = true;
    }
    return matrice;
}

/**
 * Check if we can move down the medicine (and do if it is possible)
 */
function moveMedicineDown() {
    var isMoveAllowed = true;
    if (medicine.y >= 15 || medicine.x == -1) {
        isMoveAllowed = false;
    } else {
        if (bottle[medicine.y + 1][medicine.x].type != 0) {
            isMoveAllowed = false;
        } else {
            switch (medicine.direction) {
                case RIGHT:
                    if (bottle[medicine.y + 1][medicine.x + 1].type != 0) {
                        isMoveAllowed = false;
                    }
                    break;

                case LEFT:
                    if (bottle[medicine.y + 1][medicine.x - 1].type != 0) {
                        isMoveAllowed = false;
                    }
                    break;

                case BOTTOM:
                    if (medicine.y >= 14) {
                        isMoveAllowed = false;
                    } else if (bottle[medicine.y + 2][medicine.x].type != 0) {
                        isMoveAllowed = false;
                    }
                    break;
            }
        }
    }
    if (isMoveAllowed) {
        medicine.y++;
    } else {
        isMedicineFalling = false;
    }
}

/**
 * Check if we can move to the left the medicine (and do if it is possible)
 */
function moveMedicineLeft() {
    var isMoveAllowed = true;

    if (medicine.x <= 0) {
        isMoveAllowed = false;
    } else if (bottle[medicine.y][medicine.x - 1].type != 0) {
        isMoveAllowed = false;
    } else {
        switch (medicine.direction) {
            case LEFT:
                if (medicine.x <= 1) {
                    isMoveAllowed = false;
                } else if (bottle[medicine.y][medicine.x - 2].type != 0) {
                    isMoveAllowed = false;
                }
                break;

            case BOTTOM:
                if (bottle[medicine.y + 1][medicine.x - 1].type != 0) {
                    isMoveAllowed = false;
                }
                break;

            case TOP:
                if (bottle[medicine.y - 1][medicine.x - 1].type != 0) {
                    isMoveAllowed = false;
                }
                break;
        }
    }

    if (isMoveAllowed) {
        medicine.x--;
    }
}

/**
 * Check if we can move to the right the medicine (and do if it is possible)
 */
function moveMedicineRight() {
    var isMoveAllowed = true;

    if (medicine.x >= 7 || medicine.x == -1) {
        isMoveAllowed = false;
    } else if (bottle[medicine.y][medicine.x + 1].type != 0) {
        isMoveAllowed = false;
    } else {
        switch (medicine.direction) {
            case RIGHT:
                if (medicine.x >= 6) {
                    isMoveAllowed = false;
                } else if (bottle[medicine.y][medicine.x + 2].type != 0) {
                    isMoveAllowed = false;
                }
                break;

            case BOTTOM:
                if (bottle[medicine.y + 1][medicine.x + 1].type != 0) {
                    isMoveAllowed = false;
                }
                break;

            case TOP:
                if (bottle[medicine.y - 1][medicine.x + 1].type != 0) {
                    isMoveAllowed = false;
                }
                break;
        }
    }

    if (isMoveAllowed) {
        medicine.x++;
    }
}

/**
 * Check if we can rotate the medicine (and do if it is possible)
 */
function rotateMedicine() {
    if (medicine.x != -1) {
        var isMoveAllowed = true;
        var newdirection = medicine.direction - 1;
        if (newdirection < 0) {
            newdirection = 3;
        }

        var newX = medicine.x;
        var newY = medicine.y;
        switch (newdirection) {
            case RIGHT:
                newY += 1;
                if (medicine.x >= 7) {
                    newX -= 1;
                } else if (bottle[medicine.y + 1][medicine.x + 1].type != 0) {
                    if (bottle[medicine.y][medicine.x - 1].type == 0) {
                        newX -= 1;
                    } else {
                        isMoveAllowed = false;
                    }
                }
                break;

            case BOTTOM:
                newX -= 1;
                newY -= 1;
                if (bottle[medicine.y - 1][medicine.x - 1].type != 0) {
                    if (bottle[medicine.y + 1][medicine.x].type == 0) {
                        newY += 1;
                    } else {
                        isMoveAllowed = false;
                    }
                }
                break;

            case LEFT:
                newX += 1;
                if (medicine.x >= 7) {
                    newX -= 1;
                    if (bottle[medicine.y][medicine.x - 1].type != 0) {
                        isMoveAllowed = false;
                    }
                } else if (bottle[medicine.y][medicine.x + 1].type != 0) {
                    if (bottle[medicine.y][medicine.x - 1].type == 0) {
                        newX -= 1;
                    } else {
                        isMoveAllowed = false;
                    }
                }
                break;

            case TOP:
                if (bottle[medicine.y - 1][medicine.x].type != 0) {
                    if (bottle[medicine.y + 1][medicine.x].type == 0) {
                        newY += 1;
                    } else {
                        isMoveAllowed = false;
                    }
                }
                break;
        }

        if (isMoveAllowed) {
            medicine.direction = newdirection;
            medicine.x = newX;
            medicine.y = newY;
        }
    }
}

// ##########################################################################################
// ##################################### Rendering ##########################################
// ##########################################################################################

/**
 * Colorize the top left corner of a box to make the inside looks like it was rounded
 * @param {*} x the x coordinate of the box in the canvas
 * @param {*} y the y coordinate of the box in the canvas
 * @param {*} color the color of the corner
 */
function renderTopLeftCorner(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 1, 4);
    context.fillRect(x + 1, y, 3, 1);
    context.fillRect(x + 1, y + 1, 1, 1);
}

/**
 * Colorize the top right corner of a box to make the inside looks like it was rounded
 * @param {*} x the x coordinate of the box in the canvas
 * @param {*} y the y coordinate of the box in the canvas
 * @param {*} color the color of the corner
 */
function renderTopRightCorner(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x + 20, y, 1, 4);
    context.fillRect(x + 17, y, 3, 1);
    context.fillRect(x + 19, y + 1, 1, 1);
}

/**
 * Colorize the bottom left corner of a box to make the inside looks like it was rounded
 * @param {*} x the x coordinate of the box in the canvas
 * @param {*} y the y coordinate of the box in the canvas
 * @param {*} color the color of the corner
 */
function renderBottomLeftCorner(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y + 17, 1, 4);
    context.fillRect(x + 1, y + 20, 3, 1);
    context.fillRect(x + 1, y + 19, 1, 1);
}

/**
 * Colorize the bottom right corner of a box to make the inside looks like it was rounded
 * @param {*} x the x coordinate of the box in the canvas
 * @param {*} y the y coordinate of the box in the canvas
 * @param {*} color the color of the corner
 */
function renderBottomRightCorner(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x + 20, y + 17, 1, 4);
    context.fillRect(x + 17, y + 20, 3, 1);
    context.fillRect(x + 19, y + 19, 1, 1);
}

/**
 * Render a virus
 * @param {*} x the x coordinate of the virus in the canvas
 * @param {*} y the y coordinate of the virus in the canvas
 * @param {*} color the color of the virus
 */
function renderVirus(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);

    //Don't smile
    context.fillStyle = "black";
    context.fillRect(x + 4, y + 4, 3, 5);
    context.fillRect(x + 14, y + 4, 3, 5);
    context.fillRect(x + 4, y + 13, 12, 3);
    context.fillRect(x + 3, y + 15, 3, 3);
    context.fillRect(x + 15, y + 15, 3, 3);

    //Corners
    renderTopLeftCorner(x, y, BACKGROUND_COLOR);
    renderTopRightCorner(x, y, BACKGROUND_COLOR);
    renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
    renderBottomRightCorner(x, y, BACKGROUND_COLOR);
}

/**
 * Render the victory screen
 */
function renderVictoryScreen() {
    //Outline
    context.fillStyle = "black";
    context.fillRect(210, 200, 180, 200);

    //Background
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(215, 205, 170, 190);

    //Text
    context.font = "40px Verdana";
    context.fillStyle = "black";
    context.fillText("STAGE", 220, 250,160);
    context.fillText("CLEAR", 250, 285,130);
    context.fillText("TRY", 230, 350,150);
    context.fillText("NEXT", 270, 385,110);
}

/**
 * Render the defeat screen
 */
function renderDefeatScreen() {
    //Outline
    context.fillStyle = "black";
    context.fillRect(210, 200, 180, 200);

    //Background
    context.fillStyle = "darkgrey";
    context.fillRect(215, 205, 170, 190);

    //Text
    context.font = "40px Verdana";
    context.fillStyle = "black";
    context.fillText("DEFEAT", 220, 250,160);
    context.fillText("TRY", 220, 350,160);
    context.fillText("AGAIN", 250, 385,130);
}

/**
 * Render an empty panel
 * @param int x the x coordinate of the panel
 * @param int y the y coordinate of the panel
 * @param int width of the panel
 * @param int height of the panel
 */
function renderEmptyPanel(x, y, width, height) {
    context.fillStyle = BORDERS_COLOR;
    context.fillRect(x, y, width + 4, height + 4);
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(x + 2, y + 2, width, height);
}

/**
 * Render the score panel
 */
function renderScorePanel() {
    renderEmptyPanel(70, 140, 100, 100);

    context.fillStyle = "black";
    context.font = "bold 25px Arial"
    context.fillText("TOP : ", 77, 167, 90);
    context.fillText(topScore, 77, 189, 90);

    context.fillText("SCORE : ", 77, 217, 90);
    context.fillText(playerScore, 77, 237, 90);
}

/**
 * Render information panel
 */
function renderInformationPanel() {
    renderEmptyPanel(425, 300, 100, 200);

    context.fillStyle = "black";
    context.font = "bold 25px Arial"
    // Level number
    context.fillText("LEVEL ", 432, 332, 90);
    context.fillText(numLevel, 472, 357, 50);
    // Level speed
    context.fillText("SPEED ", 432, 397, 90);
    context.fillText("So low", 432, 422, 90);
    // Number of virus
    context.fillText("VIRUS ", 432, 462, 90);
    context.fillText(levelNumberOfVirus, 472, 487, 50);
}


/**
 * Render "start" with blinking
 */
function renderStartText() {
    if (Date.now() - showStartTimer > 500) {
        showStartText = !showStartText;
        showStartTimer = Date.now();
    }
    if (showStartText) {
        context.font = "40px Verdana";
        context.fillStyle = "white";
        context.fillText("START", 240, 500,120);
    }
}

/**
 * Render a medicine
 * @param {*} x the x coordinate of the medicine in the canvas
 * @param {*} y the y coordinate of the medicine in the canvas
 * @param {*} color1 the color of the first capsule
 * @param {*} color2 the color of the second capsule
 * @param {*} direction the direction of the medicine
 */
function renderMedicine(x, y, color1, color2, direction) {
    //First capsule
    context.fillStyle = color1;
    context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);

    //Corners
    switch (direction) {
        case RIGHT:
            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
            break;

        case LEFT:
            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
            renderTopRightCorner(x, y, BACKGROUND_COLOR);
            break;

        case BOTTOM:
            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
            renderTopRightCorner(x, y, BACKGROUND_COLOR);
            break;

        case TOP:
            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
            break;
    }

    //Second capsule
    context.fillStyle = color2;
    switch (direction) {
        case LEFT:
            x -= BOX_WIDTH;
            context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);
            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
            break;

        case RIGHT:
            x += BOX_WIDTH;
            context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);
            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
            renderTopRightCorner(x, y, BACKGROUND_COLOR);
            break;

        case BOTTOM:
            y += BOX_HEIGHT;
            context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);
            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
            break;

        case TOP:
            y -= BOX_HEIGHT;
            context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);
            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
            renderTopRightCorner(x, y, BACKGROUND_COLOR);
            break;
    }
}

// ##########################################################################################
// ######################################## Game ############################################
// ##########################################################################################

/**
 * Initialization of the game
 */
function init() {
    // Initizalisation of the global var context
    context = document.getElementById("cvs").getContext("2d");
    context.width = document.getElementById("cvs").width;
    context.height = document.getElementById("cvs").height;

    //Pause if it is not on focus
    document.body.onblur = function () {
        isOnFocus = false;
    };
    document.body.onfocus = function () {
        isOnFocus = true;
    };

    //Creation of the bottle
    bottle = bottleInitialization(bottle);
    bottle = randomVirus(bottle, 4 * numLevel);

    //Creation of the first medicine
    nextMedicine = createMedicine(medicine);
    medicine = createMedicine(medicine);
    isMedicineFalling = true;

    // 2 listeners on the keyboard (keyup and keydown)
    document.addEventListener("keydown", captureKeyboardPress);
    document.addEventListener("keyup", captureKeyboardReleased);

    // Go my little game loop, and never stop
    lastUpdate = Date.now();
    lastRefresh = Date.now();
    gameLoop();
}

/**
 * Game loop
 */
function gameLoop() {
    if (!isOnFocus || isOnPause) {
        document.title = "DrMario - en pause";
        render();
    } else {
        document.title = "DrMario";

        if (!defeat && !victory) {
            update();
        }
        // Draw the game
        render();
    }
    requestAnimationFrame(gameLoop);
}

/**
 *  Game update
 */
function update() {
    let beginningNumberOfVirus = levelNumberOfVirus;

    // If we are not in the fall of the medicine
    if (!isMedicineFalling) {
        //
        bottle = transferMedicineToBottle(bottle, medicine);

        //If capsules are still falling
        if (gravityRecheck) {
            //Let GRAVITY_SPEED time between two frames
            if (Date.now() - lastRefresh > GRAVITY_SPEED) {
                bottle = capsuleGravity(bottle);
                lastRefresh = Date.now();
            }

            //If capsules are not falling
        } else {
            //Destroy
            bottle = detectColorMatching(bottle);

            // Defeat
            if (isDefeat()) {
                defeat = true;

                // Launch a new medicine
            } else if (!gravityRecheck) {
                medicine = copyMedicine(nextMedicine, medicine);
                nextMedicine = createMedicine(nextMedicine);
            }
        }

        //Falling of the medicine
    } else {
        if (Date.now() - lastRefresh > REFRESH_SPEED) {
            medicine = medicineFalling(medicine);
            lastRefresh = Date.now();
        }
    }

    //Updating score && topScore
    levelNumberOfVirus = countRemainingVirusNumber(bottle);
    playerScore += (beginningNumberOfVirus - levelNumberOfVirus) * 200;

    if (topScore < playerScore) {
        topScore = playerScore;
    }

    //Victory ?
    if (isVictory()) {
        victory = true;
    }
}

/**
 * Render the game state
 */
function render() {
    //Wiping the screen
    context.fillStyle = "black";
    context.fillRect(0, 0, context.width, context.height);

    //Render the different panels
    renderScorePanel();
    renderInformationPanel();
        //Next medicine panel
    renderEmptyPanel(425, 170, 100, 100);
    
    context.fillStyle = "black";
    context.fillRect(473, 212, 4, 21);
    renderMedicine(452, 212, nextMedicine.color1, nextMedicine. color2, nextMedicine.direction);
    

    //Drawing the bottle
    context.fillStyle = BORDERS_COLOR;
    context.fillRect(190, 130, 220, 420);
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(193, 133, 214, 414);
    context.fillStyle = BORDERS_COLOR;
    context.fillRect(197, 137, 206, 406);

    //Draw the bottle's content
    for (var i = 0; i < BOTTLE_HEIGHT; i++) {
        for (var j = 0; j < BOTTLE_WIDTH; j++) {
            context.fillStyle = BORDERS_COLOR;
            context.fillRect(200 + 25 * j, 140 + 25 * i, BOX_HEIGHT, BOX_WIDTH);

            var x = 202 + BOX_WIDTH * j;
            var y = 142 + BOX_HEIGHT * i;

            switch (bottle[i][j].type) {
                case 0:
                    context.fillStyle = BACKGROUND_COLOR;
                    context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);
                    break;

                case VIRUS:
                    renderVirus(x, y, bottle[i][j].color);
                    break;

                case CAPSULE:
                case FALLING_CAPSULE:
                    context.fillStyle = bottle[i][j].color;
                    context.fillRect(x, y, BOX_HEIGHT - 4, BOX_WIDTH - 4);

                    //Corners
                    switch (bottle[i][j].attached) {
                        case RIGHT:
                            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
                            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
                            break;

                        case LEFT:
                            renderTopRightCorner(x, y, BACKGROUND_COLOR);
                            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
                            break;

                        case BOTTOM:
                            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
                            renderTopRightCorner(x, y, BACKGROUND_COLOR);
                            break;

                        case TOP:
                            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
                            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
                            break;

                        default:
                            renderTopLeftCorner(x, y, BACKGROUND_COLOR);
                            renderTopRightCorner(x, y, BACKGROUND_COLOR);
                            renderBottomLeftCorner(x, y, BACKGROUND_COLOR);
                            renderBottomRightCorner(x, y, BACKGROUND_COLOR);
                            break;
                    }
                    break;
            }
        }
    }

    //Draw the falling medicine
    if (medicine.x >= 0) {
        renderMedicine(
            202 + BOX_WIDTH * medicine.x,
            142 + BOX_HEIGHT * medicine.y,
            medicine.color1,
            medicine.color2,
            medicine.direction
        );
    }


    // Victory or defeat screen
    if (victory) {
        renderVictoryScreen();
        renderStartText();
    } else if (defeat) {
        renderDefeatScreen();
        renderStartText();
    }
}

/**
 *  Key down event
 */
captureKeyboardPress = function (event) {
    switch (event.keyCode) {
        // 'P' means pause or unpause
        case 80:
            isOnPause = !isOnPause;
            break;

        // Left arrow
        case 37:
            moveMedicineLeft();
            break;

        //Right arrow
        case 39:
            moveMedicineRight();
            break;

        //Down arrow
        case 40:
            moveMedicineDown();
            break;

        //Space bar
        case 32:
            rotateMedicine();
            break;

        //Enter to play
        case 13:
            replayTheGame();
            break;
    }
};

/**
 *  Key up event
 */
captureKeyboardReleased = function (event) {
    switch (event.keyCode) {
    }
};
