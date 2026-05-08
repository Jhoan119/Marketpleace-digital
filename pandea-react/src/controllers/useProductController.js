import { useState, useMemo } from "react";
import { productService } from "../services/productService";

export function useProductController() {
  const [category, setCategory] = useState("all");
  const [query,    setQuery]    = useState("");

  const products = useMemo(() => {
    if (query.trim()) return productService.search(query);
    return productService.getByCategory(category);
  }, [category, query]);

  return { products, category, setCategory, query, setQuery };
}
