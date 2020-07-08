
export class GameData{

    // 可变数据
    static coin = 100000;
    static day = 1;   //第几天
    static weather = 1;  //-1:雨天； 1:晴天； 2:阴天

    /************************ 固定配置 *********************/
    /**
     * 客人配置
     * @param id
     * @param sex 1男 2女
     * 、name、sex、age、favorability、happyPic、sadPic、wordsId、voice?、bgm?
     */
    static CUSTOMER = [        
        {id:1, name:'', sex:2, age:3.5, favorability:5, happyPic:'1_h',sadPic:'1_sad', wordsId:1},
        {id:2, name:'', sex:1, age:15, favorability:5, happyPic:'2_h',sadPic:'1_sad', wordsId:1},
    ]

    static WORDS = {
        '1_1':'una alreay not un 3 years little child!',
        '2_1':'una 2_1 de words',
    }

    /************************ 修改数据 *********************/

    // update the coin
    static updateCoin(changeValue) {
        this.coin = this.coin+changeValue
        cc.log('current coin :'+this.coin)
    }

}