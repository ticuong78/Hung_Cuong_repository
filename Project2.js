let role = 0;
let role2 = 1;
const images = document.querySelectorAll('.js-picture');
const tac_tic = ['Images/109602.png', 'Images/105152.png'];
const steps = ['', '', '',
               '', '', '',
               '', '', ''];

const score = JSON.parse(localStorage.getItem('temp')) || {
  winsX: 0,
  winsO: 0
}

showScore();

function showScore () {
  document.querySelector('.js-score-X').innerHTML = score.winsX;
  document.querySelector('.js-score-O').innerHTML = score.winsO;
}

const buttons = document.querySelectorAll('.playgamButton');

document.querySelector('.reset-score-button').addEventListener('click', () => {
  score.winsX = 0;
  score.winsO = 0;
  showScore();
  localStorage.setItem('temp', JSON.stringify(score));
})

buttons.forEach((value, index) => {
  value.addEventListener('click', () => {
    if(value.innerHTML === ''){
      playGame(value, index);
      const a = role;
      role = role2;
      role2 = a;
    }
  })
})

function playGame (button, index){
  const value = document.querySelector(`.${images[role].classList[0]}`);
  const value2 = document.querySelector(`.${images[role2].classList[0]}`);
  value.style.filter = "brightness(0)";
  value2.style.filter = "brightness(100)";
  let classButton = 'tac';
  if(role === 1){
    classButton = 'tic';
  }
  button.innerHTML = `<img src="${tac_tic[role]}" alt="" class="${classButton}">`;

  steps[index] = role;
  
  let result = scoreColumnRow();
  console.log(steps);
  
  let tie = true;
  steps.forEach(value => {
    if (value === ''){
      tie = false;
    }
  })

  if(tie === true){
    result = 'tie';
  }

  console.log(result, tie);
  if(result === true || result === 'tie'){
    document.querySelector('.js-winner-container').style.display = "block";
    const winner = document.querySelector('.winner');
    winner.innerHTML = `
    <img src="${tac_tic[role]}" alt="" style="margin-right: 20px" class="opacity-1 brightness img-100px">
    <P class = "js-tie" style="color: black; font-family: arial"> Wins !</p>
    `;

    if(role === 0){
      score.winsX++;
      console.log(score);
    } else {
      score.winsO++;
      console.log('nos');
    }

    if(result === 'tie'){
      score.winsO++; score.winsX++;
      winner.innerHTML += `<img src="${tac_tic[role2]}" alt="" style="margin-left: 20px" class="opacity-1 brightness img-100px">`;
      document.querySelector('.js-tie').innerText = 'Draw !';
    }

    winner.innerHTML += "<button class=\"js-reload-button\" style=\"position: absolute;\"> <img src=\"Images/refresh.png\" style = \" filter: none\"></button>";
    document.querySelector('.js-reload-button').addEventListener('click', () => {
      location.reload();
    })

    winner.style.display = "flex";

    showScore();

    localStorage.setItem('temp', JSON.stringify(score));
    return;
  }
}

function scoreColumnRow(){
  let i = 0;
  while(i<=2){
    let subArray = [];
    if(steps[i] !== ''){
      if((steps[i] === steps[i+3] && steps[i+3] === steps[i+6]) || (i === 0 && (steps[i] === steps[i+4] && steps[i] === steps[i+8])) || (i === 2 && (steps[i] === steps[i+4] && steps[i] === steps[i+2]))){
        return true;
      }
    }

    subArray = steps.slice(i*3, (i*3) + 3);

    let iStart = subArray[0];
    let result;
    let num = 0;
    subArray.forEach(value => {
      if(value === iStart && value !== ''){
        num++;
        if(num === 3){
          result = true;
          console.log(subArray);
          return;
        }
      } else{
        num --;
        result = false;
      }
    })

    if(result === true){
      return true;
    }

    i++;
  }
  return false;
}