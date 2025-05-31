import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getOrders } from "../services/api";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const getPaymentMethodText = (method: Order['payment_method']) => {
    switch (method) {
      case 'credit_card':
        return 'بطاقة ائتمان';
      case 'cash':
        return 'الدفع عند الاستلام';
      case 'vodafone_cash':
        return 'فودافون كاش';
      case 'orange_cash':
        return 'اورنج كاش';
      case 'etisalat_cash':
        return 'اتصالات كاش';
      default:
        return method;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التسليم';
      case 'cancelled':
        return 'ملغي';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrders()
        const orders = res.data;
        const foundOrder = orders.find((o: any) => o.id === parseInt(id!));
        setOrder(foundOrder);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-700">جاري التحميل...</div>;
  if (!order) return <div className="p-6 text-center text-red-600">لم يتم العثور على الطلب.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen py-10 px-4 md:px-10 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
          <h1 className="text-3xl font-extrabold text-blue-800 border-b pb-4">تفاصيل الطلب رقم {order.id}</h1>

          {/* Order Summary */}
          <div className="bg-white shadow rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-700 mb-2">معلومات الطلب</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><span className="font-semibold">العنوان:</span> {order.address}</p>
              <p><span className="font-semibold">طريقة الدفع:</span> {getPaymentMethodText(order.payment_method)}</p>
              <p><span className="font-semibold">المبلغ الإجمالي:</span> {order.total_amount} ج.م</p>
              <p><span className="font-semibold">الحالة:</span> {getStatusText(order.status)}</p>
              <p><span className="font-semibold">رقم التتبع:</span> {order.tracking_number || "غير متوفر"}</p>
              <p><span className="font-semibold">ملاحظات:</span> {order.notes || "لا توجد"}</p>
              <p><span className="font-semibold">تاريخ الإنشاء:</span> {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">المنتجات</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border rounded-lg p-4 hover:shadow-sm transition">
                  <img
                    src={item.product.image_url || "/placeholder.png"}
                    alt={item.product.slug}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="text-gray-700">
                    <p className="font-semibold text-lg">{item.product.slug}</p>
                    <p>الكمية: {item.quantity}</p>
                    <p>السعر: {item.price} ج.م</p>
                    {item.variation && (
                      <p className="text-sm text-gray-500">النسخة: {item.variation.slug}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <a
              href="/dashboard"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ← العودة للوحة التحكم
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
