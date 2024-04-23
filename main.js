let letters = [
  "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey",
  "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly",
  "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken",
  "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab",
  "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove",
  "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu",
  "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe",
  "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco",
  "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human",
  "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala",
  "Kookabura", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris",
  "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink", "Mole",
  "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi",
  "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican",
  "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit",
  "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander",
  "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk",
  "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork",
  "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture",
  "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker",
  "Worm", "Wren", "Yak", "Zebra"
];

let currentWord, correctLetters, wrongGuessCount;
let maxGuess = 6;

// Selecting elements
let image = document.querySelector('.hangmen_box img');
let wordDisplay = document.querySelector('.word-display');
let guessText = document.querySelector('.guess_text b');
let keyboard = document.querySelector('.keyboard');
let div = document.querySelector('.div');
let playAgain = document.querySelector('.play_again');

let resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  image.src = `hangman-${wrongGuessCount}.svg`;
  guessText.textContent = `${wrongGuessCount} / ${maxGuess}`;
  keyboard.querySelectorAll('button').forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
  div.classList.remove('show');
}

let getRandomWord = () => {
  currentWord = letters[Math.floor(Math.random() * letters.length)];
  resetGame();
}

getRandomWord();

let gameOver = (isVictory) => {
  setTimeout(() => {
      let message = isVictory ? "Congratulations, you won!" : "Game over, you lost!";
      div.querySelector('h4').textContent = message;
      div.classList.add('show');
  }, 300);
}

let game = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
          if (letter.toLowerCase() === clickedLetter) {
              correctLetters.push(letter);
              wordDisplay.querySelectorAll('li')[index].textContent = letter;
              wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
          }
      });
  } else {
      wrongGuessCount++;
      image.src = `hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessText.textContent = `${wrongGuessCount} / ${maxGuess}`;

  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}


for (let i = 65; i <= 90; i++) {
  let letter = String.fromCharCode(i);
  let button = document.createElement('button');
  button.textContent = letter;
  button.addEventListener('click', () => game(button, letter.toLowerCase()));
  keyboard.appendChild(button);
}

playAgain.addEventListener('click', getRandomWord);
