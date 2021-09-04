import { CART_CONSTS } from "../_constants";
import ceylonforkapi from "../api/index";


export const actionAddToCart = product => {
    return {
        type: CART_CONSTS.ADD_TO_CART,
        payload: product
    }
};

export const actionGetTotal = total => {
    return {
        type: CART_CONSTS.GET_TOTAL,
        payload: total
    }
};

export const actionDeleteItem = (id,size) => {
    return {
        type: CART_CONSTS.DELETE_ITEM,
        payload: {id:id,size:size}
    }
};

export const actionGetTotalDeduct = () => {
    return {
        type: CART_CONSTS.GET_TOTAL_DEDUCT,
    }
};

export const actionUpdateItem = productCart => {
    return {
        type: CART_CONSTS.UPDATE_CART_QUANTITY,
        payload: productCart
    }
};

export const incrementCartCount = () => {
    return {
        type: CART_CONSTS.INCREMENT_CART_NO,
    }
};

export const calculateCartCount = () => {
    return {
        type: CART_CONSTS.CATCULATE_CART_COUNT,
    }
};


export const decrementCartCount = () => {
    return {
        type: CART_CONSTS.DECREMENT_CART_NO,
    }
};

export const calculateTotalWhenChanged = productCart => {

    var newTotalValue= 0;
    let i=0;
    console.log(productCart.length)
    // while(i =<productCart.length-1){
    //     productCart[i].totals=productCart[i].price*productCart[i].quantity;
    //     newTotalValue=productCart[i].totals;
    //     i++;
    // }
    for(i=0;i<=productCart.length-1;i++){
        productCart[i].totals=productCart[i].price*productCart[i].quantity;
        newTotalValue=newTotalValue+productCart[i].totals;
       console.log(productCart[i].totals)
    }
    return {
        type: CART_CONSTS.CALCULATE_TOTAL_WHEN_CHANGED,
        payload:{cart:productCart,total:newTotalValue}
    }
};

export const getCart = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/items/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART, payload: response.data })
        console.log(response.data)
    }
};


export const emptyCart = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/items/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART, payload:[] })
        console.log(response.data)
    }
};


export const deleteCartUsingID = (id,size) => async (dispatch) => {
    var uid = localStorage.getItem("userId")
    if (uid > 0) {
      const data = { userId: uid, itemId: id, size:size }
        await ceylonforkapi.put("/check/remove/",data).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
            dispatch(getCart())
            dispatch(getTotal())
            dispatch(decrementCartCount());
        }
      });
    }
};

export const getTotal = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/total/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART_TOTAL, payload: response.data })
    }
};

export const emtyTotal = () => async (dispatch) => {
    var id = localStorage.getItem("userId");
    if (id != '0') {
        const response = await ceylonforkapi.get("/check/total/"+ id)
        dispatch({ type: CART_CONSTS.GET_CART_TOTAL, payload: [{total:0}] })
    }
};

export const sendProductsToDB = (product) => async (dispatch) => {
        await ceylonforkapi.post("/check/addToCart/",product).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                return 0;
            }
            else {
                dispatch(incrementCartCount());
                dispatch(actionAddToCart(product));
                return 1;
            }
          });    
};

export const updateCartQuantity = (productCart) => async (dispatch) => {
    var uid = localStorage.getItem("userId");
    if (uid != '0') {
      const response= await ceylonforkapi.put("/check/updateQty/",productCart)
        if(response.data.error) {
                alert(response.data.error);
                return 0;
            }else{
                dispatch(getCart())
                dispatch(getTotal())
                return 1;
            }
      
    }
};


