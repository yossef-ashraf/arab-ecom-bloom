
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { id: 1, name: "إلكترونيات", slug: "electronics" },
    { id: 2, name: "ملابس", slug: "clothing" },
    { id: 3, name: "كتب", slug: "books" },
    { id: 4, name: "أثاث", slug: "furniture" },
    { id: 5, name: "هدايا", slug: "gifts" },
  ];

  return (
    <nav className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-bloom-navy">
            بلوم<span className="text-bloom-gold">ستور</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-bloom-gold transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/login" className="text-gray-700 hover:text-bloom-gold">
              <User size={24} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-bloom-gold relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-bloom-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex items-center mb-4">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" className="mr-2">
                <Search size={18} />
              </Button>
            </div>

            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="text-gray-700 hover:text-bloom-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
