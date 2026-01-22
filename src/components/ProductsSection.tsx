import { ShoppingBag } from "lucide-react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import useProducts from "@/hooks/useProducts";

const ProductsSection = () => {
  const { products } = useProducts();

  return (
    <section className="fade-in stagger-2">
      <h2 className="section-title justify-center">
        <ShoppingBag className="w-6 h-6 text-gold" />
        <span>Produtos que indicamos</span>
      </h2>

      <div className="space-y-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            platform={product.platform}
            url={product.url}
            delay={0.3 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
