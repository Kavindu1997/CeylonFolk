import { CouponActionTypes} from "../_constants/couponActionTypes";

const initialState = {
  coupons: [],
};

export const couponReducer = (state = initialState, {type,payload}) => {
  switch (type){
      case CouponActionTypes.FETCH_COUPONS:
        return {...state,coupons:payload};
      // case CouponActionTypes.CREATE_COUPON:
      //   return {...state,coupons:payload};
      // case CouponActionTypes.DELETE_COUPON:
      //   return {...state,coupons:payload};
    //   case CouponActionTypes.UPDATE_COUPON:
    //   return state.map((user)=>user.id===payload.id?payload:{...state});
    default:
      return state;
  }
};
 