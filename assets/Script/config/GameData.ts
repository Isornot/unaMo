
export class GameData{

    // 可变数据
    static coin = 100000;
    static day = 1;   //第几天
    static weather = 1;  //-1:雨天； 1:晴天； 2:阴天

    /************************ 固定配置 *********************/
    /**
     * 客人配置
     * @param id - 与role图片和words的id有关联
     * @param sex 1男 2女
     * @param initAge //初始年纪
     * 、name、sex、age、
     * favorability、happyPic、sadPic、wordsId、voice?、bgm?
     */
    static CUSTOMER = [        
        {id:1, name:'三岁半', sex:2, age:3.5, desc:'打酱油的年纪，是个调皮的小孩儿', pic:'customer/role0'},
        {id:2, name:'赵木匠', sex:1, age:51, desc:'是县里有名的木匠，喜欢做各种稀奇古怪的小玩具，深受小孩喜欢', pic:'customer/role19'},
    ]

    /************************ 修改数据 *********************/

    // update the coin
    static updateCoin(changeValue) {
        this.coin = this.coin+changeValue
        cc.log('current coin :'+this.coin)
    }
}