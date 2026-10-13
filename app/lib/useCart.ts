import { useCallback, useEffect, useState } from "react";
import {
  CART_CHANGE_EVENT,
  readCart,
  type CartItem,
} from "~/lib/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(readCart());
    const sync = () => setItems(readCart());
    window.addEventListener("storage", sync);
    window.addEventListener(CART_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_CHANGE_EVENT, sync);
    };
  }, []);

  const refresh = useCallback(() => setItems(readCart()), []);

  return { items, count: items.length, mounted, refresh };
}
