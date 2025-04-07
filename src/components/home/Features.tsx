
import { Truck, Shield, CreditCard, RotateCcw } from "lucide-react";

const features = [
  {
    id: 1,
    title: "شحن سريع",
    description: "شحن سريع ومجاني للطلبات التي تزيد عن 200 ر.س",
    icon: Truck,
  },
  {
    id: 2,
    title: "دفع آمن",
    description: "طرق دفع متعددة وآمنة لحماية معلوماتك",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "ضمان الجودة",
    description: "جميع منتجاتنا أصلية ومضمونة الجودة",
    icon: Shield,
  },
  {
    id: 4,
    title: "سهولة الإرجاع",
    description: "إرجاع مجاني خلال 14 يوماً من الاستلام",
    icon: RotateCcw,
  },
];

const Features = () => {
  return (
    <section className="py-12 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-bloom-gold/10 p-3 rounded-full ml-4">
                <feature.icon className="w-6 h-6 text-bloom-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-bloom-navy mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
