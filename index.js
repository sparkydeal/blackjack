let c = (...args) => console.log(...args);

// buttons
let cards = [];
let cardIndex;
let hasBlackJack = false;
let wonDealer = false;
let isAlive = true;
let message;
let payOutMessage;
let player = {
    name: 'Cash remaining',
    chips:160
}
let chipsLeft = player.chips;
// payout blackJac,wonDealer,over21
let payout = [25,5,10];
let startGameBtn = document.querySelector('.start-game');
let mustStartNewGame = false;
let startedANewGame = false;
let newCardBtn = document.querySelector('.new-card');
let messageEl = document.querySelector('#message-el');
let payoutEl = document.querySelector('#payout-el');
let moneyEl = document.querySelector('#money-el')
let cardsEl = document.querySelector('#cards-el');
let sumEl = document.querySelector('#sum-el');
let playerEl = document.querySelector('#player-el');


startGameBtn.addEventListener('click',startGame);
// playerEl.textContent = player.name +': $' + player.chips; 

newCardBtn.addEventListener('click',newCard);
// textContent

// cards



// functions

function startGame() {
    c('in startGame');
    mustStartNewGame = false; 
    startedANewGame = true;
    messageEl.textContent = '';
    moneyEl.textContent = '';
    moneyMessage = '';
    removeMessageElClasses();
    // the mustStartNewGame flag is set to true in rendergame
    // if a blackjack is reached or if sum of cards is > 21
    // however if starting a new game the flag is set to false



    cardsEl.textContent = 'Cards: ';
    cards = [];
    
    
    getNewCard();
    
    renderGame();

}

function renderGame() {
    c('in renderGame')
    if (mustStartNewGame) {
        removeMessageElClasses();
        messageEl.textContent = 'You must start a new game!';
        messageEl.classList.add('error');
    }
    else {
        sum = 0;
        cardsEl.textContent = 'Cards: ';
        mustStartNewGame = false;
        wonDealer = false;
        
        
        for (let i = 0; i < cards.length;i ++) {
            sum += cards[i];
            cardsEl.textContent += cards[i];
            
            if (i+1 != cards.length)
                cardsEl.textContent += ', ';
        } 
        sumEl.textContent = 'Sum: '+ sum;
        
        
        if ((sum > 16 && sum <= 20)) {
            c('sum > 16 && sum <= 20');
            message = 'you win the dealer';
            moneyMessage = '$'+payout[1];
            messageEl.classList.add('wonDealer');
            moneyEl.classList.add('moneyWon');
            wonDealer = true;
            mustStartNewGame = true;
            
            chipsLeft +=payout[1];
            c('chips',chipsLeft);

        } else if (sum <= 20) {
            message = 'do you want anothter card?';
        } else if (sum === 21) {
            message = 'you got blackJack';
            moneyMessage = '$'+payout[0];
            messageEl.classList.add('blackjack');
            moneyEl.classList.add('moneyWon');
            hasBlackJack = true;
            mustStartNewGame = true;
            
            chipsLeft +=payout[1];
            c('chips',chipsLeft);
        }
        else {
            message = 'sorry you lose';
            moneyMessage = '$'+'('+payout[2]+')';
            messageEl.classList.add('loose');
            moneyEl.classList.add("moneyLost");
            isAlive = false;
            mustStartNewGame = true;
            // payout[2] = -5;
            chipsLeft -=payout[2];
             c('chips',chipsLeft);
        }
            
        sumEl.textContent = 'Sum: '+ sum;
        playerEl.textContent = player.name +': $' + chipsLeft; 
        messageEl.textContent = message;
        moneyEl.textContent = moneyMessage;
    }

}
function getNewCard() {
    let card = Math.floor(Math.random() * 13) + 1;
    
    switch (card) {
        case 11:
        case 12:
        case 13:
            card = 10;
            break;
        case 1:
            card = 11;
            break;        

    }
    cards.push(card);
    
}
function newCard() {
    // can only get a new card if a game is in process
    if (startedANewGame) {    
        
        
        if  (mustStartNewGame) {
            removeMessageElClasses();
            messageEl.textContent = 'You must start a new game!';
            messageEl.classList.add('error');
            
        }  else {
            
            getNewCard(); 
            
            renderGame();
        }
    }
    else {
        startGame();

    }

}
function removeMessageElClasses() {
    messageEl.className = '';
    moneyEl.className = '';
}

