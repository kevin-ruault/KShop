import { useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart } from "../api/CartAPI";
import { DisplayCartType } from "../typescript/CartType";

export function Cart() {
  const [cart, setCart] = useState<DisplayCartType | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (token) {
      setLoading(true);
      const cartData = await getCart(token);
      if (cartData) {
        setCart(cartData);
      }
      setLoading(false);
    }
  };

  const handleAdd = async (id: string): Promise<void> => {
    if (token) {
      await addToCart(id, token);
      fetchCart();
    }
  };

  const handleRemove = async (id: string): Promise<void> => {
    if (token) {
      await removeFromCart(id, token);
      fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <>
      {loading ? (
        <p>Chargement...</p>
      ) : cart && (
        <>
          <ul>
            {cart.products.map((item, index) => (
              <li key={index}>
                <p>{item.product.title}</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <p>Quantité :</p>
                  <button onClick={() => handleRemove(item.product._id)}>-</button>
                  <p>{item.quantity.toString()}</p>
                  <button onClick={() => handleAdd(item.product._id)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {cart.totalPrice === 0 ?
            <p>Votre panier est vide</p>
            :
            <p>Prix total : {cart.totalPrice.toString()} €</p>
          }
        </>
      )}
    </>
  );
}
