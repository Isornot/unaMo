//  参考文档
/**
 * 买房记：我的逆袭 - MFJ
 * 一个亿 - YGY
 */
 

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    game:string = '';

    Guide(){
        // 新手教程
        switch(this.game){
            case 'MFJ':                
                // 使用遮罩，高亮显示目标区域，文字介绍使用方式
                break;
            case 'YGY':
                break;
        }
    }

    Content() {
        switch(this.game){
            case 'MFJ':
                /**
                 * 1、二手市场
                 * 2、农贸市场
                 * 3、批发市场 （点击123三个市场，市场的货物和价格会发生变化，同时时间也会+1周
                 * 4、银行 - 存多余的钱（损失，利息）
                 * 5、医院 - 花钱看病（减少暴毙可能）
                 * 6、售楼部 - 买房
                 * 7、中介 - 租用出租屋空间（货仓扩容）（货物/
                 */
                break;
            case 'YGY':
                /**
                 * 1、市场 - 市场（行情）/仓库100（货物/买入价/数量 - 200个为上限，首个广告提升10个仓库空间，后面不知
                 * 2、创业 - 创立各类型公司（¥/增加收益）
                 * 3、花钱 - 娱乐（试试运气/约会圣地（有几率刷攻略人物¥）/住宅（健康/名声/¥）/汽车（约会概率/名声/¥）
                 * 4、约会 - ¥/好感度/攻略条件（亲密度99显示）            
                 */
                break;
        }
    }

    Other(){
        switch(this.game){
            case 'MFJ':
                /**
                 * 1、健康系统（实名/游客）可能是app限制
                 * 2、帮助（会重复新手教程）
                 * 3、里程碑（买房记录：房型 - 首次购买时间 - 成功次数
                 */
                break;
            case 'YGY':
                /**
                 * 1、请财神（市场本局盈利+2%）/大佬指点（本局股票分红收益+20%）/幸运加身（赢钱概率+20%）/请月老（随即解锁一个可约会伴侣）- 对应【市场/创业/花钱/约会】功能
                 * 2、富豪榜
                 * 3、创业履历（姓名/家族人数/最杰出资产/平均退休资产/百万富翁（次数）/千万富翁/亿万富翁）
                 * 
                 */
                break;
        }
    }

    ValueSystem(){
        switch(this.game){
            case 'MFJ':
                /**
                 * 1、每日奖励（1-10，赠送买房代金劵，1000*day）
                 * 2、时间：52周（一年）
                 * 3、健康：100（低于95，可能暴毙）
                 * 4、名声：100（名声太差，售楼小姐可能不愿意卖房给你）
                 * 5、现金：首次游戏初始现金为3000
                 * 6、存款
                 * 7、房价：非一成不变，每周会上涨：房型(10)：43w-131w-262w-???
                 * 8、市场：货物价格变化
                 * 9、出租屋：100（后期买入1个/万）
                 */
                break;
            case 'YGY':
                /**
                 * 4、名声：0（需要上涨）
                 */
                break;
        }
    }

    Object(){
        switch(this.game){
            case 'MFJ':
                // 一年（52周）内买房
                break;
            case 'YGY':

                break;
        }
    }

    Special(){
        switch(this.game){
            case 'MFJ':
                /**
                 * 1、【可】点击医院、银行、中介的时候，并非打开新场景，仅仅是一个简单的小弹窗，提供简单功能按钮即可 - 用起来蛮好的，感觉不会打断在市场的买入卖出过程思路。
                 *    整个游戏除去首次打开的背景介绍，就一个主场景 - 一个买房场景 - 一个里程碑
                 * 2、【可】音效简单
                 */
                break;
            case 'YGY':
                /**
                 * 1、【恶】背景音乐贯穿整个游戏，听的有点烦
                 */
                break;
        }
    }
}