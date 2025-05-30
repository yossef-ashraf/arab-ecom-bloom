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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Book } from "@/types";

interface Variation {
  id: number;
  slug: string;
  product_id: number;
  price: number;
  sale_price: number;
  stock_status: string;
  stock_qty: number;
  sku: string;
}

interface ProductData {
  id: number;
  slug: string;
  author: string;
  description: string | null;
  type: "simple" | "variable";
  sku: string;
  price: number;
  image: string;
  sale_price: number;
  stock_status: string;
  stock_qty: number;
  total_sales: number;
  image_url: string;
  categories: Array<{
    id: number;
    data: string;
  }>;
  variations?: Variation[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProductsById(Number(id))
        .then((data) => {
          setProduct(data);
          if (data.type === "variable" && data.variations && data.variations.length > 0) {
            setSelectedVariation(data.variations[0]);
          }
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
    if (product) {
      const bookData: Book = {
        id: product.id.toString(),
        title: product.slug,
        author: product.author ?? "مؤلف غير معروف",
        price: selectedVariation?.price ?? product.price,
        discount: selectedVariation 
          ? selectedVariation.sale_price < selectedVariation.price
          : product.sale_price < product.price,
        discountPrice: selectedVariation?.sale_price ?? product.sale_price,
        category: product.categories?.[0]?.data ?? "غير مصنف",
        category_id: product.categories?.[0]?.id ?? 12,
        image: product.image_url ?? null,
        rating: 4.5,
        description: product.description ?? "ليس هنالك وصف",
        isbn: product.sku,
        publisher: product.author ?? "غير معروف",
        publicationDate: "غير معروف",
        language: "العربية",
        pageCount: 0,
        format: "pdf",
        fileSize: "غير معروف",
        inStock: selectedVariation 
          ? selectedVariation.stock_status === "in_stock"
          : product.stock_status === "in_stock",
      };
      addToCart(bookData, quantity);
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      handleAddToCart();
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

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "المنتج غير موجود"}
      </div>
    );
  }

  const currentPrice = selectedVariation?.price ?? product.price;
  const currentSalePrice = selectedVariation?.sale_price ?? product.sale_price;
  const hasDiscount = currentSalePrice < currentPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((currentPrice - currentSalePrice) / currentPrice) * 100)
    : 0;

  // const images = [product.image_url];
  const images = [];
  
  const specifications = [
    { name: "الرقم التسلسلي", value: product.sku },
    { name: "المؤلف", value: product.author },
    { name: "الفئة", value: product.categories?.[0]?.data ?? "غير مصنف" },
    { name: "حالة المخزون", value: selectedVariation 
      ? (selectedVariation.stock_status === "in_stock" ? "متوفر" : "غير متوفر")
      : (product.stock_status === "in_stock" ? "متوفر" : "غير متوفر")
    },
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
                  to={`/categories/${product.categories?.[0]?.id}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.categories?.[0]?.data ?? "غير مصنف"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.slug}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  // src={images[activeImage]}
                  src={product.image_url}
                  alt={product.slug}
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
                      alt={`${product.slug} - صورة ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                {product.slug}
              </h1>
              <p className="text-lg text-gray-600 mb-4">بقلم: {product.author}</p>

              {product.type === "variable" && product.variations && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختر النسخة
                  </label>
                  <Select
                    value={selectedVariation?.id.toString()}
                    onValueChange={(value) => {
                      const variation = product.variations?.find(
                        (v) => v.id.toString() === value
                      );
                      setSelectedVariation(variation ?? null);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر النسخة" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variations.map((variation) => (
                        <SelectItem
                          key={variation.id}
                          value={variation.id.toString()}
                        >
                          {variation.slug} - {variation.price} جنيه
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mb-6">
                {hasDiscount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-red-500 ml-3">
                      {currentSalePrice} جنيه
                    </span>
                    <span className="text-xl text-gray-500 line-through ml-3">
                      {currentPrice} جنيه
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      خصم {discountPercentage}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-blue-900">
                    {currentPrice} جنيه
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">
                {product.description ?? "ليس هنالك وصف"}
              </p>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 ml-3">الحالة:</span>
                  {(selectedVariation 
                    ? selectedVariation.stock_status === "in_stock"
                    : product.stock_status === "in_stock") ? (
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
                  disabled={selectedVariation 
                    ? selectedVariation.stock_status !== "in_stock"
                    : product.stock_status !== "in_stock"
                  }
                >
                  إضافة إلى السلة
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
                  {product.description ?? "ليس هنالك وصف"}
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
