import React, { createContext, useContext, useState } from "react";
import type { ApiProduct, ApiUser, CreateProductInput } from "../services/api";
import { addProduct as apiAddProduct, fetchProducts, fetchUsers } from "../services/api";

type LoadingState = {
  users: boolean;
  products: boolean;
  addProduct: boolean;
};

type AppState = {
  users: ApiUser[];
  products: ApiProduct[];
  loading: LoadingState;
  error: string | null;
};

type AppContextValue = AppState & {
  loadUsers: () => Promise<void>;
  loadProducts: () => Promise<void>;
  loadAll: () => Promise<void>;
  addProduct: (input: CreateProductInput) => Promise<ApiProduct>;
  clearError: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    users: false,
    products: false,
    addProduct: false,
  });
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const loadUsers = async () => {
    setLoading((s) => ({ ...s, users: true }));
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading((s) => ({ ...s, users: false }));
    }
  };

  const loadProducts = async () => {
    setLoading((s) => ({ ...s, products: true }));
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading((s) => ({ ...s, products: false }));
    }
  };

  const loadAll = async () => {
    await Promise.all([loadUsers(), loadProducts()]);
  };

  const addProduct = async (input: CreateProductInput) => {
    setLoading((s) => ({ ...s, addProduct: true }));
    setError(null);
    try {
      const created = await apiAddProduct(input);
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to add product";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading((s) => ({ ...s, addProduct: false }));
    }
  };

  const value: AppContextValue = {
    users,
    products,
    loading,
    error,
    loadUsers,
    loadProducts,
    loadAll,
    addProduct,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

