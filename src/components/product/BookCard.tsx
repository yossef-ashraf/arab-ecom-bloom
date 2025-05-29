
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Book } from "@/types";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  const discountPercentage = book.discount
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        {/* Book image */}
        <Link to={`/product/${book.id}`}>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount badge */}
        {book.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% خصم
          </div>
        )}

        {/* Format badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-blue-900 text-white">
            {book.format.toUpperCase()}
          </Badge>
        </div>

        {/* Quick actions */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-blue-900 hover:bg-amber-600 hover:text-white"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-blue-900 hover:bg-amber-600 hover:text-white"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </Button>
          </div>
        </div>

        {/* Cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="w-full bg-amber-600 text-white hover:bg-amber-700 transition-all"
            onClick={handleAddToCart}
            disabled={!book.inStock}
          >
            <ShoppingCart size={18} className="ml-2" />
            أضف إلى السلة
          </Button>
        </div>
      </div>

      {/* Book info */}
      <div className="p-4">
        <Link to={`/product/${book.id}`} className="block">
          <h3 className="font-bold text-lg text-blue-900 mb-1 hover:text-amber-600 transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">بقلم: {book.author}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 mr-1">({book.rating})</span>
          </div>

          {/* Category and format info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{book.category}</span>
            <div className="flex items-center">
              <Download size={12} className="ml-1" />
              <span>{book.fileSize}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {book.discount ? (
                <div className="flex items-center">
                  <span className="font-bold text-red-500 text-lg ml-2">
                    {book.discountPrice} جنيه
                  </span>
                  <span className="text-gray-500 line-through text-sm">
                    {book.price} جنيه
                  </span>
                </div>
              ) : (
                <span className="font-bold text-blue-900 text-lg">{book.price} جنيه</span>
              )}
            </div>
            
            {book.inStock ? (
              <span className="text-green-600 text-xs">متوفر</span>
            ) : (
              <span className="text-red-500 text-xs">غير متوفر</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
