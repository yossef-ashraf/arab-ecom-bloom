
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  date_of_birth: string;
}

interface ProfileInfoProps {
  user: User | null;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "male",
    date_of_birth: user?.date_of_birth?.split('T')[0] || ""
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.profile.update('',formData);
      // if (response.status === "Success") {
      //   toast({
      //     title: "تم التحديث",
      //     description: "تم تحديث بياناتك بنجاح",
      //   });
      //   setIsEditing(false);
      // }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث البيانات",
        variant: "destructive",
      });
    }
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
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
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
              readOnly={true}
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
              placeholder="+20xxxxxxxxxx"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_birth">تاريخ الميلاد</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
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
