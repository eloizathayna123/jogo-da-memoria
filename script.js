const cardArray = [
  { name: 'gato', emoji: '🐱' },
  { name: 'gato', emoji: '🐱' },
  { name: 'cachorro', emoji: '🐶' },
  { name: 'cachorro', emoji: '🐶' },
  { name: 'coelho', emoji: '🐰' },
  { name: 'coelho', emoji: '🐰' },
  { name: 'raposa', emoji: '🦊' },
  { name: 'raposa', emoji: '🦊' },
  { name: 'leão', emoji: '🦁' },
  { name: 'leão', emoji: '🦁' },
  { name: 'vaca', emoji: '🐮' },
  { name: 'vaca', emoji: '🐮' },
  { name: 'porco', emoji: '🐷' },
  { name: 'porco', emoji: '🐷' },
  { name: 'panda', emoji: '🐼' },
  { name: 'panda', emoji: '🐼' }
];

const grid = document.getElementById('grid');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
  cardArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', index);
    cardElement.addEventListener('click', flipCard);

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');

    cardElement.append(front, back);
    grid.appendChild(cardElement);
  });
}

function flipCard() {
  const id = this.getAttribute('data-id');

  if (cardsChosenId.includes(id) || this.classList.contains('flip')) return;

  cardsChosen.push(cardArray[id].name);
  cardsChosenId.push(id);
  this.classList.add('flip');

  this.querySelector('.back').textContent = cardArray[id].emoji;

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 700);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('.card');
  const [firstId, secondId] = cardsChosenId;

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[firstId].removeEventListener('click', flipCard);
    cards[secondId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[firstId].classList.remove('flip');
    cards[secondId].classList.remove('flip');
    cards[firstId].querySelector('.back').textContent = '';
    cards[secondId].querySelector('.back').textContent = '';
  }

  cardsChosen = [];
  cardsChosenId = [];

  if (cardsWon.length === cardArray.length / 2) {
    alert('Parabéns! Todos os pares encontrados!');
  }
}

createBoard();
