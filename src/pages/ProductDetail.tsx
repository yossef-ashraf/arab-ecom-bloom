import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductsById } from "../services/api";
import {
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Minus,
  Plus,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Book } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProductsById(Number(id))
        .then((data) => {
          setBook({
            id: data.id.toString(),
            title: data.slug,
            author: data.author ?? "مؤلف غير معروف",
            price: data.price,
            discount: data.sale_price < data.price,
            discountPrice: data.sale_price,
            category: data.categories?.[0]?.data ?? "غير مصنف",
            category_id: data.categories?.[0]?.id ?? 12,
            image:
              data.image_url ??
              "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
            rating: 4.5, // default if backend doesn't provide rating
            description: data.description ?? "لا يوجد وصف",
            isbn: data.isbn ?? "غير متوفر",
            publisher: data.publisher ?? "غير معروف",
            publicationDate: data.publication_date ?? "غير معروف",
            language: data.language ?? "العربية",
            pageCount: data.page_count ?? 0,
            format: data.format ?? "pdf",
            fileSize: data.file_size ?? "غير معروف",
            inStock: data.stock_status === "in_stock",
          });
        })
        .catch((err) => {
          console.error(err);
          setError("تعذر تحميل بيانات المنتج");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity((q) => q - 1);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (book) {
      addToCart(book, quantity);
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري تحميل المنتج...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "المنتج غير موجود"}
      </div>
    );
  }

  const discountPercentage = book.discount
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  const images = [book.image, book.image, book.image, book.image];

  const specifications = [
    { name: "الناشر", value: book.publisher },
    { name: "تاريخ النشر", value: book.publicationDate },
    { name: "اللغة", value: book.language },
    { name: "عدد الصفحات", value: book.pageCount.toString() },
    { name: "الصيغة", value: book.format.toUpperCase() },
    { name: "حجم الملف", value: book.fileSize },
    { name: "ISBN", value: book.isbn },
  ];

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
                
                  to={`/categories/${book.category_id}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {book.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">{book.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={images[activeImage]}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md border-2 ${
                      activeImage === index
                        ? "border-blue-900"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${book.title} - صورة ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">بقلم: {book.author}</p>

              <div className="flex items-center mb-4">
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({book.rating})</span>
              </div>

              <div className="mb-6">
                {book.discount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-red-500 ml-3">
                      {book.discountPrice} جنيه
                    </span>
                    <span className="text-xl text-gray-500 line-through ml-3">
                      {book.price} جنيه
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      خصم {discountPercentage}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-blue-900">
                    {book.price} جنيه
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{book.description}</p>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 ml-3">الحالة:</span>
                  {book.inStock ? (
                    <span className="text-green-600 font-medium">متوفر</span>
                  ) : (
                    <span className="text-red-600 font-medium">غير متوفر</span>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="border border-gray-300 rounded-md flex items-center ml-4">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-blue-900"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-2 text-gray-800 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-blue-900"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="bg-blue-900 text-white hover:bg-blue-800 flex-1 font-bold py-6"
                  disabled={!book.inStock}
                >
                  إضافة إلى السلة
                </Button>

                <Button
                  variant="outline"
                  className="mr-3 p-3 border-gray-300 hover:bg-gray-100 hover:text-amber-600"
                  aria-label="أضف إلى المفضلة"
                >
                  <Heart size={20} />
                </Button>
              </div>

              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center text-gray-700">
                  <Truck size={20} className="ml-3 text-amber-600" />
                  <span>شحن مجاني للطلبات فوق 200 جنيه</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Shield size={20} className="ml-3 text-amber-600" />
                  <span>ضمان جودة المنتج</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ArrowLeft size={20} className="ml-3 text-amber-600" />
                  <span>إرجاع مجاني خلال 14 يوم</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="specifications">
              <TabsList className="mb-6">
                <TabsTrigger value="specifications">المواصفات</TabsTrigger>
                <TabsTrigger value="description">الوصف</TabsTrigger>
              </TabsList>

              <TabsContent
                value="specifications"
                className="p-6 bg-white rounded-md shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex border-b border-gray-100 py-3"
                    >
                      <span className="font-medium text-gray-600 ml-3 min-w-[120px]">
                        {spec.name}:
                      </span>
                      <span className="text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="description"
                className="p-6 bg-white rounded-md shadow-sm"
              >
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
