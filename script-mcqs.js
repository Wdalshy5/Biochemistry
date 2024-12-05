let questions = [
    {
        "question": "What is the first step of glycolysis?",
        "options": [
            "Phosphorylation of glucose",
            "Isomerization of glucose",
            "Cleavage of fructose-1,6-bisphosphate",
            "Oxidation of glyceraldehyde-3-phosphate"
        ],
        "correctAnswer": 0,
        "explanation": "The first step of glycolysis is the phosphorylation of glucose by hexokinase, converting glucose to glucose-6-phosphate."
    },
    {
        "question": "Which enzyme catalyzes the conversion of glucose-6-phosphate to fructose-6-phosphate?",
        "options": [
            "Hexokinase",
            "Phosphofructokinase",
            "Phosphoglucose isomerase",
            "Aldolase"
        ],
        "correctAnswer": 2,
        "explanation": "Phosphoglucose isomerase catalyzes the conversion of glucose-6-phosphate to fructose-6-phosphate in the second step of glycolysis."
    },
    {
        "question": "What is the net ATP gain from one molecule of glucose in glycolysis?",
        "options": [
            "1 ATP",
            "2 ATP",
            "4 ATP",
            "6 ATP"
        ],
        "correctAnswer": 1,
        "explanation": "The net ATP gain in glycolysis is 2 ATP, as 4 ATP molecules are produced but 2 are consumed during the process."
    },
    {
        "question": "Which molecule is produced in the final step of glycolysis?",
        "options": [
            "Glucose-6-phosphate",
            "Pyruvate",
            "Fructose-1,6-bisphosphate",
            "Acetyl-CoA"
        ],
        "correctAnswer": 1,
        "explanation": "The final step of glycolysis produces pyruvate, which can then enter the citric acid cycle or undergo fermentation."
    },
    {
        "question": "What is the role of NAD+ in glycolysis?",
        "options": [
            "To donate electrons during the oxidation of glyceraldehyde-3-phosphate",
            "To hydrolyze ATP",
            "To form acetyl-CoA",
            "To assist in the isomerization of glucose"
        ],
        "correctAnswer": 0,
        "explanation": "NAD+ functions as an electron acceptor during the oxidation of glyceraldehyde-3-phosphate to form NADH, which is essential for glycolysis."
    },
    {
        "question": "What is the function of phosphofructokinase in glycolysis?",
        "options": [
            "To phosphorylate glucose",
            "To cleave fructose-1,6-bisphosphate into two 3-carbon molecules",
            "To convert fructose-6-phosphate to fructose-1,6-bisphosphate",
            "To convert 3-phosphoglycerate to 2-phosphoglycerate"
        ],
        "correctAnswer": 2,
        "explanation": "Phosphofructokinase catalyzes the phosphorylation of fructose-6-phosphate to form fructose-1,6-bisphosphate, a key regulatory step in glycolysis."
    },
    {
        "question": "Which of the following molecules inhibits phosphofructokinase?",
        "options": [
            "ATP",
            "ADP",
            "Citrate",
            "AMP"
        ],
        "correctAnswer": 0,
        "explanation": "ATP inhibits phosphofructokinase (PFK), slowing down glycolysis when cellular energy levels are high."
    },
    {
        "question": "How many molecules of NADH are produced during glycolysis?",
        "options": [
            "1",
            "2",
            "3",
            "4"
        ],
        "correctAnswer": 1,
        "explanation": "During glycolysis, 2 molecules of NADH are produced, one per each molecule of glyceraldehyde-3-phosphate oxidized."
    },
    {
        "question": "Which of the following steps in glycolysis is irreversible?",
        "options": [
            "Phosphorylation of glucose",
            "Conversion of glucose-6-phosphate to fructose-6-phosphate",
            "Conversion of 1,3-bisphosphoglycerate to 3-phosphoglycerate",
            "Cleavage of fructose-1,6-bisphosphate"
        ],
        "correctAnswer": 0,
        "explanation": "The phosphorylation of glucose is an irreversible step, catalyzed by hexokinase (or glucokinase in the liver)."
    },
    {
        "question": "Which molecule is the end product of glycolysis in anaerobic conditions?",
        "options": [
            "Acetyl-CoA",
            "Lactate",
            "Pyruvate",
            "Ethanol"
        ],
        "correctAnswer": 1,
        "explanation": "Under anaerobic conditions, the end product of glycolysis is lactate, which is produced through the reduction of pyruvate by NADH."
    }
]

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    setupThemeToggle();
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.querySelector('.toggle-icon').textContent =
                document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }
}

function showQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionEl.textContent = question.question;
        optionsEl.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.classList.add('option');
            optionEl.innerHTML = `
                <input type="radio" id="option${index}" name="answer" value="${index}">
                <label for="option${index}">${option}</label>
            `;
            optionsEl.appendChild(optionEl);
        });

        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = parseInt(selectedOption.value);
        currentQuestion++;
        showQuestion();
    } else {
        alert('Please select an answer before proceeding.');
    }
});

document.getElementById('submit-btn').addEventListener('click', () => {
    calculateScore();
    showResult();
});

function calculateScore() {
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
}

function showResult() {
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const progressEl = document.getElementById('progress');
    const questionContainer = document.getElementById('question-container');
    const submitBtn = document.getElementById('submit-btn');

    questionContainer.style.display = 'none';
    submitBtn.style.display = 'none';
    resultEl.style.display = 'block';

    const percentage = (score / questions.length) * 100;
    scoreEl.textContent = percentage.toFixed(2);
    progressEl.style.width = `${percentage}%`;

    let resultHTML = '<h3>Review:</h3>';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        resultHTML += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Q${index + 1}:</strong> ${question.question}</p>
                <p>Your answer: ${question.options[userAnswer]}</p>
                <p>Correct answer: ${question.options[question.correctAnswer]}</p>
                ${!isCorrect ? `<p><strong>Explanation:</strong> ${question.explanation}</p>` : ''}
            </div>
        `;
    });

    resultEl.innerHTML = resultHTML;
}

// Load progress from local storage
const savedProgress = JSON.parse(localStorage.getItem('glycolysisMCQProgress'));
if (savedProgress) {
    currentQuestion = savedProgress.currentQuestion;
    userAnswers = savedProgress.userAnswers;
    showQuestion();
}

// Save progress to local storage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('glycolysisMCQProgress', JSON.stringify({
        currentQuestion,
        userAnswers
    }));
});
