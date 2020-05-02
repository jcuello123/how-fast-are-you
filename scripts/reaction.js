function StopWatch() {
    let startTime, endTime, duration = 0;
    let running = false;

    this.start = function() {
        if (!running) {
            startTime = new Date();
            running = true;
        }
    }

    this.stop = function() {
        if (running) {
            endTime = new Date();
            duration = (endTime.getTime() - startTime.getTime()) / 1000;
            running = false;
        }
    }

    this.reset = function() {
        startTime = null;
        endTime = null;
        duration = 0;
        running = false;
    }

    Object.defineProperty(this, 'duration', {
        get: function() { return duration }
    });

    Object.defineProperty(this, 'running', {
        get: function() { return running }
    });
}

const humanTimer = new StopWatch();
const botTimer = new StopWatch();
let ableToStart = false;

function startGame() {
    if (ableToStart) {
        let div = document.createElement('div');
        div.setAttribute('id', 'results');
        document.getElementById('results-container').appendChild(div);

        time = randTime();
        setTimeout(showRed, time);

    } else {
        alert('Please enter any number above zero.');
    }
}

function resetGame() {
    humanTimer.reset();
    botTimer.reset();

    document.getElementById('gameWindow').setAttribute('class', 'btn btn-light');
    document.getElementById('results').remove();
    document.getElementById('input-num').value = "";
    startGame();
}

function checkClick() {
    if (ableToStart) {
        humanTimer.stop();

        if (humanTimer.duration <= 0) {
            alert('Slow down there bucko.. You clicked too fast.');
        } else {
            showResults();
        }
    } else {
        alert('Please enter any number above zero.');
    }
}

function randTime() {
    return (Math.floor(Math.random() * 10) + 1) * 1000;
}

function showRed() {
    document.getElementById('gameWindow').setAttribute('class', 'btn btn-danger');

    humanTimer.start();
}

function showResults() {
    //bot time
    let numToCount = getInputNum();
    botTimer.start();
    for (let i = 0; i < numToCount; i++) {}
    botTimer.stop();

    //clear input text
    document.getElementById('input-num').value = "";
    ableToStart = false;

    //human element
    let h3 = document.createElement('h3');
    h3.setAttribute('id', 'humanResult');
    h3.style = 'color: white';
    let humanResult = document.createTextNode('Your reaction time: ' + humanTimer.duration + ' seconds.');
    h3.appendChild(humanResult);
    document.getElementById('results').appendChild(h3);

    //bot element
    h3 = document.createElement('h3');
    h3.setAttribute('id', 'botResult');
    h3.style = 'color: white';
    let botResult = document.createTextNode('Time for the computer to count to ' + numToCount + ': ' + botTimer.duration + ' seconds.');
    h3.appendChild(botResult);
    document.getElementById('results').appendChild(h3);
}

function getInputNum() {
    let inputNum = document.getElementById('input-num').value;

    if (isNaN(inputNum) || inputNum <= 0) {
        alert('Please enter any number above zero.');
    } else {
        ableToStart = true;
        return inputNum;
    }
}