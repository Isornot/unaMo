
export class GameData{
    static Player = {
        name: '',
        coin: 100000,
        maxAge: 66,
        currentAge: 3,
    }

    // update the coin
    static updateCoin(changeValue) {
        this.Player.coin = this.Player.coin+changeValue
        cc.log('current coin :'+this.Player.coin)
    }

}