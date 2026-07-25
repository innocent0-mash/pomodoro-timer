let WORK_TIME = 25 * 60;
let SHORT_BREAK = 5 * 60;
let LONG_BREAK = 25 * 60;
let COUNTER = 0;
let interval = null;
let runing = false; 
let time = WORK_TIME;
let isworkTime = true;
let isbreakTime = false;
let currentSession = "work";

const timer = document.getElementById("timer");
const btn = document.getElementById("startBtn");
const reset = document.getElementById("reset");
const skip = document.getElementById("skip");
const mode = document.getElementById("sessionLabel");
const study = document.getElementById("study");
const gym = document.getElementById("gym");
const focus = document.getElementById("focus");
const progressRing = document.getElementById("progressRing");
const workSlider = document.getElementById("workSlider");
const workValue = document.getElementById("workValue");
const shortBreakSlider = document.getElementById("shortBreakSlider");
const shortBreakValue = document.getElementById("shortBreakValue");
const longBreakSlider = document.getElementById("longBreakSlider");
const longBreakValue = document.getElementById("longBreakValue");
const ringRadius = progressRing ? Number(progressRing.getAttribute("r")) : 0;
const ringCircumference = 2 * Math.PI * ringRadius;

function syncSlider(sliderElement, valueElement, seconds) {
    if (!sliderElement || !valueElement) {
        return;
    }

    const minutes = Math.floor(seconds / 60);
    sliderElement.value = minutes;
    valueElement.textContent = `${minutes} min`;
}

function syncAllSliders() {
    syncSlider(workSlider, workValue, WORK_TIME);
    syncSlider(shortBreakSlider, shortBreakValue, SHORT_BREAK);
    syncSlider(longBreakSlider, longBreakValue, LONG_BREAK);
}

function getCurrentSessionDuration() {
    if (currentSession === "shortBreak") {
        return SHORT_BREAK;
    }

    if (currentSession === "longBreak") {
        return LONG_BREAK;
    }

    return WORK_TIME;
}

function updateSessionLabel() {
    if (!mode) {
        return;
    }

    if (currentSession === "shortBreak") {
        mode.innerText = "Short Break";
        return;
    }

    if (currentSession === "longBreak") {
        mode.innerText = "Long Break";
        return;
    }

    mode.innerText = "Work Session";
}

function updateProgressRing() {
    if (!progressRing || ringCircumference === 0) {
        return;
    }

    const totalTime = getCurrentSessionDuration();
    const progress = totalTime > 0 ? time / totalTime : 0;
    const dashOffset = ringCircumference * (1 - Math.max(0, Math.min(progress, 1)));

    progressRing.style.strokeDasharray = `${ringCircumference}`;
    progressRing.style.strokeDashoffset = `${dashOffset}`;
}

let worktime = () => {
    clearInterval(interval);
    isworkTime = true;
    isbreakTime = false;
    currentSession = "work";
    time = WORK_TIME;
    updateTimer();
}
let shortBreak = () => {
    clearInterval(interval);
    isworkTime = false;
    isbreakTime = true;
    currentSession = "shortBreak";
    time = SHORT_BREAK;
    updateTimer();
    start();
};
let longBreak = () => {
    isworkTime = false;
    isbreakTime = true;
    currentSession = "longBreak";
    time = LONG_BREAK;
    updateTimer();
    start();
}

let stud = () => {
    WORK_TIME = 50 * 60;
    SHORT_BREAK = 10 * 60;
    LONG_BREAK = 25 * 60;
    time = WORK_TIME;
    syncAllSliders();
    updateTimer();
}
let gy = () => {
    WORK_TIME = 30 * 60;
    SHORT_BREAK = 5 * 60;
    LONG_BREAK = 20 * 60;
    time = WORK_TIME;
    syncAllSliders();

    updateTimer();

}
let fcus = () => {
    WORK_TIME = 60 * 60;
    SHORT_BREAK = 10 * 60;
    LONG_BREAK = 30 * 60;
    time = WORK_TIME;
    syncAllSliders();
    updateTimer();

}
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let second = time % 60;

    minutes = String(minutes).padStart(2, '0'); // this function print the string of 2 lenght 
    second = String(second).padStart(2, '0');
    // console.log(`${minutes}:${second}`);
    timer.innerText = `${minutes}:${second}`;
    updateSessionLabel();
    updateProgressRing();
}
updateTimer();
syncAllSliders();

function switchMode() {
    if (isworkTime) {
        COUNTER = (COUNTER + 1) % 2;

        if (COUNTER === 1) {
            shortBreak();
        } else {
            longBreak();
        }
    } else {
        worktime();
    }
};

function start() {
    runing = true;
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            btn.innerHTML = '<i class="fa-solid fa-stop" style="color: #ffffff;"></i>';
            updateTimer();
        }
        else {
            clearInterval(interval);
            btn.innerText = "start";
            runing = false;
            switchMode();
        }
    }, 1000)
};

let pause = () => {

    clearInterval(interval);
    btn.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>';
    runing = false;
};

btn.addEventListener("click", () => {
    if (runing == false) {
        start();

    } else {
        pause();
    }
});

reset.addEventListener("click", () => {
    pause();
    COUNTER = 0;
    runing = false;
    currentSession = "work";
    isworkTime = true;
    isbreakTime = false;
    time = WORK_TIME;
    updateTimer();
})

skip.addEventListener("click", () => {
    pause();
    if (isworkTime == true) {
        switchMode();
    }
    else {
        worktime();
    }
    updateTimer();
});

study.addEventListener("click", stud);
gym.addEventListener("click", gy);
focus.addEventListener("click", fcus);

function setupSlider(sliderElement, valueElement, maxValue, onChange) {
    if (!sliderElement || !valueElement) {
        return;
    }

    sliderElement.addEventListener("input", () => {
        let value = Number(sliderElement.value);

        if (value < 1) {
            value = 1;
        }

        if (value > maxValue) {
            value = maxValue;
        }

        sliderElement.value = value;
        valueElement.textContent = `${value} min`;
        onChange(value);
    });
}

setupSlider(workSlider, workValue, 90, (value) => {
    WORK_TIME = value * 60;

    if (isworkTime && !runing) {
        time = WORK_TIME;
        updateTimer();
    }
});

setupSlider(shortBreakSlider, shortBreakValue, 30, (value) => {
    SHORT_BREAK = value * 60;

    if (currentSession === "shortBreak" && !runing) {
        time = SHORT_BREAK;
        updateTimer();
    }
});

setupSlider(longBreakSlider, longBreakValue, 60, (value) => {
    LONG_BREAK = value * 60;

    if (currentSession === "longBreak" && !runing) {
        time = LONG_BREAK;
        updateTimer();
    }
});
