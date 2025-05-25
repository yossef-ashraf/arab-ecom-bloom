
import { Book, User, Category, Governorate } from "@/types";

// كتب وهمية لمتجر الكتب المصري
export const mockBooks: Book[] = [
  {
    id: "1",
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    price: 80,
    discount: true,
    discountPrice: 65,
    category: "روايات عربية",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    rating: 4.5,
    description: "رواية رومانسية رائعة من أحلام مستغانمي تحكي قصة حب معقدة بين شخصيات عربية أصيلة",
    isbn: "978-977-14-1234-5",
    publisher: "دار الشروق",
    publicationDate: "2023-01-15",
    language: "العربية",
    pageCount: 320,
    format: "pdf",
    fileSize: "2.5 MB",
    inStock: true
  },
  {
    id: "2",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: 120,
    discount: false,
    discountPrice: 120,
    category: "روايات عالمية",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.8,
    description: "تحفة الأدب العالمي المترجمة للعربية، رواية سحرية تحكي تاريخ عائلة بوينديا",
    isbn: "978-977-14-5678-9",
    publisher: "المركز الثقافي العربي",
    publicationDate: "2023-02-20",
    language: "العربية",
    pageCount: 450,
    format: "epub",
    fileSize: "3.2 MB",
    inStock: true
  },
  {
    id: "3",
    title: "البخاري الصحيح",
    author: "الإمام البخاري",
    price: 150,
    discount: true,
    discountPrice: 130,
    category: "كتب دينية",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
    rating: 5.0,
    description: "أصح كتاب بعد كتاب الله، مجموعة الأحاديث النبوية الصحيحة",
    isbn: "978-977-14-9012-3",
    publisher: "دار المعرفة",
    publicationDate: "2023-03-10",
    language: "العربية",
    pageCount: 800,
    format: "pdf",
    fileSize: "5.8 MB",
    inStock: true
  },
  {
    id: "4",
    title: "فيزياء الكم للمبتدئين",
    author: "د. أحمد زويل",
    price: 95,
    discount: false,
    discountPrice: 95,
    category: "كتب علمية",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    rating: 4.3,
    description: "شرح مبسط لعلم فيزياء الكم من العالم المصري الحائز على نوبل",
    isbn: "978-977-14-3456-7",
    publisher: "دار النهضة العربية",
    publicationDate: "2023-04-05",
    language: "العربية",
    pageCount: 280,
    format: "epub",
    fileSize: "4.1 MB",
    inStock: true
  },
  {
    id: "5",
    title: "تاريخ مصر الحديث",
    author: "د. محمد عبده",
    price: 110,
    discount: true,
    discountPrice: 90,
    category: "تاريخ",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    rating: 4.6,
    description: "دراسة شاملة لتاريخ مصر من القرن التاسع عشر حتى اليوم",
    isbn: "978-977-14-7890-1",
    publisher: "مكتبة الأنجلو المصرية",
    publicationDate: "2023-05-15",
    language: "العربية",
    pageCount: 520,
    format: "pdf",
    fileSize: "6.2 MB",
    inStock: true
  },
  {
    id: "6",
    title: "الطبخ المصري الأصيل",
    author: "الشيف نجلاء الشرشابي",
    price: 70,
    discount: false,
    discountPrice: 70,
    category: "كتب الطبخ",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    rating: 4.4,
    description: "أشهى الوصفات المصرية التراثية والحديثة",
    isbn: "978-977-14-2468-0",
    publisher: "دار الحياة",
    publicationDate: "2023-06-01",
    language: "العربية",
    pageCount: 200,
    format: "epub",
    fileSize: "3.5 MB",
    inStock: true
  }
];

// فئات الكتب
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "روايات عربية",
    description: "أجمل الروايات العربية الحديثة والكلاسيكية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    booksCount: 150
  },
  {
    id: "2",
    name: "كتب دينية",
    description: "كتب التفسير والفقه والسيرة النبوية",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
    booksCount: 200
  },
  {
    id: "3",
    name: "كتب علمية",
    description: "كتب الفيزياء والكيمياء والرياضيات",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    booksCount: 100
  },
  {
    id: "4",
    name: "تاريخ",
    description: "كتب التاريخ المصري والعربي والعالمي",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    booksCount: 80
  },
  {
    id: "5",
    name: "كتب الطبخ",
    description: "وصفات الطبخ المصري والعربي والعالمي",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    booksCount: 60
  },
  {
    id: "6",
    name: "روايات عالمية",
    description: "أشهر الروايات العالمية المترجمة",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    booksCount: 120
  }
];

// المحافظات المصرية
export const egyptianGovernorates: Governorate[] = [
  {
    id: "1",
    name: "القاهرة",
    cities: ["مدينة نصر", "المعادي", "حلوان", "الجيزة", "العباسية", "الزمالك", "المقطم"]
  },
  {
    id: "2",
    name: "الجيزة",
    cities: ["الدقي", "المهندسين", "فيصل", "أكتوبر", "الهرم", "إمبابة"]
  },
  {
    id: "3",
    name: "الإسكندرية",
    cities: ["المنتزه", "وسط البلد", "سموحة", "العجمي", "الأنفوشي", "المعمورة"]
  },
  {
    id: "4",
    name: "الشرقية",
    cities: ["الزقازيق", "بلبيس", "فاقوس", "أبو حماد", "منيا القمح"]
  },
  {
    id: "5",
    name: "البحيرة",
    cities: ["دمنهور", "كفر الدوار", "رشيد", "إدكو", "أبو حمص"]
  },
  {
    id: "6",
    name: "الدقهلية",
    cities: ["المنصورة", "طلخا", "ميت غمر", "السنبلاوين", "دكرنس"]
  },
  {
    id: "7",
    name: "كفر الشيخ",
    cities: ["كفر الشيخ", "دسوق", "فوه", "بيلا", "قلين"]
  }
];

// مستخدمون وهميون
export const users: User[] = [
  {
    id: "1",
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "01234567890",
    governorate: "القاهرة",
    city: "مدينة نصر",
    address: "شارع مصطفى النحاس، مدينة نصر",
    birthDate: "1990-05-15",
    gender: "male",
    createdAt: "2024-01-01T00:00:00Z",
    isActive: true
  },
  {
    id: "2",
    firstName: "فاطمة",
    lastName: "أحمد",
    email: "fatma@example.com",
    phone: "01098765432",
    governorate: "الإسكندرية",
    city: "سموحة",
    address: "شارع سموحة، الإسكندرية",
    birthDate: "1992-08-20",
    gender: "female",
    createdAt: "2024-01-15T00:00:00Z",
    isActive: true
  }
];
