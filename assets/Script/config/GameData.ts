
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

    /*********************************** inout ************************************/

    static BUSINESS_VALUE = 0    //产业价值
    static MONEYNAME = '银两'   //钱币名称

    static GoodsName = [
        'AA',
        'BB',
        'CC',
        'DD',
        'EE'
    ]

    /**
     * 货物信息
     * basePrice: 波动低价，波动的上限：basePrice*2
     * level - 价格波动等级：
     *      1、未出现涨跌时
     *          level 1（初始价格十）：波动在30以内， 出现涨跌30-50内
     *          level 2（初始价格百）：波动在150以内， 出现涨跌150-300内
     *          level 3（初始价格千）：正常波动500以内， 出现涨跌1000-2000内
     */
    static GOODS = [
        {id: 1, name: GameData.GoodsName[0], price: 1550, basePrice: 800},
        {id: 2, name: GameData.GoodsName[1], price: 9110, basePrice: 800},
        {id: 3, name: GameData.GoodsName[2], price: 220, basePrice: 200},
        {id: 4, name: GameData.GoodsName[3], price: 30, basePrice: 80},
        {id: 5, name: GameData.GoodsName[4], price: 2320, basePrice: 2000},
    ]

    // /**
    //  * 市场波动情况
    //  */
    // static MarketChange = [
    //     {id: 1, name: GameData.GoodsName[0], isAddPrice:true, tip:GameData.GoodsName[0]+'价格上涨'},
    //     {id: 2, name: GameData.GoodsName[0], isAddPrice:false, tip:GameData.GoodsName[0]+'价格下跌'},
    //     {id: 3, name: GameData.GoodsName[1], isAddPrice:true, tip:GameData.GoodsName[1]+'价格上涨'},
    //     {id: 4, name: GameData.GoodsName[1], isAddPrice:false, tip:GameData.GoodsName[1]+'价格下跌'},
    //     {id: 5, name: GameData.GoodsName[2], isAddPrice:true, tip:GameData.GoodsName[2]+'价格上涨'},
    //     {id: 6, name: GameData.GoodsName[2], isAddPrice:false, tip:GameData.GoodsName[2]+'价格下跌'},
    //     {id: 7, name: GameData.GoodsName[3], isAddPrice:true, tip:GameData.GoodsName[3]+'价格上涨'},
    //     {id: 8, name: GameData.GoodsName[3], isAddPrice:false, tip:GameData.GoodsName[3]+'价格下跌'},
    //     {id: 9, name: GameData.GoodsName[4], isAddPrice:true, tip:GameData.GoodsName[4]+'价格上涨'},
    //     {id: 10, name: GameData.GoodsName[4], isAddPrice:false, tip:GameData.GoodsName[4]+'价格下跌'},
    // ]
}