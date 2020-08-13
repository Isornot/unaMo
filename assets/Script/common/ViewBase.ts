
const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewBase extends cc.Component {
    callback: {};

    start(){
        this.initData();
        this.initView();
    }

    initData(){

    }

    updateData(data){

    }

    initView(){

    }

    setCallBack(cb){
        this.callback = cb;
    }

    onDestroy(){
        this.clear();
    }

    clear(){
        this.callback = null;
    }
    
}
