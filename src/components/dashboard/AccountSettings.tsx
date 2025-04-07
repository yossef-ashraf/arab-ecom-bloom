
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AccountSettingsProps {
  user: User | null;
}

const AccountSettings = ({ user }: AccountSettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    accountAlerts: true
  });
  
  const { toast } = useToast();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من التطابق
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        variant: "destructive"
      });
      return;
    }
    
    // محاكاة تحديث كلمة المرور
    setTimeout(() => {
      toast({
        title: "تم التحديث",
        description: "تم تغيير كلمة المرور بنجاح"
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1000);
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // محاكاة حفظ التغييرات
    setTimeout(() => {
      toast({
        title: "تم التحديث",
        description: "تم تحديث إعدادات الإشعارات بنجاح"
      });
    }, 500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-bloom-navy mb-6">إعدادات الحساب</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-bloom-navy">تغيير كلمة المرور</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="bg-bloom-navy">تغيير كلمة المرور</Button>
          </form>
        </div>
        
        <Separator className="my-10" />
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-bloom-navy">إعدادات الإشعارات</h3>
          <form onSubmit={handleNotificationSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderUpdates" className="text-base font-medium">تحديثات الطلبات</Label>
                  <p className="text-sm text-gray-500">تلقي إشعارات عند تغيير حالة طلباتك</p>
                </div>
                <Switch
                  id="orderUpdates"
                  checked={notificationSettings.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotions" className="text-base font-medium">العروض والخصومات</Label>
                  <p className="text-sm text-gray-500">تلقي إشعارات حول العروض الخاصة والتخفيضات</p>
                </div>
                <Switch
                  id="promotions"
                  checked={notificationSettings.promotions}
                  onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter" className="text-base font-medium">النشرة الإخبارية</Label>
                  <p className="text-sm text-gray-500">تلقي النشرة الإخبارية الأسبوعية بالمستجدات</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={notificationSettings.newsletter}
                  onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="accountAlerts" className="text-base font-medium">تنبيهات الحساب</Label>
                  <p className="text-sm text-gray-500">تلقي إشعارات عند تسجيل الدخول إلى حسابك أو تغيير معلوماتك</p>
                </div>
                <Switch
                  id="accountAlerts"
                  checked={notificationSettings.accountAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("accountAlerts", checked)}
                />
              </div>
            </div>
            
            <Button type="submit" className="bg-bloom-navy">حفظ التغييرات</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
