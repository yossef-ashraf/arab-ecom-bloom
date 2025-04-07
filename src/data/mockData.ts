
import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "عطر بلوم الفاخر",
    price: 450,
    discount: true,
    discountPrice: 380,
    category: "عطور",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
    stock: 15
  },
  {
    id: "2",
    name: "كريم مرطب للبشرة",
    price: 120,
    discount: false,
    discountPrice: 120,
    category: "العناية بالبشرة",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb026bf28?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    description: "كريم مرطب غني بالفيتامينات والزيوت الطبيعية لترطيب البشرة وحمايتها",
    stock: 25
  },
  {
    id: "3",
    name: "مجموعة مكياج احترافية",
    price: 350,
    discount: true,
    discountPrice: 299,
    category: "مكياج",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    description: "مجموعة مكياج متكاملة تحتوي على ظلال عيون وأحمر شفاه وكونتور بألوان متنوعة",
    stock: 10
  },
  {
    id: "4",
    name: "زيت شعر بالأرغان",
    price: 85,
    discount: false,
    discountPrice: 85,
    category: "العناية بالشعر",
    image: "https://images.unsplash.com/photo-1595034632751-0977ea4ce135?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    description: "زيت طبيعي 100% مستخلص من شجرة الأرغان المغربية لتغذية الشعر وحمايته من التقصف",
    stock: 30
  },
  {
    id: "5",
    name: "ماسك طين للوجه",
    price: 65,
    discount: false,
    discountPrice: 65,
    category: "العناية بالبشرة",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500&auto=format&fit=crop",
    rating: 4.3,
    description: "ماسك طبيعي من الطين المغربي لتنظيف البشرة وإزالة السموم",
    stock: 20
  },
  {
    id: "6",
    name: "عطر الصحراء للرجال",
    price: 420,
    discount: true,
    discountPrice: 350,
    category: "عطور",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    description: "عطر رجالي فاخر بمزيج من الخشب والمسك يدوم طويلاً",
    stock: 12
  }
];

export const categories = [
  { id: "1", name: "عطور", image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=500&auto=format&fit=crop" },
  { id: "2", name: "مكياج", image: "https://images.unsplash.com/photo-1599733594230-5cc1e6b2a3bf?q=80&w=500&auto=format&fit=crop" },
  { id: "3", name: "العناية بالبشرة", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop" },
  { id: "4", name: "العناية بالشعر", image: "https://images.unsplash.com/photo-1626015432940-420aa26132ea?q=80&w=500&auto=format&fit=crop" }
];

export const testimonials = [
  {
    id: "1",
    name: "سارة أحمد",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    comment: "منتجات رائعة وجودة عالية، سعيدة جداً بتجربتي مع هذا المتجر!",
    rating: 5
  },
  {
    id: "2",
    name: "محمد علي",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "توصيل سريع وخدمة عملاء ممتازة، أنصح الجميع بالتعامل معهم",
    rating: 4
  },
  {
    id: "3",
    name: "فاطمة خالد",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    comment: "أسعار مناسبة ومنتجات أصلية 100%، أصبح متجري المفضل للعناية بالبشرة",
    rating: 5
  }
];

export const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // في الواقع، يجب تشفير كلمات المرور
    firstName: "مستخدم",
    lastName: "تجريبي"
  }
];
