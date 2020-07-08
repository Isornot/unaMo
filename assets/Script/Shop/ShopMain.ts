
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopMain extends cc.Component {


    start () {
        this.initView();
    }

    initView(){
        
    }

    // testZJConfig(){
    //     // 
    //     cc.log('sdfdslfj')
    //     let item = cc.instantiate(this.zjItem);
    //     cc.log(item.name)
    //     item.getComponent(item.name).updateData(0, 0);
    //     // item.setPosition(0, 0);
    //     item.getComponent(item.name).backCallBack = ()=>{
    //         cc.log('fanhui..');
    //         this.btnZJ.interactable = true;
    //     }
    //     this.content.addChild(item);
    // }
}
