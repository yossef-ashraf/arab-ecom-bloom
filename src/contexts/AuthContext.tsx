
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verify token with API
      api.auth.verifyToken(token)
        .then((response) => {
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem('auth_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await api.auth.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('auth_token', response.data.token);
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `أهلاً بك ${response.data.user.firstName}`,
        });
        
        return true;
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: response.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      const response = await api.auth.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('auth_token', response.data.token);
        
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: `أهلاً بك ${response.data.user.firstName}`,
        });
        
        return true;
      } else {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: response.message || "حدث خطأ أثناء إنشاء الحساب",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    
    toast({
      title: "تم تسجيل الخروج",
      description: "نراك قريباً!",
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
