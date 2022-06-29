class Player{
    constructor(name){
        this.name = name
        this.hand = []
    }
}

class Card{
    constructor(suit, card){
        this.suit = suit
        this.card = card
    }
}

class Deck{
    constructor(){
        this.deck = []
    }

    createDeck(){
        let suit = ['Spades', 'Diamonds', 'Clubs', 'Hearts']
        let card = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J','Q','K']
        for (let i = 0; i < suit.length; i++) {
            for (let x = 0; x < card.length; x++) {
                this.deck.push(new Card(suit[i], card[x]))
            }
        }
    }

    shuffle(){
        let index = this.deck.length, randomIndex;

        while (index != 0){
            randomIndex = Math.floor(Math.random()*index)
            index--

            [this.deck[index], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[index]]
        }
    }

    deal(player1, player2){
        for (let i = 0; i < this.deck.length; i++) {
            if(i%2 === 0){
                player1.hand.push(this.deck[i])
            }
            else{
                player2.hand.push(this.deck[i])
            }
        }
    }
    
}

class Game{
    constructor(){

    }

    getCardValue(card){
        let cardValue = parseInt(card)
        if(isNaN(cardValue)){
        switch (card){
            case 'A':
                cardValue = 14
                break
            case 'K':
                cardValue = 13
                break
            case 'Q':
                cardValue = 12
                break;
            case 'J':
                cardValue = 11
            }
        }
        return cardValue
    }

    startGame(){
        let player1 = new Player('user')
        let player2 = new Player('cpu')
        let deck = new Deck
        deck.createDeck()
        deck.shuffle()
        deck.deal(player1, player2)
        let warReward = []
        let player1Score = 0
        let player2Score = 0

        while(player1.hand.length != 0 && player2.hand.length != 0){
            if(this.getCardValue(player1.hand[0].card) > this.getCardValue(player2.hand[0].card)){
                console.log(`${player1.name} wins ${player1.hand[0].card} of ${player1.hand[0].suit} beats ${player2.hand[0].card} of ${player2.hand[0].suit}`)
                player1.hand.push(player2.hand.shift(), player1.hand.shift())
                if (warReward.length > 0){
                    player1.hand = player1.hand.concat(warReward)
                    warReward = []
                }
                player1Score++

            }
            else if(this.getCardValue(player1.hand[0].card) === this.getCardValue(player2.hand[0].card)){
                console.log(`This is WAR ${player2.hand[0].card} of ${player2.hand[0].suit} is equal to ${player1.hand[0].card} of ${player1.hand[0].suit}`)
                if(player1.hand.length >= 3 && player2.hand.length >= 3){
                    for (let i = 0; i < 2; i++) {
                        warReward.push(player2.hand.shift(), player1.hand.shift())
                    }
                }
                else if(player1.hand.length < 3){
                    console.log(`${player1.name} does not have enough cards for war!`)
                    break
                }
                else{
                    console.log(`${player2.name} does not have enough cards for war!`)
                    break
                }
             }
             else{
                console.log(`${player2.name} wins ${player2.hand[0].card} of ${player2.hand[0].suit} beats ${player1.hand[0].card} of ${player1.hand[0].suit}`)
                player2.hand.push(player1.hand.shift(), player2.hand.shift())
                if (warReward.length > 0){
                    player2.hand = player2.hand.concat(warReward)
                    warReward = []
                }
                player2Score++
            }
        }

        if(player1.hand.length === 0){
            console.log(`${player2.name} wins! 
            Total score:
            ${player2.name}: ${player2Score}
            ${player1.name}: ${player1Score}`)
        }
        else{
            console.log(`${player1.name} wins! 
            Total score:
            ${player1.name}: ${player1Score}
            ${player2.name}: ${player2Score}`)
        }
        
    }


}

let game = new Game
game.startGame()



