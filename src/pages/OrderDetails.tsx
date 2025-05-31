// src/pages/OrderDetails.tsx

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

  if (loading) return <div className="p-4">جاري التحميل...</div>;
  if (!order) return <div className="p-4 text-red-600">لم يتم العثور على الطلب.</div>;

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">تفاصيل الطلب رقم {order.id}</h1>

        <div className="bg-white p-4 rounded shadow">
          <p><strong>العنوان:</strong> {order.address}</p>
          <p><strong>طريقة الدفع:</strong> {order.payment_method}</p>
          <p><strong>المبلغ الإجمالي:</strong> {order.total_amount} ج.م</p>
          <p><strong>الحالة:</strong> {order.status}</p>
          <p><strong>رقم التتبع:</strong> {order.tracking_number}</p>
          <p><strong>ملاحظات:</strong> {order.notes || "لا توجد"}</p>
          <p><strong>تاريخ الإنشاء:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">المنتجات</h2>
          <div className="grid gap-4">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded hover:bg-gray-50"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.slug}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.product.slug}</p>
                  <p>الكمية: {item.quantity}</p>
                  <p>السعر: {item.price} ج.م</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="/dashboard"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← العودة للوحة التحكم
        </a>
      </div>
    </div>
  );
};

export default OrderDetails;
