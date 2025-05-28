import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { ApiResponse, User } from "@/types";
import Cookies from 'js-cookie';

interface ProfileInfoProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfileInfo = ({ user, onUpdate }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    gender: user.gender,
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      name: user.name,
      phone: user.phone,
      gender: user.gender,
    });
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await api.profile.getUser();
      if (response.status === 'Success') {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('لم يتم العثور على رمز المصادقة');
      }

      const response = await api.profile.update(token, formData);
      
      if (response.status === 'Success') {
        // Fetch fresh user data after successful update
        await fetchUserData();
        setIsEditing(false);
        toast({
          title: 'تم التحديث بنجاح',
          description: response.message,
        });
      } else {
        throw new Error(response.message || 'فشل تحديث الملف الشخصي');
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث الملف الشخصي',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الملف الشخصي</h2>
        <Button
          variant={isEditing ? 'outline' : 'default'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'إلغاء' : 'تعديل'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            value={user.email}
            disabled
            className="bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">الجنس</Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_of_birth">تاريخ الميلاد</Label>
          <Input
            id="date_of_birth"
            value={new Date(user.date_of_birth).toLocaleDateString('ar-EG')}
            disabled
            className="bg-gray-100"
          />
        </div>

        {isEditing && (
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
