/*
WAR
Rules
2 players with 26 cards each
Each round a player plays a card, highest card value win with Ace being the highest
In the event of a tie (war) each player plays a 2nd card 'facedown' and a 3rd card to resolve the tie, highest card wins
In the event the 3rd card ties again, another round of war is played
If a player does not have enough cards to complete the war that player loses
First player to run out of cards loses
*/


//Player class takes param of name, creates a player with a hand, name, and score. 
//Default is user and CPU 
class Player {
	constructor(name) {
		this.name = name
		this.hand = []
		this.score = 0
	}
}

//Card class
//Takes params of suit and type of card

class Card {
	constructor(suit, card) {
		this.suit = suit
		this.card = card
	}
}

//Deck class
//Uses empty array to store cards


class Deck {
	constructor() {
		this.deck = []
	}

	//Nested For loop to fill empty array with all 52 cards

	createDeck() {
		let suit = ['Spades', 'Diamonds', 'Clubs', 'Hearts']
		let card = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J',
			'Q', 'K'
		]

		suit.forEach((suit) => {
			card.forEach((card) => {
				this.deck.push(new Card(suit, card))
			})
		})
	}

	//Fisher–Yates shuffle
	//Randomly rearranges the deck array as to simulate shuffling

	shuffle() {
		let index = this.deck.length, randomIndex

		while (index != 0) {
			randomIndex = Math.floor(Math.random() * index)
			index--

			[this.deck[index], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[index]]
		}
	}

	//Evenly divides the deck of cards between each player hand

	deal(player1, player2) {
		for (let i = 0; i < this.deck.length; i++) {
			if (i % 2 === 0) {
				player1.hand.push(this.deck[i])
			}
			else {
				player2.hand.push(this.deck[i])
			}
		}
	}
}

//Game class
//Constains the logic behind the game allowing the game to be played
//warReward variable used to store cards that are up for grabs during war

class Game {
	constructor() {
		this.warReward = []
        this.warCount = 0
        this.totalRounds = 0
	}

	//getCardValue function determines the value of the cards as we have numbers
	//and letters assigned to cards, letter cards need number values
	//returns the numerical value of the card to be used in comparisons 

	getCardValue = (card) => {
		let cardValue = parseInt(card)
		if (isNaN(cardValue)) {
			switch (card) {
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

	//winRound is a function to handle card distrubituon for wins and losses and increment score

	winRound = (winner, loser) => {
		winner.hand.push(loser.hand.shift(), winner.hand.shift())
		if (this.warReward.length > 0) {
			winner.hand = winner.hand.concat(this.warReward)
			this.warReward = []
		}
		winner.score++
	}

	//outOfCards function called when there is not enough cards in a hand for WAR (minimum 3 cards, current card, facedown card, final card)
	//moves remaining cards from losers hand to winners hand so winner ends up with all 52 cards in hand

	outOfCards = (loser, winner) => {
		console.log(`${loser.name} does not have enough cards for war!`)
		console.log(`${loser.name} cards remaining: ${loser.hand.length}`)
		for (let i = 0; i <= loser.hand.length; i++) {
			winner.hand.push(loser.hand.shift())
		}
        if(this.warReward.length > 0){
            winner.hand.push(this.warReward)
        }
	}

	//startGame runs the entirety of the game
	//Players and deck are created
	//Deck is then filled with cards, shuffled, and dealt to player hands
    //Game then runs using if else to compare values of cards and determine round winners

	startGame() {
		let player1 = new Player('User')
		let player2 = new Player('CPU')
		let deck = new Deck
		deck.createDeck()
		deck.shuffle()
		deck.deal(player1, player2)

		while (player1.hand.length != 0 && player2.hand.length != 0) {
			if (this.getCardValue(player1.hand[0].card) > this.getCardValue(player2.hand[0].card)) {
				console.log(`${player1.name} wins ${player1.hand[0].card} of ${player1.hand[0].suit} beats ${player2.hand[0].card} of ${player2.hand[0].suit}`)
				this.winRound(player1, player2)
			}
			else if (this.getCardValue(player1.hand[0].card) === this.getCardValue(player2.hand[0].card)) {
				console.log(`This is WAR ${player2.hand[0].card} of ${player2.hand[0].suit} is equal to ${player1.hand[0].card} of ${player1.hand[0].suit}`)
                this.warCount++

				//Make sure players have enough cards for war, if there is less than 3 cards a player does not have enough cards to complete the war
				//If not enough cards call outOfCards function

				if (player1.hand.length >= 3 && player2.hand.length >= 3) {
					for (let i = 0; i < 2; i++) {
						this.warReward.push(player2.hand.shift(), player1.hand.shift())
					}
				}
				else if (player1.hand.length < 3) {
					this.outOfCards(player1, player2)
				}
				else {
					this.outOfCards(player2, player1)
				}
			}
			else {
				console.log(`${player2.name} wins ${player2.hand[0].card} of ${player2.hand[0].suit} beats ${player1.hand[0].card} of ${player1.hand[0].suit}`)
				this.winRound(player2, player1)
			}
            this.totalRounds++
		}

		//Score output based on who is out of cards

		if (player1.hand.length === 0) {
			console.log(`${player2.name} wins! 
            Total score:
            ${player2.name}: ${player2.score}
            ${player1.name}: ${player1.score}`)
		}
		else if (player2.hand.length === 0) {
			console.log(`${player1.name} wins! 
            Total score:
            ${player1.name}: ${player1.score}
            ${player2.name}: ${player2.score}`)
		}

        console.log(`Total wars: ${this.warCount}`)
        console.log(`Total rounds: ${this.totalRounds}`)

        console.log(player1.hand, player2.hand)
	}
}


// Runs the game

let game = new Game
game.startGame()