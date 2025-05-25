
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bloom-navy text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-bloom-gold">متجر بلوم</h3>
            <p className="text-gray-300 mb-4">
              متجرك الإلكتروني الأول لجميع احتياجاتك. نقدم منتجات عالية الجودة بأسعار تنافسية مع خدمة عملاء متميزة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-bloom-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-bloom-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-bloom-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-bloom-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-bloom-gold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-bloom-gold transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/categories/offers" className="text-gray-300 hover:text-bloom-gold transition-colors">العروض</Link>
              </li>
              <li>
                <Link to="/categories/new-arrivals" className="text-gray-300 hover:text-bloom-gold transition-colors">وصل حديثاً</Link>
              </li>
              <li>
                <Link to="/categories/best-sellers" className="text-gray-300 hover:text-bloom-gold transition-colors">الأكثر مبيعاً</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-bloom-gold">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-bloom-gold transition-colors">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-bloom-gold transition-colors">سياسة الشحن</Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-300 hover:text-bloom-gold transition-colors">سياسة الإرجاع</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-bloom-gold transition-colors">الأسئلة الشائعة</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-bloom-gold">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={18} className="ml-2 text-bloom-gold" />
              <span className="text-gray-300">شارع الملك فيصل، الجيزة، مصر</span>              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2 text-bloom-gold" />
                <span className="text-gray-300">+966 12 345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-2 text-bloom-gold" />
                <span className="text-gray-300">info@bloomstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} متجر بلوم. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
