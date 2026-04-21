const submitOrder = async () => {
  const orderData = {
    customerName: orderInfo.customerName,
    contact: orderInfo.contact,
    memo: orderInfo.memo,
    items: cart,
    totalPrice
  };

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbz_3CsUq5tiiIN3nb1b7GDbFd8YPP6NpI5pVhLKkSOfpZYjUkdeM21vDuw_jcQKYwrfkw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      }
    );

    setCart([]);
    setOrderInfo({
      customerName: "",
      contact: "",
      memo: ""
    });

    setShowOrderForm(false);
    setOrderComplete(true);
  } catch (error) {
    console.error(error);
    alert("주문 전송에 실패했습니다.");
  }
};
