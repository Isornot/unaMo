
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopMain extends cc.Component {

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Prefab)
    customerPrefab:cc.Prefab = null;

    start () {
        this.initView();
    }

    initView(){
        this.UpdateCustomer();
    }

    UpdateCustomer(){
        let item = cc.instantiate(this.customerPrefab);
        if(!item){
            cc.log('CustomerPrefab不存在..');
            return;
        }
        let cid = this.getCustomerId();
        cc.log(item.name);
        item.getComponent(item.name).updateData(cid);
        if(this.content){
            this.content.addChild(item);
        }
    }

    getCustomerId(){
        // 获取需要现实的玩家ID
        return 0;
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
