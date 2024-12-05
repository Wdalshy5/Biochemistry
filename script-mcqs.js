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
    // ... existing questions
];

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