
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartContext } from "./CartContextValue";

const STORAGE_KEY = "karma-cart";

function readStoredCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The cart remains usable if browser storage is unavailable.
    }
  }, [items]);

  const addToCart = useCallback(
    (product, quantity = 1, size = null, color = null) => {
      if (
        !product?.id ||
        !Number.isFinite(product.price) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return;
      }

      setItems((current) => {
        const existing = current.find(
          (item) =>
            item.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existing) {
          return current.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...current,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (id, size = null, color = null) => {
      setItems((current) =>
        current.filter(
          (item) =>
            !(
              item.id === id &&
              item.size === size &&
              item.color === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (id, quantity, size = null, color = null) => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.id === id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
