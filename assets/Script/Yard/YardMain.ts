
import ViewBase from "../common/ViewBase";
import { GameData } from "../config/GameData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends ViewBase {

    @property(cc.Prefab)
    pbMarketItem: cc.Prefab = null;   //市场预制

    @property(cc.Prefab)
    pbWarehouseItem: cc.Prefab = null;   //仓库预制

    @property(cc.Node)
    cttMarket: cc.Node = null;   //市场ctt

    @property(cc.Node)
    cttWareHouse: cc.Node = null;   //货仓ctt

    // @property(cc.Label)
    // lblTime: cc.Label = null;   //时间 - 时间：1/60年

    @property(cc.Label)
    lblMoney: cc.Label = null;   //现银 - 现银：0

    @property(cc.Label)
    lblProperty: cc.Label = null;   //身家 - 身家：0

    @property(cc.Label)
    lblReputation: cc.Label = null;   //名声 - 名声：0

    @property(cc.Label)
    lblMood: cc.Label = null;   //心情 - 心情：50(<30||>70触发事件)

    @property(cc.Label)
    lblMarketInfo: cc.Label = null;   //市场信息

    @property(cc.Prefab)      //购买货物弹窗
    goodsBuyPrefab: cc.Prefab = null;

    // @property(cc.Node)      //遮罩
    // mask: cc.Node = null;

    @property(cc.Node)      //弹窗父节点
    dialogRoot: cc.Node = null;

    // currentTime = 1;     //当前时间
    // totalTime = 60;  //总时间
    money = 0;   //钱
    mood = 50; //心情
    reputation = 0;  //名声
    showGoodsTotalCount = 4; //显示的商品总量
    dialogGoodsBuy: cc.Node;    //弹窗-购买货物

    Warehouse_info = [];    //仓库货物信息

    isGoodsBuyIn = false;    //判断货物是买进还是卖出
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
    }

    initData(){
        // this.currentTime = 1;
        // this.totalTime = 60;
        this.money = 10000;
        this.mood = 50;
        this.reputation = 0;
    }

    initView(){
        // this.updateTime();
        this.updateMoney();
        this.updateProperty();
        this.updateMood();
        this.updateReputation();
        this.updateGoods();
    }
    
    /**
     * 设置时间
     * @param value 当前时间（可选）
     */
    // updateTime(value?){
        // if(value){
        //     this.currentTime = value;
        // }
        // this.lblTime.string = '时间:'+this.currentTime+'/'+this.totalTime;
    // }

    /**
     * 更新现银
     * @param value 当前现银
     */
    updateMoney(value?){
        cc.log('value:'+value);
        if(value && value == this.money){
            return;
        }
        if(value){
            this.money = value;
        }
        this.lblMoney.string = '现银：'+this.money;
        this.updateProperty();
    }

    /**
     * 更新身家
     */
    updateProperty(){
        // cc.log('updateProperty：'+this.money+'; '+GameData.BUSINESS_VALUE);
        this.lblProperty.string = '身家：'+(this.money+GameData.BUSINESS_VALUE);
    }

    /**
     * 更新心情值
     * @param value 心情值
     */
    updateMood(value?){
        if(value){
            this.mood = value;
        }
        this.lblMood.string = '心情：'+this.mood;
    }

    /**
     * 更新名声值
     * @param value 名声值
     */
    updateReputation(value?){
        if(value){
            this.reputation = value;
        }
        this.lblReputation.string = '名声：'+this.reputation;
    }

    updateGoods(){
        this.cttMarket.removeAllChildren();
        let array = GameData.GOODS;
        cc.log('array..'+JSON.stringify(array))
        let getedIdArr = [];
        for(let i = 0; i<this.showGoodsTotalCount; i++){
            let randNum = 0
            let bNew = false;
            let count = 0;  //测试数据
            while(!bNew){
                count++;
                bNew = true;
                cc.log('凑童年：'+count);
                randNum = Math.floor(Math.random()*array.length);
                cc.log('randNum:'+randNum)
                if(array[randNum]){
                    for(let j = 0; j<getedIdArr.length; j++){
                        if(randNum == getedIdArr[j]){
                            bNew = false;
                        }
                    }
                    if(bNew){
                        getedIdArr.push(randNum);
                        bNew = true;
                    }
                }                    
            }
        }

        cc.log('geditedarrl:'+JSON.stringify(getedIdArr))
        for (let i = 0; i < getedIdArr.length; i++) {
            const element = array[getedIdArr[i]];
            let item = cc.instantiate(this.pbMarketItem);
            let info = this.getTempGoodsInfo(element);
            item.getComponent(item.name).updateData(info);
            item.getComponent(item.name).setCallBack(()=>{
                cc.log('点击购买货物')
                this.showGoodsOptionDialog(info, true);
            });
            this.cttMarket.addChild(item);
        }
    }

    /**
     * 刷新货仓数据
     * @param addInfo 添加的货物信息{name:'名称', price:买入单价, count:购买数量}
     */
    updateWareHouse(addInfo){
        // cc.log('更新仓库信息'+JSON.stringify(info));
        let added = false;
        this.Warehouse_info.forEach(element => {
            // TODO 待测试
            if(element.name == addInfo.name){
                cc.log('price:'+element.price+'.'+addInfo.price+';  coutn:'+element.count+'; '+addInfo.count);
                element.price = Math.floor(element.price*element.count+addInfo.price*addInfo.count)/(element.count+addInfo.count);
                element.count += addInfo.count;
                added = true;
            }
        });
        if(!added){
            this.Warehouse_info.push(addInfo);
        }
        this.udpateUIWareHouse();
    }

    // 刷新货仓UI
    udpateUIWareHouse(){
        this.cttWareHouse.removeAllChildren();
        let array = this.Warehouse_info;
        array.forEach(element => {
            let item = cc.instantiate(this.pbWarehouseItem);
            item.getComponent(item.name).updateData(element);
            item.getComponent(item.name).setCallBack((gid)=>{
                let info = null;
                GameData.GOODS.forEach(ginfo => {
                    if(ginfo.id == gid){
                        info = ginfo;
                        info.count = element.count;
                    }
                });
                cc.log('iii:'+JSON.stringify(info))
                this.showGoodsOptionDialog(info, false);
            });
            this.cttWareHouse.addChild(item);
        });
    }

    /**
     * 获取当前商品信息
     * @param info 商品信息 对应GameData.GOODS
     */
    getTempGoodsInfo(info){
        // let tmpMarketChangeId = Math.floor(Math.random()*10)

        let min = info.basePrice
        let max = info.basePrice*2
        let priceSymbol = Math.floor(Math.random()*10)%2 == 0? -1: 1
        cc.log('pricesymbol:' + priceSymbol)
        let changePrice = (Math.floor(Math.random() * (max - min + 1) ) + min)*priceSymbol
        cc.log('changePrice:' + changePrice)
        let tmpPrice = info.price +changePrice;
        if(tmpPrice<10){
            tmpPrice = 20;
        }
        let rtInfo = {
            id: info.id,
            name: info.name,
            price: tmpPrice,
            basePrice: info.basePrice
        };
        cc.log('--- 变价前Goodsinfo:'+ JSON.stringify(GameData.GOODS))
        for( let i = 0; i<GameData.GOODS.length; i++){
            let oneInfo = GameData.GOODS[i]
            if(oneInfo.id == rtInfo.id){
                cc.log('equialllll')
                cc.log(JSON.stringify(oneInfo))
                GameData.GOODS[i] = rtInfo;
                cc.log(JSON.stringify(oneInfo))
            }
        }
        // GameData.GOODS.forEach(element => {
        //     cc.log('eid+rid: '+element.id+'; '+rtInfo.id)
        //     cc.log(JSON.stringify(element))
        //     if(element.id == rtInfo.id){
        //         cc.log('equialllll')
        //         element = rtInfo;
        //         cc.log(JSON.stringify(element))
        //     }
        // });
        cc.log('--- 变价后Goodsinfo:'+ JSON.stringify(GameData.GOODS))   
        return rtInfo;     
    }
    
    /**
     * 
     * @param info 显示数据{name:'名称', count:'数量' , tip:'显示的提示', count?(买入无，卖出有)}
     * @param isBuyIn 是否买入：true（买入)
     */
    showGoodsOptionDialog(info, isBuyIn){
        cc.log('显示获取操作窗口:'+isBuyIn+';'+JSON.stringify(info))
        info = {
            id: info.id,
            name: info.name,
            count: info.count? info.count: Math.floor(this.money/info.price),
            price: info.price,
            isBuyIn: isBuyIn
        }
        cc.log('ccount:'+info.count);
        if(this.dialogGoodsBuy){
            this.dialogGoodsBuy.active = true;
            this.dialogGoodsBuy.getComponent(this.dialogGoodsBuy.name).updateData(info);
        }else{
            this.dialogGoodsBuy = cc.instantiate(this.goodsBuyPrefab);
            this.dialogGoodsBuy.getComponent(this.dialogGoodsBuy.name).updateData(info);
            this.dialogRoot.addChild(this.dialogGoodsBuy);
        }
        this.dialogGoodsBuy.getComponent(this.dialogGoodsBuy.name).setCallBack((rtInfo)=>{
            // this.mask.active = false;
            this.dialogRoot.active = false;
            this.dialogGoodsBuy.active = false;
            cc.log('codufsdkf:'+rtInfo)
            if(rtInfo == 'close'){
                return;
            }
            if(isBuyIn){
                this.updateMoney(this.money-rtInfo); 
                let buyInfo = {
                    id: info.id,
                    name: info.name,
                    price: info.price,
                    count: rtInfo/info.price
                }
                this.updateWareHouse(buyInfo);
            }else{
                cc.log('卖出的货物信息:'+JSON.stringify(rtInfo));   //{name:'', price:}
                cc.log('卖出前的仓库数据：'+JSON.stringify(this.Warehouse_info));
                let removeIndex = -1;
                let array = this.Warehouse_info;
                for(let i = 0; i<array.length; i++){
                    cc.log("sdlkfjsl")
                    if(array[i].id == rtInfo.id){
                        cc.log('e2r.2lsdkf')
                        let soldCount = rtInfo.price/info.price
                        cc.log('kkkkkkwrewrer:'+soldCount+'; '+array[i].count);
                        if(array[i].count == soldCount){
                            cc.log('kkkkkk')
                            removeIndex = i;
                        }else{
                            array[i].count -= soldCount;
                        }
                        break;  //TODO 待测试
                    }
                }
                cc.log('removeIndex:'+removeIndex)
                if(removeIndex!=-1){
                    this.Warehouse_info.splice(removeIndex, 1);
                }
                cc.log('卖出后的仓库数据：'+JSON.stringify(this.Warehouse_info));
                this.udpateUIWareHouse();
                this.updateMoney(this.money+rtInfo.price); 
            }            
        });
        this.dialogRoot.active = true;
        // this.mask.active = true;
    }

    // showMask(bflag){
    //     this.mask.active = bflag;
    // }

    /*=================================== 点击事件 ===================================*/

    // onClickMask(){
    //     this.showMask(false);
    // }

    onClickNext(){
        // cc.log('点击下一年');
        // this.currentTime += 1;
        // if(this.currentTime == this.totalTime){
        //     cc.log('GameOVER');
        //     // 增加其他操作
        //     return;
        // }
        // this.lblTime.string = '时间：'+this.currentTime+'/'+this.totalTime;
        this.updateGoods();
    }

    // update (dt) {}
}
