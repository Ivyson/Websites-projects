const questions = [ //Declared the global questions
    {
        question: "Which is the largest animal on Earth",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue Whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { Text: "Berlin", correct: false },
            { Text: "Madrid", correct: false },
            { Text: "Paris", correct: true },
            { Text: "Rome", correct: false },
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { Text: "3", correct: false },
            { Text: "4", correct: true },
            { Text: "5", correct: false },
            { Text: "6", correct: false },
        ]
    }
];

const questiontobeset = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbttn = document.getElementById("nextbtn");
let currentquestionIndex = 0;
let Score = 0;
function startquiz() {
    currentquestionIndex = 0;
    Score = 0;
    nextbttn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentquestion = questions[currentquestionIndex];
    let questionno = currentquestionIndex + 1;
    questiontobeset.innerHTML = questionno  + ". " + currentquestion.question;
    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    nextbtn.style.display = "none";
}

function resetState() {
    nextbtn.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        Score++; 
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbttn.style.display = "block";

    nextbttn.style.display = "block";
    nextbttn.addEventListener("click", () => {
        currentquestionIndex++;
        if (currentquestionIndex < questions.length) {
            showQuestion();
        } else {
            // Quiz completed
            questiontobeset.innerHTML = "Quiz completed!";
            answerbutton.innerHTML = "";
            nextbttn.style.display = "none";
            // showScore();
        }
    });
}
function showScore()
{
    resetState();
    questiontobeset.innerHTML = `You Scored ${Score} out of ${questions.length}!`;
    nextbttn.innerHTML = "Play Again!"
    nextbttn.style.display = "block";
}
function handleNextbutton(){
    
    if(currentquestionIndex < questions.length - 1)
    {
        currentquestionIndex++;
        showQuestion();
    }
    else{
        showScore();
    }
}
nextbttn.addEventListener("click",()=>{
    if(currentquestionIndex < questions.length){
        handleNextbutton();
    }
    else{
        startquiz();
    }
});
startquiz();