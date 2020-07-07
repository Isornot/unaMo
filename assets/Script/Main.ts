import { GameData } from "./desc/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    mask:cc.Node = null;    //遮罩

    @property(cc.Node)
    content:cc.Node = null;   //

    @property(cc.Prefab)
    zjItem:cc.Prefab = null;

    @property(cc.Label)
    lblCoin:cc.Label = null;

    @property(cc.Label)
    lblTime:cc.Label = null;
    
    @property(cc.Button)
    btnZJ:cc.Button = null; //zjbtn


    start () {
        this.initView();
    }

    initView(){
        let playerInfo = GameData.Player
        cc.log(playerInfo)
        this.lblCoin.string = playerInfo.coin.toString();
        this.lblTime.string = playerInfo.currentAge.toString()+'/'+playerInfo.maxAge.toString();
    }

    testZJConfig(){
        // 
        cc.log('sdfdslfj')
        let item = cc.instantiate(this.zjItem);
        cc.log(item.name)
        item.getComponent(item.name).updateData(0, 0);
        // item.setPosition(0, 0);
        item.getComponent(item.name).backCallBack = ()=>{
            cc.log('fanhui..');
            this.btnZJ.interactable = true;
        }
        this.content.addChild(item);
    }

    showMask(bShow){
        this.mask.active = bShow;
    }

    // ----------------- click event ---------------
    onClickZj(){
        // cc.log(target.name)
        this.btnZJ.interactable = false;
        this.testZJConfig();
    }

    // update (dt) {}
}
