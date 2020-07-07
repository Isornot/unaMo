
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseView extends cc.Component {

    backCallBack = null;

    clear(){
        this.backCallBack = null;
    }
}
