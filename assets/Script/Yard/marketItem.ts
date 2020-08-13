import ViewBase from "../common/ViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class marketItem extends ViewBase{

    @property(cc.Label)
    lblName: cc.Label = null;

    @property(cc.Label)
    lblPrice: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    price = 0;  //价格
    gid: 0; //货物id

    // onLoad () {}

    start () {

    }

    updateData(info){
        this.gid = info.id;
        this.lblName.string = info.name;
        this.price = info.price;
        this.lblPrice.string = this.price+'';
    }

    onClickItem(){
        cc.log('点击'+this.gid)
        if(this.callback){
            cc.log('sds')
            this.callback();
        }        
    }
}
