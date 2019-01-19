var started = false,
    intervalSession,
    intervalBreak;

var toggleLength = function (type, operator) {
    if (!started) {
        var length = document.getElementById(type + "-length").innerHTML;
        if (operator === '+') {
            document.getElementById(type + "-length").innerHTML = parseInt(length) + 1;
            if (type === 'session')
                document.getElementById('clock').innerHTML = formatTime(parseInt(length) + 1, 0);
        } else if (length > 1) {
            document.getElementById(type + "-length").innerHTML = parseInt(length) - 1;
            if (type === 'session')
                document.getElementById('clock').innerHTML = formatTime(parseInt(length) - 1, 0);
        }
    }
};

var start = function () {
    if (started) {
        clearInterval(intervalBreak);
        clearInterval(intervalSession);
        started = false;
        document.getElementById("status").innerHTML = "Restart";
    } else {
        document.getElementById("status").innerHTML = "Stop";
        var minutes = parseInt(document.getElementById("session-length").innerHTML);
        minutes--;
        var seconds = 59;
        started = true;
        intervalSession = setInterval(function () {
            var time = formatTime(minutes, seconds);
            seconds--;
            if (seconds === -1) {
                seconds = 59;
                minutes--;
                if (minutes === -1) {
                    clearInterval(intervalSession);
                    started = false;
                    startBreak();
                }
            }
            document.getElementById("clock").innerHTML = time;
        }, 1000);
    }
};

var startBreak = function () {
    if (started) {
        clearInterval(intervalSession);
        clearInterval(intervalBreak);
        started = false;
        document.getElementById("status").innerHTML = "Restart";
    } else {
        document.getElementById("status").innerHTML = "Stop";
        var minutes = parseInt(document.getElementById("break-length").innerHTML);
        minutes--;
        var seconds = 59;
        started = true;
        intervalBreak = setInterval(function () {
            var time = formatTime(minutes, seconds);
            seconds--;
            if (seconds === -1) {
                seconds = 59;
                minutes--;
                if (minutes === -1) {
                    clearInterval(intervalBreak);
                    started = false;
                    start();
                }
            }
            document.getElementById("clock").innerHTML = time;
        }, 1000);
    }
};

var formatTime = function (min, sec) {
    var s, m;
    m = (min > 9) ? min : '0' + min;
    s = (sec > 9) ? sec : '0' + sec;
    return m + ':' + s;
};