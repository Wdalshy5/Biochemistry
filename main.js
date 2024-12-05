import { flashcardData } from './data.js';

function createFlashcard(data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flashcard-wrapper';

  const flashcard = document.createElement('div');
  flashcard.className = 'flashcard';
  
  const inner = document.createElement('div');
  inner.className = 'flashcard-inner';
  
  const front = document.createElement('div');
  front.className = 'front';
  front.textContent = data.front;
  
  const back = document.createElement('div');
  back.className = 'back';
  back.textContent = data.back;
  
  const explanation = document.createElement('div');
  explanation.className = 'explanation';
  explanation.textContent = data.explanation;
  
  inner.appendChild(front);
  inner.appendChild(back);
  flashcard.appendChild(inner);
  wrapper.appendChild(flashcard);
  wrapper.appendChild(explanation);
  
  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
    explanation.classList.toggle('visible');
  });
  
  return wrapper;
}

function initializeFlashcards() {
  const container = document.getElementById('flashcards');
  flashcardData.forEach(data => {
    container.appendChild(createFlashcard(data));
  });
}

document.addEventListener('DOMContentLoaded', initializeFlashcards);