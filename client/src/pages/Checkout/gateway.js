import React from 'react';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import { useDispatch, useSelector } from "react-redux";

function Gateway() {
  const paymentDetail = useSelector(state => state.checkout.detail)
  console.log(paymentDetail)
  return (
    <div className="App">
      <PaymentModal
	// Use a unique value for the orderId
	paymentDetail = {paymentDetail} 
      />
    </div>
  );
}

export default Gateway;