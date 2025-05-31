import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = Cookies.get("access_token");
        const res = await axios.get("http://localhost:8000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const orders = res.data.data;
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
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
        <h1 className="text-3xl font-extrabold text-blue-800 border-b pb-4">تفاصيل الطلب رقم {order.id}</h1>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 mb-2">معلومات الطلب</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-semibold">العنوان:</span> {order.address}</p>
            <p><span className="font-semibold">طريقة الدفع:</span> {order.payment_method}</p>
            <p><span className="font-semibold">المبلغ الإجمالي:</span> {order.total_amount} ج.م</p>
            <p><span className="font-semibold">الحالة:</span> {order.status}</p>
            <p><span className="font-semibold">رقم التتبع:</span> {order.tracking_number}</p>
            <p><span className="font-semibold">ملاحظات:</span> {order.notes || "لا توجد"}</p>
            <p><span className="font-semibold">تاريخ الإنشاء:</span> {new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">المنتجات</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center border rounded-lg p-4 hover:shadow-sm transition">
                <img
                  src={item.product.image_url}
                  alt={item.product.slug}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div className="text-gray-700">
                  <p className="font-semibold text-lg">{item.product.slug}</p>
                  <p>الكمية: {item.quantity}</p>
                  <p>السعر: {item.price} ج.م</p>
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
  );
};

export default OrderDetails;
