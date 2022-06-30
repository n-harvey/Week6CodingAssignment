//Unit tests

var expect = chai.expect

describe('Function test', function() {
    describe('#getCardValue', function(){
        it('Should return the value of the passed in card', function(){
            let game = new Game()
            let x = game.getCardValue('K')
            expect(x).to.equal(13)
        })
    })
})