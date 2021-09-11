export function setPayment(detail){

  var uName = localStorage.getItem("fullname");

    var payment = {
        sandbox: true, // if the account is sandbox or real
        merchant_id: '1218255', // Replace your Merchant ID
        return_url: 'https://support.payhere.lk/faq/sandbox-and-testing',
        cancel_url: 'http://sample.com/cancel',
        notify_url: 'http://sample.com/notify',
        order_id: detail.orderId,
        items: uName,
        amount: detail.totalAmount,
        currency: 'LKR',
        first_name: detail.name,
        last_name: '',
        email: detail.email,
        phone: detail.phoneNo,
        address: detail.delivery,
        city: 'Colombo',
        country: 'Sri Lanka',
        delivery_address: detail.delivery, // optional field
        delivery_city: 'Kalutara', // optional field
        delivery_country: 'Sri Lanka', // optional field
        custom_1: '', // optional field
        custom_2: '', // optional field
      };
      return payment;
}