import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, RegisterRequest } from '@/types';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = api.auth.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login({ email, password });
      setUser(response.data.user);
      toast({
        title: "تم تسجيل الدخول",
        description: "مرحباً بعودتك!",
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error instanceof Error ? error.message : "يرجى التحقق من البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const response = await api.auth.register(userData);
      setUser(response.data.user);
      toast({
        title: "تم إنشاء الحساب",
        description: "مرحباً بك في متجرنا!",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error instanceof Error ? error.message : "يرجى التحقق من البيانات المدخلة",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      setUser(null);
      toast({
        title: "تم تسجيل الخروج",
        description: "نتمنى لك يوماً سعيداً!",
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};