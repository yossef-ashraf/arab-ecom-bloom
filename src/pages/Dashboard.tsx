import { useState } from "react";
import { User, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import OrderHistory from "@/components/dashboard/OrderHistory";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">لوحة التحكم</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={18} />
                الملف الشخصي
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package size={18} />
                الطلبات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileInfo user={user} />
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
