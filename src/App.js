// App.js 전체 코드
// 이전에 제공한 전체 App.js 코드와 동일하며,
// submitOrder의 fetch URL만 아래 URL로 적용하세요.

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
      "https://script.google.com/macros/s/AKfycby3sB_eJv8G6XqTAf1UUE30_dwD9srhafx3bArxWug8nh6qtEx-vTqtGi2eoYVRxCMtDw/exec",
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
