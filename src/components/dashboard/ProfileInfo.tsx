
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ProfileInfoProps {
  user: User | null;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم إرسال البيانات إلى الخادم (تمثيل فقط)
    setTimeout(() => {
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث بياناتك الشخصية بنجاح",
      });
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-bloom-navy">المعلومات الشخصية</h2>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className={isEditing ? "text-gray-600" : "bg-bloom-navy"}
        >
          {isEditing ? "إلغاء التعديل" : "تعديل البيانات"}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">الاسم الأول</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">الاسم الأخير</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={true} // لا يمكن تغيير البريد الإلكتروني
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="05xxxxxxxx"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 mt-8 text-bloom-navy">عنوان الشحن</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">العنوان</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="الشارع، المبنى، الشقة"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">المدينة</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">الرمز البريدي</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-8">
            <Button type="submit" className="bg-bloom-navy w-full md:w-auto">
              حفظ التغييرات
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
