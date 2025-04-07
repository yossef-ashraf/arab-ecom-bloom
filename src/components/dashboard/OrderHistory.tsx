
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// نوع بيانات الطلب
interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

// بيانات وهمية للطلبات
const mockOrders: Order[] = [
  {
    id: "ORD-12345",
    date: "2025-03-28",
    status: "delivered",
    total: 458.99,
    items: 3
  },
  {
    id: "ORD-12346",
    date: "2025-04-01",
    status: "shipped",
    total: 129.50,
    items: 1
  },
  {
    id: "ORD-12347",
    date: "2025-04-05",
    status: "processing",
    total: 789.75,
    items: 4
  }
];

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // محاكاة جلب الطلبات من الخادم
  useEffect(() => {
    const fetchOrders = async () => {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  // تحويل حالة الطلب إلى نص عربي
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التسليم';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  // تحديد لون شارة الحالة
  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return '';
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-bloom-navy mb-6">سجل الطلبات</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-bloom-navy animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-4">لا توجد طلبات سابقة</h3>
          <p className="text-gray-500 mb-6">لم تقم بإجراء أي طلبات حتى الآن</p>
          <Button asChild className="bg-bloom-navy">
            <Link to="/">تسوق الآن</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="py-4 px-6 text-right font-medium">رقم الطلب</th>
                <th className="py-4 px-6 text-right font-medium">التاريخ</th>
                <th className="py-4 px-6 text-right font-medium">الحالة</th>
                <th className="py-4 px-6 text-right font-medium">المبلغ</th>
                <th className="py-4 px-6 text-right font-medium">عدد المنتجات</th>
                <th className="py-4 px-6 text-right font-medium">التفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-bloom-navy font-medium">{order.id}</td>
                  <td className="py-4 px-6 text-gray-600">{formatDate(order.date)}</td>
                  <td className="py-4 px-6">
                    <Badge className={`${getStatusBadgeColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 font-medium">{order.total.toFixed(2)} ر.س</td>
                  <td className="py-4 px-6">{order.items} منتج</td>
                  <td className="py-4 px-6">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-bloom-navy hover:text-bloom-navy/80"
                    >
                      <Link to={`/orders/${order.id}`}>
                        <Eye className="ml-1 w-4 h-4" />
                        عرض
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
