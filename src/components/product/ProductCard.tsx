
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.discount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        {/* Product image */}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-bloom-coral text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% خصم
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-bloom-navy hover:bg-bloom-gold hover:text-white"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-bloom-navy hover:bg-bloom-gold hover:text-white"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Button>
        </div>

        {/* Cart overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="bg-bloom-gold text-bloom-navy hover:bg-bloom-sand transition-all"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="ml-2" />
            أضف إلى السلة
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg text-bloom-navy mb-1 hover:text-bloom-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-2">{product.category}</p>
          <div className="flex items-center">
            {product.discount ? (
              <>
                <span className="font-bold text-bloom-coral ml-2">
                  {product.discountPrice} ر.س
                </span>
                <span className="text-gray-500 line-through text-sm">
                  {product.price} ر.س
                </span>
              </>
            ) : (
              <span className="font-bold text-bloom-navy">{product.price} ر.س</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
