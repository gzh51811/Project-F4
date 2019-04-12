import { createStore } from 'redux';
    //reducer为一个纯函数，用于设定state修改逻辑
    let initState = {
        goodslist: [
            {
                goods_id: 227122,
                title: 'jingjing',
                oprice: 88,
                thenum: 1,
                pic_url: 'https://www.nanshig.com/data/upload/shop/store/goods/39/39_05982351569257288_360.jpg'
            },
            {
                goods_id: 227108,
                title: 'didi',
                oprice: 188.5,
                thenum: 3,
                pic_url: 'https://www.nanshig.com/data/upload/shop/store/goods/39/39_05982351569257288_360.jpg'
            }
        ]
    }
    let reducer = (state = initState, { type, payload }) =>{
        switch(type){
            case 'add_to_cart':
            //添加购物车逻辑
                let has = false;
                state.goodslist.some(item=>{
                    if(item.goods_id === payload.goods_id){
                        has = true;
                        item.thenum = item.thenum + 1
                    }
                })
                if(has){            
                    console.log('+thenum:',state)
                    return {
                        ...state
                    }
                }else{
                    payload.thenum = 1
                    state.goodslist.push(payload)
                    console.log('+shopping:',state)
                    return {
                        ...state
                    }
                }
            //删除购物车商品
            case 'del_to_cart':
            for(var i=0;i<state.goodslist.length;i++){
                if(state.goodslist[i].goods_id === payload.goods_id){
                    state.goodslist.splice(i,1);   
                }
            }
            return {
                ...state
            }
            //购物车数量加减
            case 'DECLINE_QTY' :
                return {
                ...state,
                goodslist:state.goodslist.map(item=>{
                    if(item.goods_id === payload.goods_id){
                        --item.thenum;;
                    }
                    return item;
                    })
                }
            case 'INCREASE_QTY' :
                return {
                    ...state,
                    goodslist:state.goodslist.map(item=>{
                        if(item.goods_id === payload.goods_id){
                            ++item.thenum;
                        }
                        return item;
                        })
                    }
            default:
                return state
        }
    }
    let store = createStore(reducer);
export default store;