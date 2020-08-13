import ViewBase from "../common/ViewBase";
import { GameData } from "../config/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class buyGoods extends ViewBase {

    @property(cc.EditBox)
    buyCount: cc.EditBox = null;

    @property(cc.Label)
    lblName: cc.Label = null; 

    @property(cc.Label)
    lblTip: cc.Label = null;     //  

    @property(cc.Label)
    lblBtn: cc.Label = null;     //  

    @property(cc.Slider)
    slider:cc.Slider = null;    //

    isBuyIn: true;  //是否买入
    mostCount:0;    //最多买入||最多卖出
    price:0;    //单价
    id: 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.buyCount.string = '1';
    }

    updateData(info){
        cc.log('info.buyin:'+JSON.stringify(info))
        this.id = info.id;
        this.isBuyIn = info.isBuyIn;
        this.price = info.price
        this.lblName.string = info.name;
        this.mostCount = info.count;
        if(info.isBuyIn){
            cc.log('买入ss')
            this.buyCount.string = (info.count==0?0:1)+'';
            this.slider.progress = 0;
            this.lblTip.string = '最多可购入'+info.name+info.count+'杯';
            this.lblBtn.string = '买入';
        }else{  
            cc.log('买出os')
            this.buyCount.string = info.count;
            this.slider.progress = 1;
            this.lblTip.string = '卖出可获得'+info.count*info.price+GameData.MONEYNAME;
            this.lblBtn.string = '卖出';
        }
        
    }

    onSliderChange(slider){
        cc.log('拖动数量滑块'+parseInt(slider.progress*this.mostCount+''))
        let sliderCount = parseInt(slider.progress*this.mostCount+'');
        this.buyCount.string = ((sliderCount==0 && this.mostCount!=0)?1:sliderCount) +'';
        if(!this.isBuyIn){
            this.lblTip.string = '卖出可获得'+sliderCount*this.price+GameData.MONEYNAME;
        }
    }

    onClickSure(){
        // cc.log('点击确定 ')
        let buyCount = parseInt(this.buyCount.string)
        if(this.callback){
            if(this.isBuyIn){
                this.callback(buyCount*this.price);
            }else{
                this.callback({
                    id: this.id
                    price: parseInt(this.buyCount.string)*this.price
                }) 
            }
        }
        // this.node.active = false;
    }

    onClickCanel(){
        if(this.callback){
            this.callback('close');
        }
    }

    // update (dt) {}
}
