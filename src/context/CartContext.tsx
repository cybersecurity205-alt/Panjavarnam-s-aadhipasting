"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/lib/db/types";

export interface CartItem {
  id: string; // Unique cart item ID (can combine productId + variations if any)
  productId: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  salePrice?: number;
  image: string;
  categoryName?: string;
  quantity: number;
  specs?: string[];
  unitNote?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  savings: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product | Partial<Product>, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "aadhi_pasting_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // SSR-Safe Hydration from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from storage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to LocalStorage on item changes (only after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart to storage:", e);
    }
  }, [items, isHydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    (product: Product | Partial<Product>, quantity = 1) => {
      const prodId = product.id;
      const prodName = product.name;
      if (!prodId || !prodName) return;

      const unitPrice =
        typeof product.salePrice === "number" && product.salePrice > 0
          ? product.salePrice
          : Number(product.price) || 0;

      const effectiveQty = Math.max(1, quantity);

      setItems((prevItems) => {
        const existingIdx = prevItems.findIndex(
          (item) => item.productId === prodId
        );

        if (existingIdx >= 0) {
          // Increment quantity
          const updated = [...prevItems];
          const curr = updated[existingIdx];
          updated[existingIdx] = {
            ...curr,
            quantity: curr.quantity + effectiveQty,
          };
          return updated;
        } else {
          // Add new cart item
          const newItem: CartItem = {
            id: `item-${prodId}-${Date.now()}`,
            productId: prodId,
            name: prodName,
            slug: product.slug || "product",
            sku: product.sku || "AP-SPEC",
            price: Number(product.price) || unitPrice,
            salePrice: product.salePrice,
            image: product.image || "/images/blush/cat-wall-calendar.jpg",
            categoryName: product.categoryName || "Calendar Finishing",
            quantity: effectiveQty,
            specs: product.specs || [],
            unitNote: "Piece",
          };
          return [...prevItems, newItem];
        }
      });

      // Automatically slide open the drawer to give instant feedback
      setIsOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.productId !== productId);
      }
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Computed Values
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const activePrice =
        typeof item.salePrice === "number" && item.salePrice > 0
          ? item.salePrice
          : item.price;
      return acc + activePrice * item.quantity;
    }, 0);
  }, [items]);

  const savings = useMemo(() => {
    return items.reduce((acc, item) => {
      if (typeof item.salePrice === "number" && item.salePrice < item.price) {
        return acc + (item.price - item.salePrice) * item.quantity;
      }
      return acc;
    }, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalItems,
      subtotal,
      savings,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      totalItems,
      subtotal,
      savings,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
