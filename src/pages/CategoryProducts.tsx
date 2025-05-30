// src/pages/CategoryProducts.tsx
import { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';

import { getProductsByCategory } from '../services/api';
import BookCard from '../components/product/BookCard';
import { Book } from '../types';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Products = () => {
  const [books, setBooks] = useState<Book[]>([]);  
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductsByCategory(Number(id))
       .then(({ categoryName, products }) => {
          setCategoryName(categoryName);

          const mapped: Book[] = products.map((product: any) => ({
          id: product.id,
          title: product.slug.replace(/-/g, ' '), // or use `product.name` if available
          author: product.author || 'مؤلف غير معروف', // default or extend API later
          price: product.price,
          discountPrice: product.sale_price,
          discount: product.price > product.sale_price,
          category: product.categories?.[0]?.data || 'غير مصنف',
          format: 'pdf', // or product.format if available
          image: product.image_url || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
          rating: 4.5, // default rating or enhance API later
          fileSize: '2MB', // mock or real from backend
          inStock: product.stock_status === 'in_stock',
        }));

        setBooks(mapped);
      })
      .catch((err) => console.error('Error loading books:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;


  return (
     <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 space-x-reverse">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  الرئيسية
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                
                  to={`/categories/${id}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {categoryName}
                </Link>
              </li>
            </ol>
          </nav>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;