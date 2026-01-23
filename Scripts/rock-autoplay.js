let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Loses: 0,
  Ties: 0
};//cominghereinfo

/*if (!score) {
  score = {
    Wins: 0,
    Loses: 0,
    Ties: 0
  };
}*/
updateTheScore();


function updateTheScore() {
  document.querySelector('.blank').innerHTML = `Wins: ${score.Wins} Loses: ${score.Loses} Ties: ${score.Ties}`;
}
function computerPick() {
  const randomClick = Math.random();
  let computerMove = '';
  if (randomClick >= 0 && randomClick < 1 / 3) {
    computerMove = 'Rock';
  }
  else if (randomClick >= 1 / 3 && randomClick < 2 / 3) {
    computerMove = 'Paper';
  }
  else if (randomClick >= 2 / 3 && randomClick < 1) {
    computerMove = 'Scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const move = computerPick();
      resultTaken(move);
    }, 1000);
    isAutoPlaying = true;
  }

  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


function resultTaken(move) {
  let computerMove = computerPick();
  let result = '';
  if (move === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'Paper') {
      result = 'You lose.';
    }
    else if (computerMove === 'Scissors') {
      result = 'You won.';
    }
  }

  else if (move === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You won.';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie.';
    }
    else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
  }
  else if (move === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    }
    else if (computerMove === 'Paper') {
      result = 'You won.';
    }
    else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You won.') {
    score.Wins++;
  }
  else if (result === 'You lose.') {
    score.Loses++;
  }
  else if (result === 'Tie.') {
    score.Ties++;
  }

  localStorage.setItem('score', JSON.stringify(score)); //Savinginfo

  document.querySelector('.score').innerHTML = `${result}`;
  document.querySelector('.game').innerHTML = `You <img src="images/${move}-emoji.png" class="image"> - <img src="images/${computerMove}-emoji.png" class="image"> Computer`;
  updateTheScore();

}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    resultTaken('Rock');
  }
  else if (event.key === 'p') {
    resultTaken('Paper');
  }
  else if (event.key === 's') {
    resultTaken('Scissors');
  }
})  //eventlistener and arrow function