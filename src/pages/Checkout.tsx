
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface CheckoutFormData {
  address: string;
  area_id: string;
  payment_method: "cash" | "credit_card";
  coupon_code?: string;
  notes?: string;
}

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      address: "",
      area_id: "",
      payment_method: "cash",
      coupon_code: "",
      notes: "",
    },
  });

  // Mock areas data
  const areas = [
    { id: "1", name: "المعادي", governorate: "القاهرة" },
    { id: "2", name: "مدينة نصر", governorate: "القاهرة" },
    { id: "3", name: "الزمالك", governorate: "القاهرة" },
    { id: "4", name: "المهندسين", governorate: "الجيزة" },
    { id: "5", name: "الدقي", governorate: "الجيزة" },
  ];

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    
    try {
      // Here you will implement the actual API call
      console.log("Order data:", {
        ...data,
        area_id: parseInt(data.area_id),
        items: cartItems,
        total_amount: total,
      });

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك قريباً لتأكيد الطلب",
      });

      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page or dashboard
      // navigate('/order-success');
      
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-8">إتمام الطلب</h1>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600 mb-4">سلة التسوق فارغة</p>
              <Button asChild>
                <Link to="/">العودة للتسوق</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild>
              <Link to="/cart">
                <ArrowLeft size={20} className="ml-2" />
                العودة للسلة
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-blue-900">إتمام الطلب</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">معلومات الطلب</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "العنوان مطلوب" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان بالتفصيل</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أدخل عنوانك بالتفصيل..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Area */}
                  <FormField
                    control={form.control}
                    name="area_id"
                    rules={{ required: "المنطقة مطلوبة" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المنطقة</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المنطقة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {areas.map((area) => (
                              <SelectItem key={area.id} value={area.id}>
                                {area.name} - {area.governorate}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Payment Method */}
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>طريقة الدفع</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4"
                          >
                            <div className="flex items-center space-x-2 space-x-reverse border rounded-lg p-4">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash" className="cursor-pointer flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">💰</span>
                                  <div>
                                    <p className="font-medium">الدفع عند الاستلام</p>
                                    <p className="text-sm text-gray-500">ادفع نقداً عند وصول الطلب</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse border rounded-lg p-4">
                              <RadioGroupItem value="credit_card" id="credit_card" />
                              <Label htmlFor="credit_card" className="cursor-pointer flex-1">
                                <div className="flex items-center gap-3">
                                  <CreditCard size={20} />
                                  <div>
                                    <p className="font-medium">بطاقة ائتمان</p>
                                    <p className="text-sm text-gray-500">ادفع بالبطاقة الائتمانية</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Coupon Code */}
                  <FormField
                    control={form.control}
                    name="coupon_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>كود الخصم (اختياري)</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل كود الخصم" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ملاحظات (اختياري)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أي ملاحظات خاصة بالطلب..."
                            maxLength={1000}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-lg py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => {
                  const itemPrice = item.discount ? item.discountPrice : item.price;
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{itemPrice * item.quantity} جنيه</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} جنيه</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? "مجاني" : `${shipping} جنيه`}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span>{total} جنيه</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
