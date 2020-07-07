import BaseView from "../common/BaseView";
import { GameData } from "../desc/GameData";
import { ZJCONFIG } from "../desc/Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleItem extends BaseView {
    @property(cc.Label)
    lblRoleName: cc.Label = null;

    @property(cc.Label)
    lblProcess: cc.Label = null;

    @property(cc.Label)
    lblDesc: cc.Label = null;

    @property(cc.Sprite)
    img: cc.Sprite = null;

    private process = 0;    //进度
    private unitCost = 0;   //单位花费
    private maxProcess = 999;  //攻略次数
    private finishCondition = '';   //条件

    // onLoad () {}

    start () {

    }

    /**
     * 设置数据
     * @param gender 0-男；1-女
     * @param index 对应ZJCONFIG的下标
     */
    updateData(gender, index){
        let info = ZJCONFIG[gender][index];
        this.unitCost = -info.cost;
        this.finishCondition = info.condition;
        this.maxProcess = info.meetTimes;

        this.lblRoleName.string = info.name;
        this.lblProcess.string = '0'+'/'+info.meetTimes;
        this.lblDesc.string = info.desc;
        
        cc.resources.load('icon/'+info.pic, cc.SpriteFrame, null, function (err, spriteFrame) {
            if(err){
                cc.log('加载图片失败:'+err)
            }else{
                this.img.spriteFrame = spriteFrame;
            }
        }.bind(this));
    }

    clear(){
        super.clear();
    }

    //---------------- click event ----------------------
    onClickShuoHe(){
        if(this.maxProcess == this.process){
            this.lblProcess.string = this.finishCondition;
            return;
        }
        if (GameData.Player.coin < this.unitCost){
            cc.log('钱不够啦！！')
            return;
        }
        this.process++;
        this.lblProcess.string = this.process.toString() + '/' + this.maxProcess.toString();
        GameData.updateCoin(this.unitCost)
    }

    onClickClose(){
        if(this.backCallBack){
            this.backCallBack();
        }
        this.clear();
        this.node.destroy();
    }

    // update (dt) {}
}
