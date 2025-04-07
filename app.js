let userScore = 0;
let compScore = 0;
let totalRounds = 0;
let round = Infinity;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");
const roundInputContainer = document.getElementById("round-input-container");
const roundInput = document.getElementById("round-input");
const roundBtn = document.getElementById("round-btn");
const themeToggle = document.getElementById("theme-toggle");

let isDarkMode = false;

const applyTheme = () => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);

    document.querySelectorAll(".choice").forEach(choice => {
        choice.addEventListener("mouseover", () => {
            choice.style.backgroundColor = isDarkMode ? "white" : "#081b31";
        });
        choice.addEventListener("mouseout", () => {
            choice.style.backgroundColor = "";
        });
    });

    msg.style.backgroundColor = isDarkMode ? "white" : "#081b31";
    msg.style.color = isDarkMode ? "#081b31" : "white";
};

themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    applyTheme();
});

const drawgame = () => {
    msg.innerHTML = "Game was a Draw, Play again";
    applyTheme();
};

const stop = () => {
    if (totalRounds === round) {
        msg.innerHTML = "Game Over!";
        setTimeout(() => {
            reset();
        }, 1000);
    }
};

const reset = () => {
    userScore = 0;
    compScore = 0;
    totalRounds = 0;
    userScorepara.innerHTML = userScore;
    compScorepara.innerHTML = compScore;
    round = Infinity;
    roundInput.value = "";
    roundInputContainer.style.display = "block";
    msg.innerHTML = "Enter rounds to play again";
    applyTheme();
};

const showWninner = (userwin, userchoice, compChoice) => {
    if (userwin) {
        userScore++;
        userScorepara.innerHTML = userScore;
        msg.innerHTML = `You Won! Your ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorepara.innerHTML = compScore;
        msg.innerHTML = `You Lost. ${compChoice} beats your ${userchoice}`;
        msg.style.backgroundColor = "red";
    }
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const playgame = (userchoice) => {
    const compChoice = genCompChoice();

    if (userchoice === compChoice) {
        drawgame();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = compChoice !== "paper";
        } else if (userchoice === "paper") {
            userwin = compChoice !== "scissor";
        } else {
            userwin = compChoice !== "rock";
        }
        showWninner(userwin, userchoice, compChoice);
    }

    totalRounds++;
    stop();
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (round === Infinity || totalRounds < round) {
            const userchoice = choice.getAttribute("id");
            playgame(userchoice);
        }
    });
});

roundBtn.addEventListener("click", () => {
    const inputValue = roundInput.value.trim();
    if (inputValue === "") {
        round = Infinity;
        msg.innerHTML = "Infinite Mode: Start Playing!";
    } else {
        const num = Number(inputValue);
        if (!isNaN(num) && num > 0) {
            round = num;
            msg.innerHTML = `Playing for ${round} rounds. Let's go!`;
        } else {
            msg.innerHTML = "Please enter a valid positive number or leave blank for infinite.";
            return;
        }
    }
    roundInputContainer.style.display = "none";
});
