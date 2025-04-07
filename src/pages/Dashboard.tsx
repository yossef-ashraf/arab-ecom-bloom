
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserCircle, Package, Heart, CreditCard, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import OrderHistory from "@/components/dashboard/OrderHistory";
import Wishlist from "@/components/dashboard/Wishlist";
import PaymentMethods from "@/components/dashboard/PaymentMethods";
import AccountSettings from "@/components/dashboard/AccountSettings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const { user, isAuthenticated, logout } = useAuth();
  
  // إذا لم يكن المستخدم مسجل، قم بتوجيهه إلى صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // تحديد المكون النشط بناءً على التبويب المحدد
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} />;
      case "orders":
        return <OrderHistory />;
      case "wishlist":
        return <Wishlist />;
      case "payment":
        return <PaymentMethods />;
      case "settings":
        return <AccountSettings user={user} />;
      default:
        return <ProfileInfo user={user} />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-bloom-navy mb-8">لوحة التحكم</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* القائمة الجانبية */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-bloom-navy/10 rounded-full flex items-center justify-center mb-4">
                    <UserCircle className="w-12 h-12 text-bloom-navy" />
                  </div>
                  <h2 className="text-lg font-bold">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveTab("profile")} 
                    className={`w-full flex items-center px-4 py-3 text-right rounded-md transition-colors ${
                      activeTab === "profile" ? "bg-bloom-navy text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <UserCircle className="ml-3 w-5 h-5" />
                    <span>الملف الشخصي</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("orders")} 
                    className={`w-full flex items-center px-4 py-3 text-right rounded-md transition-colors ${
                      activeTab === "orders" ? "bg-bloom-navy text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Package className="ml-3 w-5 h-5" />
                    <span>الطلبات</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("wishlist")} 
                    className={`w-full flex items-center px-4 py-3 text-right rounded-md transition-colors ${
                      activeTab === "wishlist" ? "bg-bloom-navy text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Heart className="ml-3 w-5 h-5" />
                    <span>المفضلة</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("payment")} 
                    className={`w-full flex items-center px-4 py-3 text-right rounded-md transition-colors ${
                      activeTab === "payment" ? "bg-bloom-navy text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard className="ml-3 w-5 h-5" />
                    <span>طرق الدفع</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("settings")} 
                    className={`w-full flex items-center px-4 py-3 text-right rounded-md transition-colors ${
                      activeTab === "settings" ? "bg-bloom-navy text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="ml-3 w-5 h-5" />
                    <span>الإعدادات</span>
                  </button>
                  
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center px-4 py-3 text-right rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="ml-3 w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* محتوى التبويب النشط */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {renderActiveTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
