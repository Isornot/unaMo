import { SCENELIST } from "./config/Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {

    @property(cc.Button)    //新游戏按钮    
    newGame: cc.Button = null

    @property(cc.Prefab)    //主界面
    prefabMain: cc.Prefab = null

    start () {
        // init logic
        
    }

    onClickNew(){
        // 开始新游戏
        cc.director.loadScene(SCENELIST.main);
    }
}
