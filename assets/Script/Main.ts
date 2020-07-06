
const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    start () {

    }

    // update (dt) {}
}
