import React, { useState, useMemo } from "react";

import ramenImage from "./ramen.png";
import friedChickenImage from "./fried_chicken.png";
import eggSaladImage from "./egg_salad.png";
import eggMayoToastImage from "./egg_mayo_toast.png";
import strawberryMilkImage from "./strawberry_milk.png";
import brownieImage from "./brownie.png";
import caneleImage from "./Canele.png";
import macaronImage from "./macaron.png";
import axePosterImage from "./axe_poster.png";

export default function App() {
  const PRODUCTS = [
    {
      id: 1,
      name: "라면",
      tag: "배고픔+",
      tagColor: "#d8a95e",
      setCount: 4,
      price: 200,
      image: ramenImage,
      detailImage: ramenImage,
      consumeStats: [
        { label: "배고픔", value: "+5950" },
        { label: "목마름", value: "+1300" },
        { label: "집중력", value: "+400" },
        { label: "경험치", value: "+10" },
        { label: "섭취시간", value: "9.5초" }
      ],
      buffStats: [
        { label: "지속시간", value: "48초" },
        { label: "스태미나 재생 증가", value: "20" },
        { label: "전력질주 소모 스태미나 감소", value: "2" }
      ],
      description:
        "뜨거운 물에 끓여 간편하게 즐길 수 있는 매콤한 기본 라면이다."
    },
    {
      id: 2,
      name: "프라이드 치킨",
      tag: "채광버프+",
      tagColor: "#f59e0b",
      setCount: 2,
      price: 300,
      image: friedChickenImage,
      detailImage: friedChickenImage,
      consumeStats: [
        { label: "배고픔", value: "+7400" },
        { label: "목마름", value: "-620" },
        { label: "집중력", value: "+300" },
        { label: "경험치", value: "+50" },
        { label: "섭취시간", value: "10초" }
      ],
      buffStats: [
        { label: "지속시간", value: "4분 36초" },
        { label: "채광 시간 감소", value: "9%" },
        { label: "채광 2배 획득 확률", value: "+0.8%" }
      ],
      description: "바삭한 튀김옷이 매력적인 기본 프라이드 치킨이다."
    },
    {
      id: 3,
      name: "계란 샐러드",
      tag: "배고픔+",
      tagColor: "#d8a95e",
      setCount: 6,
      price: 400,
      image: eggSaladImage,
      detailImage: eggSaladImage,
      consumeStats: [
        { label: "배고픔", value: "+5650" },
        { label: "목마름", value: "-150" },
        { label: "집중력", value: "+400" },
        { label: "경험치", value: "+17" },
        { label: "섭취시간", value: "5.5초" }
      ],
      buffStats: [
        { label: "지속시간", value: "1분 18초" },
        { label: "스태미나 재생 증가", value: "10" }
      ],
      description: "잘게 썬 삶은 계란을 크리미하게 버무린 샐러드다."
    },
    {
      id: 4,
      name: "계란 마요 토스트",
      tag: "벌목버프+",
      tagColor: "#22c55e",
      setCount: 6,
      price: 700,
      image: eggMayoToastImage,
      detailImage: eggMayoToastImage,
      consumeStats: [
        { label: "배고픔", value: "+5650" },
        { label: "목마름", value: "-150" },
        { label: "집중력", value: "+400" },
        { label: "경험치", value: "+31" },
        { label: "섭취시간", value: "6초" }
      ],
      buffStats: [
        { label: "지속시간", value: "4분" },
        { label: "벌목 시간 감소", value: "6%" }
      ],
      description: "계란 마요를 듬뿍 올린 든든한 한 조각 토스트다."
    },
    {
      id: 5,
      name: "무난한 딸기우유",
      tag: "목마름+",
      tagColor: "#38bdf8",
      setCount: 10,
      price: 600,
      image: strawberryMilkImage,
      detailImage: strawberryMilkImage,
      consumeStats: [
        { label: "배고픔", value: "+600" },
        { label: "목마름", value: "+4200" },
        { label: "경험치", value: "+17" },
        { label: "섭취시간", value: "3.5초" }
      ],
      buffStats: [],
      description: "우유에 딸기 향을 더한 달콤한 음료다."
    },
    {
      id: 6,
      name: "브라우니",
      tag: "채광버프+",
      tagColor: "#f59e0b",
      setCount: 10,
      price: 800,
      image: brownieImage,
      detailImage: brownieImage,
      consumeStats: [
        { label: "배고픔", value: "+3120" },
        { label: "목마름", value: "+120" },
        { label: "집중력", value: "+500" },
        { label: "경험치", value: "+29" },
        { label: "섭취시간", value: "4초" }
      ],
      buffStats: [
        { label: "지속시간", value: "4분" },
        { label: "채광 시간 감소", value: "5%" }
      ],
      description: "꾸덕한 초콜릿 향이 진하게 느껴지는 브라우니다."
    },
    {
      id: 7,
      name: "까눌레",
      tag: "배고픔+",
      tagColor: "#d8a95e",
      setCount: 12,
      price: 900,
      image: caneleImage,
      detailImage: caneleImage,
      consumeStats: [
        { label: "배고픔", value: "+2920" },
        { label: "목마름", value: "+170" },
        { label: "집중력", value: "+500" },
        { label: "경험치", value: "+25" },
        { label: "섭취시간", value: "3.5초" }
      ],
      buffStats: [{ label: "회복", value: "+10 / 11.5초 동안" }],
      description: "겉은 바삭하고 속은 쫀득한 프랑스식 구움 과자입니다."
    },
    {
      id: 8,
      name: "마카롱",
      tag: "낚시버프+",
      tagColor: "#a78bfa",
      setCount: 15,
      price: 1500,
      image: macaronImage,
      detailImage: macaronImage,
      consumeStats: [
        { label: "배고픔", value: "+2620" },
        { label: "목마름", value: "+170" },
        { label: "집중력", value: "+500" },
        { label: "경험치", value: "+39" },
        { label: "섭취시간", value: "3.5초" }
      ],
      buffStats: [
        { label: "지속시간", value: "5분 42초" },
        { label: "입질 대기 시간 감소", value: "5%" },
        { label: "낚시 2배 획득 확률", value: "+0.8%" }
      ],
      description: "알록달록한 껍질 사이에 크림을 채운 한입 디저트다."
    }
  ];

  const [cart, setCart] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState(
    PRODUCTS.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    customerName: "",
    contact: "",
    memo: ""
  });

  const formatPrice = (value) => `${Number(value).toLocaleString()}원`;

  const changeSelectedQuantity = (id, amount) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount)
    }));
  };

  const addToCart = (product) => {
    const quantityToAdd = selectedQuantities[product.id] || 1;

    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);

      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      return [...prev, { ...product, quantity: quantityToAdd }];
    });

    setSelectedQuantities((prev) => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const changeCartQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalSets = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const submitOrder = async () => {
    if (isSubmitting || cart.length === 0) return;

    const orderData = {
      customerName: orderInfo.customerName.trim(),
      contact: orderInfo.contact.trim(),
      memo: orderInfo.memo.trim(),
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice
    };

    try {
      setIsSubmitting(true);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwLKghyekt4Z0MUH5701nOvsB5ybxYkUxuLMJG7u9h1oBmVcmb3CwWNPTZhxdrDdhmsNA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      translate="no"
      className="notranslate"
      style={{
        background:
          "radial-gradient(circle at top, #12203a 0%, #0b1120 42%, #070c16 100%)",
        minHeight: "100vh",
        width: "100%",
        color: "#f8fafc"
      }}
    >
      <div
        style={{
          fontFamily: "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
          padding: "30px",
          maxWidth: "1500px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 340px",
            gap: "30px",
            alignItems: "start"
          }}
        >
          <div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "28px",
                padding: "52px 38px 40px",
                marginBottom: "34px",
                background:
                  "linear-gradient(180deg, rgba(10,16,30,0.94) 0%, rgba(9,17,32,0.96) 100%)",
                border: "1px solid rgba(191,145,79,0.22)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.35)"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at center, rgba(191,145,79,0.10) 0%, rgba(191,145,79,0.03) 22%, rgba(0,0,0,0) 52%)",
                  pointerEvents: "none"
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "-90px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "620px",
                  height: "620px",
                  borderRadius: "999px",
                  border: "1px solid rgba(191,145,79,0.08)",
                  boxShadow: "0 0 0 1px rgba(191,145,79,0.03) inset",
                  pointerEvents: "none"
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    marginBottom: "18px",
                    color: "#d8b072",
                    fontSize: "12px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase"
                  }}
                >
                  Premium Food Store
                </div>

                <h1
                  className="notranslate"
                  style={{
                    margin: 0,
                    fontSize: "86px",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontWeight: "800",
                    color: "#f8fafc",
                    textShadow: "0 2px 14px rgba(0,0,0,0.24)"
                  }}
                >
                  AXE FOOD
                </h1>

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "1px",
                      backgroundColor: "#8b6a3d"
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      transform: "rotate(45deg)",
                      backgroundColor: "#bf914f"
                    }}
                  />
                  <div
                    style={{
                      width: "46px",
                      height: "1px",
                      backgroundColor: "#8b6a3d"
                    }}
                  />
                </div>

                <p
                  className="notranslate"
                  style={{
                    margin: "20px 0 0 0",
                    color: "#d7b37a",
                    fontSize: "22px",
                    lineHeight: 1.6,
                    fontWeight: "500"
                  }}
                >
                  AXE Restaurant
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "22px"
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "38px",
                  fontWeight: "800",
                  color: "#f8fafc",
                  letterSpacing: "-0.03em"
                }}
              >
                메뉴
              </h2>

              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(191,145,79,0.75) 0%, rgba(191,145,79,0.16) 36%, rgba(51,65,85,0.18) 100%)"
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px"
              }}
            >
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid rgba(191,145,79,0.22)",
                    borderRadius: "18px",
                    padding: "18px",
                    background:
                      "linear-gradient(180deg, rgba(16,24,39,0.92) 0%, rgba(17,24,39,0.98) 100%)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.18)"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "180px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      marginBottom: "14px",
                      backgroundColor: "#0f172a",
                      border: "1px solid rgba(191,145,79,0.16)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 2,
                        padding: "7px 11px",
                        borderRadius: "999px",
                        backgroundColor: product.tagColor,
                        color: "#111827",
                        fontSize: "12px",
                        fontWeight: "800",
                        letterSpacing: "-0.01em",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.22)"
                      }}
                    >
                      {product.tag}
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>

                  <h3
                    className="notranslate"
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "24px",
                      fontWeight: "800",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      margin: "6px 0",
                      color: "#cbd5e1",
                      fontSize: "15px"
                    }}
                  >
                    1세트 {product.setCount}ea
                  </p>

                  <p
                    style={{
                      margin: "6px 0 18px 0",
                      fontWeight: "800",
                      fontSize: "30px",
                      color: "#d8a95e",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {formatPrice(product.price)}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px"
                    }}
                  >
                    <button
                      onClick={() => changeSelectedQuantity(product.id, -1)}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        border: "1px solid rgba(191,145,79,0.22)",
                        background: "#111827",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      -
                    </button>

                    <div
                      style={{
                        flex: 1,
                        minWidth: "70px",
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "15px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        backgroundColor: "#111827",
                        border: "1px solid rgba(191,145,79,0.12)"
                      }}
                    >
                      {selectedQuantities[product.id]}세트
                    </div>

                    <button
                      onClick={() => changeSelectedQuantity(product.id, 1)}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        border: "1px solid rgba(191,145,79,0.22)",
                        background: "#111827",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        borderRadius: "12px",
                        border: "none",
                        background:
                          "linear-gradient(180deg, #d7aa63 0%, #bf914f 100%)",
                        color: "#111827",
                        cursor: "pointer",
                        fontWeight: "800",
                        fontSize: "15px",
                        boxShadow: "0 8px 18px rgba(191,145,79,0.22)"
                      }}
                    >
                      담기
                    </button>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        borderRadius: "12px",
                        border: "1px solid rgba(191,145,79,0.24)",
                        backgroundColor: "#111827",
                        color: "#f8fafc",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px"
                      }}
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside
            style={{
              position: "sticky",
              top: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,24,39,0.92) 0%, rgba(17,24,39,0.98) 100%)",
                  border: "1px solid rgba(191,145,79,0.22)",
                  borderRadius: "18px",
                  padding: "16px",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.18)"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#111827",
                    border: "1px solid rgba(191,145,79,0.16)"
                  }}
                >
                  <img
                    src={axePosterImage}
                    alt="AXE 신규 인원 모집"
                    style={{
                      width: "100%",
                      display: "block"
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,24,39,0.92) 0%, rgba(17,24,39,0.98) 100%)",
                  borderRadius: "18px",
                  border: "1px solid rgba(191,145,79,0.22)",
                  padding: "20px",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.18)"
                }}
              >
                <h2
                  style={{
                    margin: "0 0 18px 0",
                    fontSize: "24px",
                    fontWeight: "800",
                    letterSpacing: "-0.03em"
                  }}
                >
                  장바구니
                </h2>

                {cart.length === 0 && (
                  <div
                    style={{
                      color: "#9ca3af",
                      lineHeight: 1.7
                    }}
                  >
                    장바구니가 비어 있습니다.
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px"
                      }}
                    >
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            paddingBottom: "14px",
                            borderBottom: "1px solid rgba(191,145,79,0.14)"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: "12px",
                              marginBottom: "8px"
                            }}
                          >
                            <div
                              className="notranslate"
                              style={{
                                fontWeight: "800",
                                fontSize: "15px",
                                flex: 1
                              }}
                            >
                              {item.name}
                            </div>

                            <button
                              onClick={() => removeCartItem(item.id)}
                              style={{
                                padding: "6px 10px",
                                borderRadius: "8px",
                                border: "1px solid #4b5563",
                                background: "#111827",
                                color: "#f87171",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "700"
                              }}
                            >
                              삭제
                            </button>
                          </div>

                          <div
                            style={{
                              color: "#d1d5db",
                              fontSize: "14px",
                              marginBottom: "12px"
                            }}
                          >
                            {item.quantity}세트 · {formatPrice(item.price * item.quantity)}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px"
                            }}
                          >
                            <button
                              onClick={() => changeCartQuantity(item.id, -1)}
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                border: "1px solid rgba(191,145,79,0.22)",
                                background: "#111827",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "18px"
                              }}
                            >
                              -
                            </button>

                            <div
                              style={{
                                flex: 1,
                                minWidth: "56px",
                                textAlign: "center",
                                fontWeight: "700",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                backgroundColor: "#111827",
                                border: "1px solid rgba(191,145,79,0.12)"
                              }}
                            >
                              {item.quantity}세트
                            </div>

                            <button
                              onClick={() => changeCartQuantity(item.id, 1)}
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                border: "1px solid rgba(191,145,79,0.22)",
                                background: "#111827",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "18px"
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <div
                        style={{
                          marginBottom: "8px",
                          color: "#d1d5db"
                        }}
                      >
                        총 세트 수: {totalSets}세트
                      </div>

                      <div
                        style={{
                          marginBottom: "18px",
                          color: "#d8a95e",
                          fontWeight: "800",
                          fontSize: "26px",
                          letterSpacing: "-0.02em"
                        }}
                      >
                        총액: {formatPrice(totalPrice)}
                      </div>

                      <button
                        onClick={() => setShowOrderForm(true)}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          fontSize: "17px",
                          borderRadius: "12px",
                          border: "none",
                          background:
                            "linear-gradient(180deg, #d7aa63 0%, #bf914f 100%)",
                          color: "#111827",
                          cursor: "pointer",
                          fontWeight: "800",
                          boxShadow: "0 8px 18px rgba(191,145,79,0.22)"
                        }}
                      >
                        주문 접수
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>

        {selectedProduct && (
          <div
            onClick={() => setSelectedProduct(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.76)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 999
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "940px",
                background:
                  "linear-gradient(180deg, rgba(12,18,30,0.98) 0%, rgba(17,24,39,0.98) 100%)",
                border: "1px solid rgba(191,145,79,0.22)",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0,0,0,0.4)"
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#0b1220",
                    minHeight: "520px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    borderRight: "1px solid rgba(191,145,79,0.12)"
                  }}
                >
                  <img
                    src={selectedProduct.detailImage}
                    alt={selectedProduct.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                <div style={{ padding: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "20px",
                      marginBottom: "20px"
                    }}
                  >
                    <h2
                      className="notranslate"
                      style={{
                        margin: 0,
                        fontSize: "34px",
                        fontWeight: "800",
                        letterSpacing: "-0.03em"
                      }}
                    >
                      {selectedProduct.name}
                    </h2>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "1px solid rgba(191,145,79,0.18)",
                        background: "#1f2937",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#1f2937",
                      border: "1px solid rgba(191,145,79,0.16)",
                      borderRadius: "14px",
                      padding: "16px",
                      marginBottom: "14px"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        marginBottom: "10px"
                      }}
                    >
                      기본 정보
                    </div>

                    <div style={{ lineHeight: 1.8 }}>
                      <div>1세트 {selectedProduct.setCount}ea</div>
                      <div
                        style={{
                          color: "#d8a95e",
                          fontWeight: "800",
                          fontSize: "24px"
                        }}
                      >
                        {formatPrice(selectedProduct.price)}
                      </div>
                    </div>
                  </div>

                  {selectedProduct.consumeStats &&
                    selectedProduct.consumeStats.length > 0 && (
                      <div
                        style={{
                          backgroundColor: "#1f2937",
                          border: "1px solid rgba(191,145,79,0.16)",
                          borderRadius: "14px",
                          padding: "16px",
                          marginBottom: "14px"
                        }}
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#9ca3af",
                            marginBottom: "10px"
                          }}
                        >
                          섭취 효과
                        </div>

                        <div style={{ lineHeight: 1.9 }}>
                          {selectedProduct.consumeStats.map((stat, index) => (
                            <div key={index}>
                              {stat.label}: {stat.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedProduct.buffStats &&
                    selectedProduct.buffStats.length > 0 && (
                      <div
                        style={{
                          backgroundColor: "#1f2937",
                          border: "1px solid rgba(191,145,79,0.16)",
                          borderRadius: "14px",
                          padding: "16px",
                          marginBottom: "14px"
                        }}
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#9ca3af",
                            marginBottom: "10px"
                          }}
                        >
                          버프 효과
                        </div>

                        <div style={{ lineHeight: 1.9 }}>
                          {selectedProduct.buffStats.map((stat, index) => (
                            <div key={index}>
                              {stat.label}: {stat.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div
                    style={{
                      backgroundColor: "#1f2937",
                      border: "1px solid rgba(191,145,79,0.16)",
                      borderRadius: "14px",
                      padding: "16px",
                      marginBottom: "20px"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        marginBottom: "10px"
                      }}
                    >
                      설명
                    </div>

                    <div
                      style={{
                        lineHeight: 1.8,
                        color: "#d1d5db"
                      }}
                    >
                      {selectedProduct.description}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      style={{
                        flex: 1,
                        padding: "13px 16px",
                        borderRadius: "12px",
                        border: "none",
                        background:
                          "linear-gradient(180deg, #d7aa63 0%, #bf914f 100%)",
                        color: "#111827",
                        cursor: "pointer",
                        fontWeight: "800",
                        fontSize: "16px"
                      }}
                    >
                      담기
                    </button>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      style={{
                        flex: 1,
                        padding: "13px 16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(191,145,79,0.24)",
                        background: "#111827",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "16px"
                      }}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showOrderForm && (
          <div
            onClick={() => setShowOrderForm(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.78)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1000
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "520px",
                background:
                  "linear-gradient(180deg, rgba(12,18,30,0.98) 0%, rgba(17,24,39,0.98) 100%)",
                border: "1px solid rgba(191,145,79,0.22)",
                borderRadius: "22px",
                padding: "28px",
                boxShadow: "0 18px 40px rgba(0,0,0,0.4)"
              }}
            >
              <h2
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em"
                }}
              >
                주문 정보 입력
              </h2>

              <p style={{ margin: "0 0 24px 0", color: "#9ca3af" }}>
                주문 접수를 위해 정보를 입력해 주세요.
              </p>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ marginBottom: "8px", fontWeight: "700" }}>이름</div>
                <input
                  type="text"
                  value={orderInfo.customerName}
                  onChange={(e) =>
                    setOrderInfo((prev) => ({
                      ...prev,
                      customerName: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(191,145,79,0.18)",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    fontSize: "15px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ marginBottom: "8px", fontWeight: "700" }}>
                  인게임 연락처
                </div>
                <input
                  type="text"
                  value={orderInfo.contact}
                  onChange={(e) =>
                    setOrderInfo((prev) => ({
                      ...prev,
                      contact: e.target.value
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(191,145,79,0.18)",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    fontSize: "15px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ marginBottom: "8px", fontWeight: "700" }}>
                  메모 (선택)
                </div>
                <textarea
                  value={orderInfo.memo}
                  onChange={(e) =>
                    setOrderInfo((prev) => ({
                      ...prev,
                      memo: e.target.value
                    }))
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(191,145,79,0.18)",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    fontSize: "15px",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={submitOrder}
                  disabled={
                    isSubmitting ||
                    orderInfo.customerName.trim() === "" ||
                    orderInfo.contact.trim() === ""
                  }
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor:
                      isSubmitting ||
                      orderInfo.customerName.trim() === "" ||
                      orderInfo.contact.trim() === ""
                        ? "#6b7280"
                        : "#bf914f",
                    color: "#111827",
                    cursor:
                      isSubmitting ||
                      orderInfo.customerName.trim() === "" ||
                      orderInfo.contact.trim() === ""
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: "800",
                    fontSize: "16px"
                  }}
                >
                  {isSubmitting ? "전송 중..." : "주문 접수"}
                </button>

                <button
                  onClick={() => setShowOrderForm(false)}
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(191,145,79,0.24)",
                    background: "#111827",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "16px"
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {orderComplete && (
          <div
            onClick={() => setOrderComplete(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.78)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1001
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "420px",
                background:
                  "linear-gradient(180deg, rgba(12,18,30,0.98) 0%, rgba(17,24,39,0.98) 100%)",
                border: "1px solid rgba(191,145,79,0.22)",
                borderRadius: "22px",
                padding: "28px",
                textAlign: "center",
                boxShadow: "0 18px 40px rgba(0,0,0,0.4)"
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "28px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em"
                }}
              >
                주문이 접수되었습니다.
              </h2>

              <p
                style={{
                  margin: "0 0 24px 0",
                  color: "#9ca3af",
                  lineHeight: 1.7
                }}
              >
                확인 후 연락드리겠습니다.
              </p>

              <button
                onClick={() => setOrderComplete(false)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    "linear-gradient(180deg, #d7aa63 0%, #bf914f 100%)",
                  color: "#111827",
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "16px"
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
