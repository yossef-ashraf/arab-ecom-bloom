import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User, X, Book, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { getCategories } from '@/services/api'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]); 
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Error is already handled by AuthContext
    }
  };

  return (
    <nav className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900 flex items-center">
            <Book className="ml-2" size={28} />
            مكتبة<span className="text-amber-600">مصر</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {categories.slice(0, 7).map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                {category.data}
              </Link>
            ))}
          </div>

          {/* Search */}
          {/* <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="ابحث عن الكتب..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div> */}

          {/* Right Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="w-6 h-6 text-gray-600" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-6 h-6" />
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost">
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
            )}

            <Link to="/cart" className="text-gray-700 hover:text-amber-600 relative">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
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
                placeholder="ابحث عن الكتب..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" className="mr-2">
                <Search size={18} />
              </Button>
            </div>

            <div className="flex flex-col space-y-4">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="text-gray-700 hover:text-amber-600 transition-colors py-2"
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
