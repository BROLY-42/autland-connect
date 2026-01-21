import DEFAULT_PRODUCTS, { Product, NewProduct } from "@/data/products";

const STORAGE_KEY = "products_v1";

function generateId() {
  return `prod_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

const read = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch (e) {
    // ignore
  }
  return DEFAULT_PRODUCTS;
};

const save = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    // ignore
  }
};

const getAll = (): Product[] => read();

const add = (p: NewProduct): Product => {
  const newP: Product = { id: generateId(), ...p };
  const all = [newP, ...read()];
  save(all);
  return newP;
};

const update = (id: string, changes: Partial<NewProduct>): Product[] => {
  const all = read().map((t) => (t.id === id ? { ...t, ...changes } : t));
  save(all);
  return all;
};

const remove = (id: string): Product[] => {
  const all = read().filter((t) => t.id !== id);
  save(all);
  return all;
};

// Remove and return the removed product (useful for undo)
const removeAndGet = (
  id: string
): { removed?: Product; products: Product[] } => {
  const existing = read();
  const removed = existing.find((t) => t.id === id);
  const all = existing.filter((t) => t.id !== id);
  save(all);
  return { removed, products: all };
};

const restore = (product: Product): Product[] => {
  const all = [product, ...read()];
  save(all);
  return all;
};

const reset = (): Product[] => {
  save(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
};

export default { getAll, add, update, remove, removeAndGet, restore, reset };
