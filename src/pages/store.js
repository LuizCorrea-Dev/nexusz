"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "../styles/store.module.css";

const coinPackages = [
  { id: 1, amount: 500, price: "R$ 5,00" },
  { id: 2, amount: 1000, price: "R$ 10,00" },
  { id: 3, amount: 5000, price: "R$ 45,00" },
  { id: 4, amount: 10000, price: "R$ 80,00" },
  { id: 5, amount: 50000, price: "R$ 350,00" },
];

export default function Store() {
  const { data: session, status } = useSession();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("nexusz-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexusz-cart", JSON.stringify(cart));
    }
  }, [cart]);

  if (status === "loading") {
    return <p className={styles.loading}>Carregando...</p>;
  }

  const openPopup = (pack) => {
    setSelectedPackage(pack);
  };

  const closePopup = () => {
    setSelectedPackage(null);
  };

  const addToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === selectedPackage.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === selectedPackage.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...selectedPackage, quantity: 1 }];
      }
    });
    closePopup();
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove se quantidade 0
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const finishPurchase = () => {
    if (!session) {
      alert("🚫 Você precisa estar logado com Steam para finalizar a compra!");
      return;
    }
    console.log("🛒 Finalizar compra", cart);
    alert(
      `Compra finalizada para ${session.user.name}! Total de itens: ${cart.length}`
    );
    setCart([]);
    localStorage.removeItem("nexusz-cart");
  };

  const calculateTotal = () => {
    return cart
      .reduce((acc, item) => {
        const numericPrice = parseFloat(
          item.price.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return acc + numericPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.storeContainer}>
      <h1>🛒 Loja NZCoin</h1>
      {session && (
        <p>
          Bem-vindo {session.user.name}! (SteamID: {session.user.id})
        </p>
      )}
      {!session && (
        <p className={styles.notice}>
          ⚠️ Faça login com Steam para finalizar a compra!
        </p>
      )}
      <div className={styles.content}>
        {/* Cards */}
        <div className={styles.cards}>
          {coinPackages.map((pack) => (
            <div
              key={pack.id}
              className={styles.card}
              onClick={() => openPopup(pack)}
            >
              <h2>{pack.amount} NZCoins</h2>
              <p className={styles.price}>{pack.price}</p>
            </div>
          ))}
        </div>

        {/* Carrinho */}
        <div className={styles.cart}>
          <h2>🛒 Carrinho</h2>
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.amount} NZCoins - {item.price}
                    <div className={styles.quantityControls}>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              <p className={styles.total}>Total: R$ {calculateTotal()}</p>
              <button
                className={styles.finishButton}
                onClick={finishPurchase}
                disabled={!session}
              >
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      </div>

      {/* Popup */}
      {selectedPackage && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h2>Pacote {selectedPackage.amount} NZCoins</h2>
            <p>Valor: {selectedPackage.price}</p>
            <p>Ideal para upgrades, crafts raros e compras exclusivas!</p>
            <button className={styles.addToCart} onClick={addToCart}>
              Adicionar ao Carrinho
            </button>
            <button className={styles.closeButton} onClick={closePopup}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
