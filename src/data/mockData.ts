
import { Book, Category, User, Order, Governorate, Coupon, Area, Address } from '@/types';

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    price: 120,
    discount: true,
    discountPrice: 95,
    category: "روايات عربية",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
    rating: 4.5,
    description: "رواية عربية رائعة تحكي قصة الحب والحياة في الجزائر خلال فترة الاستقلال",
    isbn: "978-9777719636",
    publisher: "دار الآداب",
    publicationDate: "2010-01-01",
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
    price: 150,
    discount: false,
    discountPrice: 150,
    category: "روايات عالمية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000",
    rating: 4.8,
    description: "رواية عالمية كلاسيكية من أدب أمريكا اللاتينية، تحكي قصة عائلة بوينديا",
    isbn: "978-9770926543",
    publisher: "دار المعارف",
    publicationDate: "2015-03-15",
    language: "العربية",
    pageCount: 450,
    format: "epub",
    fileSize: "3.2 MB",
    inStock: true
  },
  {
    id: "3",
    title: "فقه السيرة النبوية",
    author: "محمد الغزالي",
    price: 80,
    discount: true,
    discountPrice: 65,
    category: "كتب دينية",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    rating: 4.9,
    description: "دراسة معمقة في السيرة النبوية الشريفة من منظور فقهي",
    isbn: "978-9775634258",
    publisher: "دار الشروق",
    publicationDate: "2018-06-10",
    language: "العربية",
    pageCount: 280,
    format: "pdf",
    fileSize: "1.8 MB",
    inStock: true
  },
  {
    id: "4",
    title: "تاريخ مصر الحديث",
    author: "عبد الرحمن الرافعي",
    price: 200,
    discount: false,
    discountPrice: 200,
    category: "تاريخ",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000",
    rating: 4.6,
    description: "دراسة شاملة لتاريخ مصر منذ بداية القرن التاسع عشر",
    isbn: "978-9774168371",
    publisher: "مكتبة النهضة المصرية",
    publicationDate: "2020-01-15",
    language: "العربية",
    pageCount: 520,
    format: "epub",
    fileSize: "4.1 MB",
    inStock: true
  },
  {
    id: "5",
    title: "كتاب الطبخ المصري",
    author: "نادية السباعي",
    price: 90,
    discount: true,
    discountPrice: 75,
    category: "كتب الطبخ",
    image: "https://images.unsplash.com/photo-1589906168798-7c4963d3ed93?q=80&w=1000",
    rating: 4.3,
    description: "مجموعة شاملة من الوصفات المصرية التقليدية والحديثة",
    isbn: "978-9773051842",
    publisher: "دار الكتاب العربي",
    publicationDate: "2019-09-20",
    language: "العربية",
    pageCount: 350,
    format: "pdf",
    fileSize: "5.2 MB",
    inStock: true
  },
  {
    id: "6",
    title: "1984",
    author: "جورج أورويل",
    price: 110,
    discount: false,
    discountPrice: 110,
    category: "روايات عالمية",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000",
    rating: 4.7,
    description: "رواية ديستوبية كلاسيكية تتنبأ بمستقبل مخيف للإنسانية",
    isbn: "978-9770937412",
    publisher: "دار التنوير",
    publicationDate: "2017-04-25",
    language: "العربية",
    pageCount: 380,
    format: "mobi",
    fileSize: "2.9 MB",
    inStock: true
  }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "روايات عربية",
    description: "روايات من الأدب العربي الحديث والمعاصر",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000",
    booksCount: 150
  },
  {
    id: "2",
    name: "كتب دينية",
    description: "كتب في العلوم الشرعية والدراسات الإسلامية",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    booksCount: 200
  },
  {
    id: "3",
    name: "كتب علمية",
    description: "كتب في مختلف العلوم والتخصصات الأكاديمية",
    image: "https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?q=80&w=1000",
    booksCount: 180
  },
  {
    id: "4",
    name: "تاريخ",
    description: "كتب التاريخ والحضارة العربية والإسلامية",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000",
    booksCount: 120
  },
  {
    id: "5",
    name: "كتب الطبخ",
    description: "كتب الطبخ والمأكولات الشعبية والعالمية",
    image: "https://images.unsplash.com/photo-1589906168798-7c4963d3ed93?q=80&w=1000",
    booksCount: 85
  },
  {
    id: "6",
    name: "روايات عالمية",
    description: "روايات مترجمة من الأدب العالمي",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000",
    booksCount: 220
  }
];

export const egyptianGovernorates: Governorate[] = [
  {
    id: "1",
    name: "القاهرة",
    cities: ["مدينة نصر", "المعادي", "حلوان", "التجمع الخامس", "العبور", "وسط البلد", "مصر الجديدة"]
  },
  {
    id: "2", 
    name: "الجيزة",
    cities: ["الدقي", "المهندسين", "العجوزة", "الهرم", "فيصل", "أكتوبر", "الشيخ زايد"]
  },
  {
    id: "3",
    name: "الإسكندرية", 
    cities: ["وسط الإسكندرية", "سيدي بشر", "العجمي", "برج العرب", "كينج مريوط", "العامرية"]
  },
  {
    id: "4",
    name: "البحيرة",
    cities: ["دمنهور", "كفر الدوار", "رشيد", "إدكو", "الدلنجات", "كوم حمادة"]
  },
  {
    id: "5",
    name: "الغربية",
    cities: ["طنطا", "المحلة الكبرى", "كفر الزيات", "بسيون", "زفتى", "السنطة"]
  },
  {
    id: "6",
    name: "الدقهلية",
    cities: ["المنصورة", "طلخا", "دكرنس", "السنبلاوين", "منية النصر", "المطرية"]
  },
  {
    id: "7",
    name: "الشرقية",
    cities: ["الزقازيق", "بلبيس", "مشتول السوق", "ههيا", "ديرب نجم", "كفر صقر"]
  },
  {
    id: "8",
    name: "القليوبية",
    cities: ["بنها", "شبرا الخيمة", "القناطر الخيرية", "كفر شكر", "طوخ", "قليوب"]
  },
  {
    id: "9",
    name: "الفيوم",
    cities: ["الفيوم", "سنورس", "إطسا", "طامية", "يوسف الصديق", "أبشواي"]
  },
  {
    id: "10",
    name: "بني سويف",
    cities: ["بني سويف", "الواسطى", "ناصر", "ببا", "الفشن", "سمسطا"]
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minimumOrder: 100,
    expiryDate: "2024-12-31",
    isActive: true,
    usageLimit: 1000,
    usedCount: 250
  },
  {
    id: "2",
    code: "SAVE50",
    type: "fixed",
    value: 50,
    minimumOrder: 200,
    expiryDate: "2024-11-30",
    isActive: true,
    usageLimit: 500,
    usedCount: 120
  },
  {
    id: "3",
    code: "STUDENT15",
    type: "percentage",
    value: 15,
    minimumOrder: 80,
    expiryDate: "2024-12-15",
    isActive: true,
    usageLimit: 2000,
    usedCount: 890
  }
];

export const mockAreas: Area[] = [
  {
    id: "1",
    name: "مدينة نصر",
    governorate: "القاهرة",
    shippingCost: 15
  },
  {
    id: "2",
    name: "المعادي",
    governorate: "القاهرة",
    shippingCost: 20
  },
  {
    id: "3",
    name: "الدقي",
    governorate: "الجيزة",
    shippingCost: 18
  },
  {
    id: "4",
    name: "وسط الإسكندرية",
    governorate: "الإسكندرية",
    shippingCost: 25
  },
  {
    id: "5",
    name: "طنطا",
    governorate: "الغربية",
    shippingCost: 30
  }
];

export const mockAddresses: Address[] = [
  {
    id: "1",
    userId: "1",
    name: "المنزل",
    phone: "01012345678",
    governorate: "القاهرة",
    city: "المعادي",
    area: "المعادي الجديدة",
    street: "شارع 9",
    building: "رقم 15",
    floor: "الثالث",
    apartment: "شقة 7",
    isDefault: true
  },
  {
    id: "2",
    userId: "1",
    name: "العمل",
    phone: "01012345678",
    governorate: "الجيزة",
    city: "الدقي",
    area: "وسط الدقي",
    street: "شارع التحرير",
    building: "برج النيل",
    floor: "الخامس",
    apartment: "مكتب 12",
    isDefault: false
  }
];

export const mockOrders: Order[] = [
  {
    id: "1",
    userId: "1",
    orderDate: "2024-01-15T10:30:00.000Z",
    status: "delivered",
    totalAmount: 285,
    items: [
      {
        ...mockBooks[0],
        quantity: 2
      },
      {
        ...mockBooks[1],
        quantity: 1
      }
    ],
    shippingAddress: {
      governorate: "القاهرة",
      city: "المعادي",
      address: "شارع 9، رقم 15، شقة 7",
      phone: "01012345678"
    },
    paymentMethod: "vodafone_cash",
    paymentStatus: "paid",
    notes: "يرجى الاتصال قبل التسليم"
  },
  {
    id: "2",
    userId: "1",
    orderDate: "2024-01-20T14:15:00.000Z",
    status: "pending",
    totalAmount: 145,
    items: [
      {
        ...mockBooks[2],
        quantity: 1
      },
      {
        ...mockBooks[4],
        quantity: 1
      }
    ],
    shippingAddress: {
      governorate: "الجيزة",
      city: "الدقي",
      address: "شارع التحرير، برج النيل، مكتب 12",
      phone: "01012345678"
    },
    paymentMethod: "cash",
    paymentStatus: "pending"
  }
];

// Mock user for development
export const mockUser: User = {
  id: "1",
  firstName: "أحمد",
  lastName: "محمد",
  email: "ahmed@example.com",
  phone: "01012345678",
  governorate: "القاهرة",
  city: "المعادي", 
  address: "شارع 9، المعادي",
  birthDate: "1990-01-01",
  gender: "male",
  createdAt: "2024-01-01T00:00:00.000Z",
  isActive: true
};
