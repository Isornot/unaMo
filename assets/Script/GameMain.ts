import { GameData } from "./config/GameData";
import { SCENELIST } from "./config/Config";

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

    @property(cc.SpriteFrame)
    btnNormalSframe:cc.SpriteFrame = null;   //按钮正常样式
    
    @property(cc.SpriteFrame)
    btnCkSframe:cc.SpriteFrame = null;   //按钮选中样式
    
    @property(cc.Node)
    content:cc.Node = null;   //

    @property(cc.Label)
    lblCoin:cc.Label = null;

    @property(cc.Label)
    lblTime:cc.Label = null;
    
    // @property(cc.Button)
    // btnZJ:cc.Button = null; //zjbtn


    start () {
        this.initData();
        this.initView();
    }

    initData(){
        // 初始化数据
        let wData = cc.sys.localStorage.getItem('wordsList');
        let customerLen = GameData.CUSTOMER.length;
        if(!wData){
            let wlist = [];
            for(let i = 0; i<customerLen; i++){
                wlist.push((i+1).toString()+'_1');
            }
            cc.log('udata',wlist);
            cc.sys.localStorage.setItem('wordsList', JSON.stringify(wlist)); 
        }else{
            wData = JSON.parse(wData);
            if(wData.length!=customerLen){
                for(let i = wData.length - 1; i<customerLen; i++){
                    wData.push((i+1).toString()+'_1');
                    cc.log('uData234',wData)
                    cc.sys.localStorage.setItem('wordsList', JSON.stringify(wData));
                }
            }
        }
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
    onClickChangeUI(event, custom){
        let node = event.target;
        node.parent.children.forEach(element => {
            element.getComponent(cc.Sprite).spriteFrame = this.btnNormalSframe;            
        });
        node.getComponent(cc.Sprite).spriteFrame = this.btnCkSframe;

        this.content.removeAllChildren();
        cc.log('custom..', custom)
        let index = parseInt(custom);
        this.bg.spriteFrame = this.bgFrames[index];
        this.content.addChild(cc.instantiate(this.uiPrefabs[index]));
    }

    // 返回登陆界面
    onClickBack(){
        cc.director.loadScene(SCENELIST.login);
    }

    // update (dt) {}
}
