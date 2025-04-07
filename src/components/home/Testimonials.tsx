
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    position: "مطور برمجيات",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    text: "تجربة تسوق رائعة! المنتجات ذات جودة عالية وخدمة التوصيل سريعة وموثوقة. سأواصل التسوق من هذا المتجر بالتأكيد.",
  },
  {
    id: 2,
    name: "سارة علي",
    position: "مصممة جرافيك",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 4,
    text: "أحب تصميم الموقع وسهولة الاستخدام. الدفع آمن والمنتجات تصل بالحالة الموصوفة. تجربة ممتازة بشكل عام.",
  },
  {
    id: 3,
    name: "محمد عبدالله",
    position: "محاسب",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    text: "خدمة العملاء ممتازة! واجهت مشكلة صغيرة مع طلبي وتم حلها بسرعة وكفاءة. أوصي بهذا المتجر لجميع أصدقائي.",
  },
  {
    id: 4,
    name: "فاطمة حسن",
    position: "طبيبة",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    text: "جودة المنتجات ممتازة وتوصيل سريع. أسعار معقولة مقارنة بالمتاجر الأخرى. تجربة شراء سلسة من البداية إلى النهاية.",
  },
  {
    id: 5,
    name: "عمر خالد",
    position: "مهندس",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    text: "متجر موثوق به لشراء الإلكترونيات. اشتريت لاب توب وكان بالضبط كما هو موصوف. عروض وخصومات جيدة أيضاً.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = 3;
  const maxIndex = testimonials.length - visibleTestimonials;

  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < rating ? "text-bloom-gold fill-bloom-gold" : "text-gray-300"}
        />
      ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title">آراء العملاء</h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${activeIndex * 33.33}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full md:min-w-[33.333%] px-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ml-4"
                      />
                      <div>
                        <h4 className="font-bold text-bloom-navy">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronRight size={24} className="text-bloom-navy" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronLeft size={24} className="text-bloom-navy" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
