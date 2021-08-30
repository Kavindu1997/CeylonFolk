import ceylonforkapi from "../api/index";
import { CouponActionTypes } from "../_constants/couponActionTypes";

export const fetchCoupons = () => async (dispatch) => {
  const response = await ceylonforkapi.get("/coupons")
  dispatch({type: CouponActionTypes.FETCH_COUPONS,payload: response.data})
}

export const createCoupon = (data) => async (dispatch) => {
  const response = await ceylonforkapi.post("/coupons",data);
  dispatch({type: CouponActionTypes.CREATE_COUPON,payload: response.data});
}

export const deleteCoupon = (id) => async (dispatch) => {
  const response = await ceylonforkapi.delete(`/coupons/${id}`);
  dispatch({type: CouponActionTypes.DELETE_COUPON,payload: response.data});
}

export const updateCoupon = (data,id) => async (dispatch) => {
  const response = await ceylonforkapi.put(`/coupons/${id}`,data);
  dispatch({type: CouponActionTypes.UPDATE_COUPON,payload: response.data});
}
