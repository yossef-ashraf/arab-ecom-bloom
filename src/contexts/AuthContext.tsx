
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // التحقق من وجود مستخدم مسجل في التخزين المحلي عند بدء التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.auth.login(email, password);
      
      if (response.success && response.userData) {
        setUser(response.userData);
        localStorage.setItem("user", JSON.stringify(response.userData));
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بك في متجرنا",
        });
        return true;
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await api.auth.register(userData);
      
      if (response.success && response.userData) {
        setUser(response.userData);
        localStorage.setItem("user", JSON.stringify(response.userData));
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "مرحبًا بك في متجرنا",
        });
        return true;
      } else {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ أثناء محاولة إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح. نراك قريبًا!",
    });
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
