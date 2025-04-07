
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Promo Banner */}
          <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1434947044245-e87712276f63?q=80&w=2070&auto=format&fit=crop')",
              }}
            ></div>
            <div className="absolute inset-0 bg-bloom-navy/60"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <span className="text-bloom-gold font-semibold mb-2">عروض محدودة</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                خصم 30% على جميع الكتب
              </h3>
              <p className="text-white/90 mb-6">اقرأ واستمتع بخصومات ضخمة على مجموعة متنوعة من الكتب</p>
              <Button
                asChild
                className="bg-bloom-gold text-bloom-navy hover:bg-bloom-sand self-start"
              >
                <Link to="/categories/books">استكشف العروض</Link>
              </Button>
            </div>
          </div>

          {/* Second Promo Banner */}
          <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1505236732171-72a5b19c4981?q=80&w=2069&auto=format&fit=crop')",
              }}
            ></div>
            <div className="absolute inset-0 bg-bloom-teal/60"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <span className="text-bloom-sand font-semibold mb-2">وصل حديثاً</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                مجموعة الإلكترونيات الجديدة
              </h3>
              <p className="text-white/90 mb-6">اكتشف أحدث المنتجات التكنولوجية لتجربة فريدة</p>
              <Button
                asChild
                className="bg-bloom-sand text-bloom-teal hover:bg-white self-start"
              >
                <Link to="/categories/electronics">اكتشف الآن</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
