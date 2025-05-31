import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderItem {
  id: number;
  product: {
    id: number;
    slug: string;
    price: number;
    sale_price: number;
    image: string | null;
  };
  variation: {
    id: number;
    slug: string;
    price: number;
    sale_price: number;
  } | null;
  quantity: number;
  price: number;
  total_amount: number;
}

interface Order {
  id: number;
  total_amount: number;
  payment_method: 'credit_card' | 'cash' | 'vodafone_cash' | 'orange_cash' | 'etisalat_cash' | "completed";
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  items: OrderItem[];
  address: string;
  shipping_cost: number;
  tracking_number?: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const response = await api.orders.getAll();
      if (response.status === 'Success') {
        setOrders(response.data);
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء جلب الطلبات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      const response = await api.orders.cancel(orderToCancel);
      if (response.status === 'Success') {
        toast({
          title: 'تم الإلغاء',
          description: 'تم إلغاء الطلب بنجاح',
        });
        // تحديث قائمة الطلبات
        await fetchOrders();
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء إلغاء الطلب',
        variant: 'destructive',
      });
    } finally {
      setOrderToCancel(null);
    }
  };

  // تحويل حالة الطلب إلى نص عربي
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

  // تحديد لون شارة الحالة
  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
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
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // تنسيق طريقة الدفع
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
                <th className="py-4 px-6 text-right font-medium">طريقة الدفع</th>
                <th className="py-4 px-6 text-right font-medium">العنوان</th>
                <th className="py-4 px-6 text-right font-medium">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-bloom-navy font-medium">#{order.id}</td>
                  <td className="py-4 px-6 text-gray-600">{formatDate(order.created_at)}</td>
                  <td className="py-4 px-6">
                    <Badge className={`${getStatusBadgeColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 font-medium">
                    {(order.total_amount + order.shipping_cost).toFixed(2)} ج.م
                    {order.shipping_cost > 0 && (
                      <span className="text-xs text-gray-500 block">
                        شامل الشحن: {order.shipping_cost} ج.م
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">{getPaymentMethodText(order.payment_method)}</td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {order.address}
                      {order.tracking_number && (
                        <div className="text-xs text-gray-500 mt-1">
                          رقم التتبع: {order.tracking_number}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
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
                      {order.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setOrderToCancel(order.id)}
                        >
                          <Trash2 className="ml-1 w-4 h-4" />
                          إلغاء
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={!!orderToCancel} onOpenChange={() => setOrderToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد إلغاء الطلب</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ لا يمكن التراجع عن هذه العملية.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              className="bg-red-600 hover:bg-red-700"
            >
              تأكيد الإلغاء
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderHistory;
