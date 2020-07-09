import { GameData } from "../config/GameData";
import { WORDS_PIC_LIST } from "../config/Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Role extends cc.Component {

    @property(cc.Label)
    words: cc.Label = null;

    // @property
    // text: string = 'hello';

    @property(cc.Sprite)
    img:cc.Sprite = null;

    // onLoad () {}

    start () {
    }

    updateData(customerId){
        // about hgd、
        // 获取本地缓存的语言数据
        // this.words.string = 
        if(!GameData.CUSTOMER[customerId]){
            cc.log('customerId不存在');
            return;
        }
        cc.resources.load(GameData.CUSTOMER[customerId].pic, cc.SpriteFrame, null, function(err, sFrame){
            if(err){
                cc.log(err);
            }else{
                this.img.spriteFrame = sFrame;
            }
        }.bind(this));
        let wData = cc.sys.localStorage.getItem('wordsList');
        if(wData){
            let info = JSON.parse(wData);
            if(info[customerId]){
                this.words.string = WORDS_PIC_LIST[info[customerId]];
                // TODO 对话过长换行待处理
                // TODO 对话对应图片待处理
                this.words.node.active = true;
            }else{
                cc.log('发生错误：当前客人对应语言不存在');
            }
        }
    }

    onClickWords(){
        this.words.node.active = false;
    }

    // update (dt) {}
}
