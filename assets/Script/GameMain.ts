import { GameData } from "./config/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null;    //背景

    @property(cc.SpriteFrame)
    bgFrames:cc.SpriteFrame[] = [null];   //背景合集

    @property(cc.Prefab)
    uiPrefabs:cc.Prefab[] = [null];   //主要界面预制合集

    @property(cc.Node)
    mask:cc.Node = null;    //遮罩

    @property(cc.Node)
    content:cc.Node = null;   //

    @property(cc.Label)
    lblCoin:cc.Label = null;

    @property(cc.Label)
    lblTime:cc.Label = null;
    
    // @property(cc.Button)
    // btnZJ:cc.Button = null; //zjbtn


    start () {
        this.initView();
    }

    initView(){
        this.updateData();
    }

    updateData(){
        this.updateCoin();
        this.updateTime();
    }

    showMask(bShow){
        this.mask.active = bShow;
    }

    // ==================== 更新数据 ====================

    updateCoin(){
        cc.log('sdlkfjsldfj', GameData.coin);
        this.lblCoin.string = '银两:'+GameData.coin.toString();
    }

    updateTime(){
        this.lblTime.string = '第'+GameData.day.toString()+'天';
    }

    // ==================== click event ====================

    /**
     * 点击切换主界面
     * @param target 
     * @param custom 0:院；1:摊；2:客
     */
    onClickChangeUI(target, custom){
        this.content.removeAllChildren();
        cc.log('custom..', custom)
        let index = parseInt(custom);
        this.bg.spriteFrame = this.bgFrames[index];
        this.content.addChild(cc.instantiate(this.uiPrefabs[index]));
    }

    // update (dt) {}
}
