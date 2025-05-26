// src/pages/CategoryProducts.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import BookCard from '../components/product/BookCard';
import { Book } from '../types';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Products = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductsByCategory(Number(id))
        .then((products) => {
        const mapped: Book[] = products.map((product: any) => ({
          id: product.id,
          title: product.slug.replace(/-/g, ' '), // or use `product.name` if available
          author: 'مؤلف غير معروف', // default or extend API later
          price: product.price,
          discountPrice: product.sale_price,
          discount: product.price > product.sale_price,
          category: product.categories?.[0]?.data || 'غير مصنف',
          format: 'pdf', // or product.format if available
          image: product.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
      <Footer />
    </div>
  );
};

export default Products;