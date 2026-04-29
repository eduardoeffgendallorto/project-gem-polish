import { useEffect, useState, useCallback } from "react";

export type CartItem = {
  id: string;
  nome: string;
  cor: string;
  opcao: string;
  preco: number;
  imagem: string;
};

const STORAGE_KEY = "victorandrade:cart";
const EVENT = "victorandrade:cart-changed";

const read = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const write = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : read()
  );

  useEffect(() => {
    const sync = () => setItems(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((item: CartItem) => {
    const next = [...read(), item];
    write(next);
  }, []);

  const remove = useCallback((index: number) => {
    const next = read().filter((_, i) => i !== index);
    write(next);
  }, []);

  const clear = useCallback(() => write([]), []);

  const total = items.reduce((s, i) => s + i.preco, 0);
  const count = items.length;

  return { items, add, remove, clear, total, count };
}
