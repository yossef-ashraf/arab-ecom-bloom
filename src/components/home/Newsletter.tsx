
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال بريدك الإلكتروني",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم الاشتراك بنجاح!",
        description: "شكراً لاشتراكك في نشرتنا الإخبارية",
      });
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-bloom-navy text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا الإخبارية</h2>
          <p className="text-white/80 mb-8">
            احصل على أحدث العروض والتخفيضات مباشرة إلى بريدك الإلكتروني
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-bloom-gold"
            />
            <Button 
              type="submit"
              className="bg-bloom-gold text-bloom-navy hover:bg-bloom-sand whitespace-nowrap"
              disabled={isLoading}
            >
              {isLoading ? "جاري الاشتراك..." : "اشترك الآن"}
            </Button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            لن نقوم بمشاركة بريدك الإلكتروني أبداً مع أطراف ثالثة
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
