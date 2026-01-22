import { useState, useCallback } from "react";
import type { Product, NewProduct } from "@/data/products";
import productsService from "@/lib/products";
import DEFAULT_PRODUCTS from "@/lib/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() =>
    productsService.getAll()
  );

  const addProduct = useCallback((p: NewProduct) => {
    const newP = productsService.add(p);
    setProducts((prev) => [newP, ...prev]);
    return newP;
  }, []);

  const updateProduct = useCallback(
    (id: string, changes: Partial<NewProduct>) => {
      const updated = productsService.update(id, changes);
      setProducts(updated);
    },
    []
  );

  const removeProduct = useCallback((id: string) => {
    const updated = productsService.remove(id);
    setProducts(updated);
  }, []);

  const resetProducts = useCallback(() => {
    const updated = productsService.reset();
    setProducts(updated);
  }, []);

  const refresh = useCallback(() => setProducts(productsService.getAll()), []);

  return {
    products,
    addProduct,
    updateProduct,
    removeProduct,
    resetProducts,
    refresh,
  } as const;
};

export default useProducts;
