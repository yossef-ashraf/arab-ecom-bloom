
/**
 * توثيق API لمشروع متجر التجميل
 * هذا الملف يحتوي على مستندات JSON بتنسيق Postman لجميع نقاط النهاية (endpoints) المستخدمة في التطبيق
 * يمكن استخدام هذه المستندات لإنشاء باك إند حقيقي أو لاختبار الواجهات باستخدام Postman
 */

export const apiDocumentation = {
  info: {
    name: "Beauty Store API Documentation",
    version: "1.0.0",
    description: "API documentation for the Beauty Store application"
  },
  endpoints: [
    {
      name: "GET /products",
      description: "جلب جميع المنتجات",
      request: {
        method: "GET",
        url: "{{baseUrl}}/products",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطر بلوم الفاخر",
            price: 450,
            discount: true,
            discountPrice: 380,
            category: "عطور",
            image: "https://example.com/image1.jpg",
            rating: 4.8,
            description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
            stock: 15
          }
          // ... المزيد من المنتجات
        ],
        headers: {
          "Content-Type": "application/json"
        }
      }
    },
    {
      name: "GET /products/:id",
      description: "جلب منتج معين بواسطة المعرف",
      request: {
        method: "GET",
        url: "{{baseUrl}}/products/1",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: {
          id: "1",
          name: "عطر بلوم الفاخر",
          price: 450,
          discount: true,
          discountPrice: 380,
          category: "عطور",
          image: "https://example.com/image1.jpg",
          rating: 4.8,
          description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
          stock: 15
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    },
    {
      name: "GET /products/category/:category",
      description: "جلب المنتجات حسب الفئة",
      request: {
        method: "GET",
        url: "{{baseUrl}}/products/category/عطور",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطر بلوم الفاخر",
            price: 450,
            discount: true,
            discountPrice: 380,
            category: "عطور",
            image: "https://example.com/image1.jpg",
            rating: 4.8,
            description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
            stock: 15
          }
          // ... المزيد من المنتجات في نفس الفئة
        ],
        headers: {
          "Content-Type": "application/json"
        }
      }
    },
    {
      name: "GET /products/search/:query",
      description: "البحث عن منتجات",
      request: {
        method: "GET",
        url: "{{baseUrl}}/products/search/عطر",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطر بلوم الفاخر",
            price: 450,
            discount: true,
            discountPrice: 380,
            category: "عطور",
            image: "https://example.com/image1.jpg",
            rating: 4.8,
            description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
            stock: 15
          }
          // ... نتائج البحث الأخرى
        ],
        headers: {
          "Content-Type": "application/json"
        }
      }
    },
    {
      name: "GET /products/featured",
      description: "جلب المنتجات المميزة",
      request: {
        method: "GET",
        url: "{{baseUrl}}/products/featured",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطر بلوم الفاخر",
            price: 450,
            discount: true,
            discountPrice: 380,
            category: "عطور",
            image: "https://example.com/image1.jpg",
            rating: 4.8,
            description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
            stock: 15
          }
          // ... المزيد من المنتجات المميزة
        ],
        headers: {
          "Content-Type": "application/json"
        }
      }
    },
    {
      name: "POST /auth/login",
      description: "تسجيل دخول المستخدم",
      request: {
        method: "POST",
        url: "{{baseUrl}}/auth/login",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          email: "user@example.com",
          password: "password123"
        }
      },
      response: {
        status: 200,
        body: {
          success: true,
          message: "تم تسجيل الدخول بنجاح",
          userData: {
            id: "1",
            email: "user@example.com",
            firstName: "مستخدم",
            lastName: "تجريبي",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "البريد الإلكتروني غير مسجل"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "كلمة المرور غير صحيحة"
          }
        }
      ]
    },
    {
      name: "POST /auth/register",
      description: "تسجيل مستخدم جديد",
      request: {
        method: "POST",
        url: "{{baseUrl}}/auth/register",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          email: "newuser@example.com",
          password: "newpassword123",
          firstName: "مستخدم",
          lastName: "جديد"
        }
      },
      response: {
        status: 201,
        body: {
          success: true,
          message: "تم إنشاء الحساب بنجاح",
          userData: {
            id: "2",
            email: "newuser@example.com",
            firstName: "مستخدم",
            lastName: "جديد",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 400,
          body: {
            success: false,
            message: "البريد الإلكتروني مسجل مسبقًا"
          }
        },
        {
          status: 400,
          body: {
            success: false,
            message: "جميع الحقول مطلوبة"
          }
        }
      ]
    },
    {
      name: "POST /orders/create",
      description: "إنشاء طلب جديد",
      request: {
        method: "POST",
        url: "{{baseUrl}}/orders/create",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        },
        body: {
          cartItems: [
            {
              id: "1",
              name: "عطر بلوم الفاخر",
              price: 450,
              discount: true,
              discountPrice: 380,
              category: "عطور",
              image: "https://example.com/image1.jpg",
              rating: 4.8,
              description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
              stock: 15,
              quantity: 2
            }
            // ... المزيد من المنتجات في السلة
          ],
          totalAmount: 760,
          shippingAddress: {
            name: "محمد أحمد",
            street: "شارع الملك فهد",
            city: "الرياض",
            zipCode: "12345",
            phone: "0501234567"
          },
          paymentMethod: "بطاقة ائتمان"
        }
      },
      response: {
        status: 201,
        body: {
          success: true,
          message: "تم إنشاء الطلب بنجاح",
          orderId: "ORD-12345678"
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 400,
          body: {
            success: false,
            message: "المنتج عطر بلوم الفاخر غير متوفر بالكمية المطلوبة"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "GET /orders/history",
      description: "جلب سجل طلبات المستخدم",
      request: {
        method: "GET",
        url: "{{baseUrl}}/orders/history",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "ORD-12345678",
            date: "2025-04-01T12:00:00Z",
            status: "processing",
            total: 760,
            items: [
              {
                id: "1",
                name: "عطر بلوم الفاخر",
                price: 450,
                discount: true,
                discountPrice: 380,
                category: "عطور",
                image: "https://example.com/image1.jpg",
                rating: 4.8,
                description: "عطر فاخر...",
                stock: 15,
                quantity: 2
              }
            ],
            shippingAddress: {
              name: "محمد أحمد",
              street: "شارع الملك فهد",
              city: "الرياض",
              zipCode: "12345",
              phone: "0501234567"
            },
            paymentMethod: "بطاقة ائتمان"
          }
          // ... المزيد من الطلبات
        ],
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "GET /user/profile",
      description: "جلب معلومات المستخدم",
      request: {
        method: "GET",
        url: "{{baseUrl}}/user/profile",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: {
          id: "1",
          email: "user@example.com",
          firstName: "مستخدم",
          lastName: "تجريبي",
          phone: "0501234567",
          address: {
            street: "شارع الملك فهد",
            city: "الرياض",
            zipCode: "12345"
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "PUT /user/profile",
      description: "تحديث معلومات المستخدم",
      request: {
        method: "PUT",
        url: "{{baseUrl}}/user/profile",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        },
        body: {
          firstName: "مستخدم",
          lastName: "محدث",
          phone: "0507654321",
          address: {
            street: "شارع العليا",
            city: "الرياض",
            zipCode: "54321"
          }
        }
      },
      response: {
        status: 200,
        body: {
          success: true,
          message: "تم تحديث المعلومات بنجاح",
          userData: {
            id: "1",
            email: "user@example.com",
            firstName: "مستخدم",
            lastName: "محدث",
            phone: "0507654321",
            address: {
              street: "شارع العليا",
              city: "الرياض",
              zipCode: "54321"
            }
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "GET /payment-methods",
      description: "جلب وسائل الدفع المحفوظة للمستخدم",
      request: {
        method: "GET",
        url: "{{baseUrl}}/payment-methods",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            cardNumber: "XXXX-XXXX-XXXX-1234",
            cardHolder: "محمد أحمد",
            expiryDate: "12/25",
            isDefault: true
          },
          {
            id: "2",
            cardNumber: "XXXX-XXXX-XXXX-5678",
            cardHolder: "محمد أحمد",
            expiryDate: "09/26",
            isDefault: false
          }
        ],
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "POST /payment-methods",
      description: "إضافة وسيلة دفع جديدة",
      request: {
        method: "POST",
        url: "{{baseUrl}}/payment-methods",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        },
        body: {
          cardNumber: "4111111111111111",
          cardHolder: "محمد أحمد",
          expiryDate: "12/25",
          cvv: "123",
          isDefault: false
        }
      },
      response: {
        status: 201,
        body: {
          success: true,
          message: "تمت إضافة وسيلة الدفع بنجاح",
          paymentMethod: {
            id: "3",
            cardNumber: "XXXX-XXXX-XXXX-1111",
            cardHolder: "محمد أحمد",
            expiryDate: "12/25",
            isDefault: false
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 400,
          body: {
            success: false,
            message: "بيانات البطاقة غير صالحة"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "DELETE /payment-methods/:id",
      description: "حذف وسيلة دفع",
      request: {
        method: "DELETE",
        url: "{{baseUrl}}/payment-methods/3",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: {
          success: true,
          message: "تم حذف وسيلة الدفع بنجاح"
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 404,
          body: {
            success: false,
            message: "وسيلة الدفع غير موجودة"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "GET /wishlist",
      description: "جلب قائمة المفضلات",
      request: {
        method: "GET",
        url: "{{baseUrl}}/wishlist",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطر بلوم الفاخر",
            price: 450,
            discount: true,
            discountPrice: 380,
            category: "عطور",
            image: "https://example.com/image1.jpg",
            rating: 4.8,
            description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
            stock: 15
          }
          // ... المزيد من المنتجات المفضلة
        ],
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "POST /wishlist",
      description: "إضافة منتج إلى المفضلة",
      request: {
        method: "POST",
        url: "{{baseUrl}}/wishlist",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        },
        body: {
          productId: "2"
        }
      },
      response: {
        status: 201,
        body: {
          success: true,
          message: "تمت إضافة المنتج إلى المفضلة بنجاح"
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 400,
          body: {
            success: false,
            message: "المنتج موجود بالفعل في المفضلة"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "DELETE /wishlist/:id",
      description: "حذف منتج من المفضلة",
      request: {
        method: "DELETE",
        url: "{{baseUrl}}/wishlist/2",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
        }
      },
      response: {
        status: 200,
        body: {
          success: true,
          message: "تم حذف المنتج من المفضلة بنجاح"
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      errorResponses: [
        {
          status: 404,
          body: {
            success: false,
            message: "المنتج غير موجود في المفضلة"
          }
        },
        {
          status: 401,
          body: {
            success: false,
            message: "غير مصرح له"
          }
        }
      ]
    },
    {
      name: "GET /categories",
      description: "جلب جميع التصنيفات",
      request: {
        method: "GET",
        url: "{{baseUrl}}/categories",
        headers: {
          "Content-Type": "application/json"
        }
      },
      response: {
        status: 200,
        body: [
          {
            id: "1",
            name: "عطور",
            image: "https://example.com/categories/perfumes.jpg"
          },
          {
            id: "2",
            name: "مكياج",
            image: "https://example.com/categories/makeup.jpg"
          },
          {
            id: "3",
            name: "العناية بالبشرة",
            image: "https://example.com/categories/skincare.jpg"
          },
          {
            id: "4",
            name: "العناية بالشعر",
            image: "https://example.com/categories/haircare.jpg"
          }
        ],
        headers: {
          "Content-Type": "application/json"
        }
      }
    }
  ]
};

/**
 * ملف Postman Collection الكامل الذي يمكن استيراده مباشرة إلى Postman
 */
export const postmanCollection = {
  info: {
    _postman_id: "b5b15c9a-9c39-4e3b-8f9a-8e8e0f93a3d2",
    name: "Beauty Store API",
    description: "API endpoints for the Beauty Store application",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "Products",
      item: [
        {
          name: "Get all products",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products",
              host: ["{{baseUrl}}"],
              path: ["products"]
            }
          }
        },
        {
          name: "Get product by ID",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products/1",
              host: ["{{baseUrl}}"],
              path: ["products", "1"]
            }
          }
        },
        {
          name: "Get products by category",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products/category/عطور",
              host: ["{{baseUrl}}"],
              path: ["products", "category", "عطور"]
            }
          }
        },
        {
          name: "Search products",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products/search/عطر",
              host: ["{{baseUrl}}"],
              path: ["products", "search", "عطر"]
            }
          }
        },
        {
          name: "Get featured products",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products/featured",
              host: ["{{baseUrl}}"],
              path: ["products", "featured"]
            }
          }
        }
      ]
    },
    {
      name: "Authentication",
      item: [
        {
          name: "Login",
          request: {
            method: "POST",
            url: {
              raw: "{{baseUrl}}/auth/login",
              host: ["{{baseUrl}}"],
              path: ["auth", "login"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "user@example.com",
                password: "password123"
              })
            }
          }
        },
        {
          name: "Register",
          request: {
            method: "POST",
            url: {
              raw: "{{baseUrl}}/auth/register",
              host: ["{{baseUrl}}"],
              path: ["auth", "register"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "newuser@example.com",
                password: "newpassword123",
                firstName: "مستخدم",
                lastName: "جديد"
              })
            }
          }
        }
      ]
    },
    {
      name: "Orders",
      item: [
        {
          name: "Create order",
          request: {
            method: "POST",
            url: {
              raw: "{{baseUrl}}/orders/create",
              host: ["{{baseUrl}}"],
              path: ["orders", "create"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                cartItems: [
                  {
                    id: "1",
                    name: "عطر بلوم الفاخر",
                    price: 450,
                    discount: true,
                    discountPrice: 380,
                    category: "عطور",
                    image: "https://example.com/image1.jpg",
                    rating: 4.8,
                    description: "عطر فاخر بمزيج من الزهور والتوابل الشرقية، يدوم طويلاً ويمنحك إحساساً بالأناقة",
                    stock: 15,
                    quantity: 2
                  }
                ],
                totalAmount: 760,
                shippingAddress: {
                  name: "محمد أحمد",
                  street: "شارع الملك فهد",
                  city: "الرياض",
                  zipCode: "12345",
                  phone: "0501234567"
                },
                paymentMethod: "بطاقة ائتمان"
              })
            }
          }
        },
        {
          name: "Get order history",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/orders/history",
              host: ["{{baseUrl}}"],
              path: ["orders", "history"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        }
      ]
    },
    {
      name: "User",
      item: [
        {
          name: "Get user profile",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/user/profile",
              host: ["{{baseUrl}}"],
              path: ["user", "profile"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        },
        {
          name: "Update user profile",
          request: {
            method: "PUT",
            url: {
              raw: "{{baseUrl}}/user/profile",
              host: ["{{baseUrl}}"],
              path: ["user", "profile"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                firstName: "مستخدم",
                lastName: "محدث",
                phone: "0507654321",
                address: {
                  street: "شارع العليا",
                  city: "الرياض",
                  zipCode: "54321"
                }
              })
            }
          }
        }
      ]
    },
    {
      name: "Payment Methods",
      item: [
        {
          name: "Get payment methods",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/payment-methods",
              host: ["{{baseUrl}}"],
              path: ["payment-methods"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        },
        {
          name: "Add payment method",
          request: {
            method: "POST",
            url: {
              raw: "{{baseUrl}}/payment-methods",
              host: ["{{baseUrl}}"],
              path: ["payment-methods"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                cardNumber: "4111111111111111",
                cardHolder: "محمد أحمد",
                expiryDate: "12/25",
                cvv: "123",
                isDefault: false
              })
            }
          }
        },
        {
          name: "Delete payment method",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/payment-methods/3",
              host: ["{{baseUrl}}"],
              path: ["payment-methods", "3"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        }
      ]
    },
    {
      name: "Wishlist",
      item: [
        {
          name: "Get wishlist",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/wishlist",
              host: ["{{baseUrl}}"],
              path: ["wishlist"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        },
        {
          name: "Add to wishlist",
          request: {
            method: "POST",
            url: {
              raw: "{{baseUrl}}/wishlist",
              host: ["{{baseUrl}}"],
              path: ["wishlist"]
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                productId: "2"
              })
            }
          }
        },
        {
          name: "Remove from wishlist",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/wishlist/2",
              host: ["{{baseUrl}}"],
              path: ["wishlist", "2"]
            },
            header: [
              {
                key: "Authorization",
                value: "Bearer {{token}}"
              }
            ]
          }
        }
      ]
    },
    {
      name: "Categories",
      item: [
        {
          name: "Get all categories",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/categories",
              host: ["{{baseUrl}}"],
              path: ["categories"]
            }
          }
        }
      ]
    }
  ],
  variable: [
    {
      key: "baseUrl",
      value: "https://api.beautystore.com/v1",
      type: "string"
    },
    {
      key: "token",
      value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      type: "string"
    }
  ]
};

/**
 * هذه الوظيفة مثال لكيفية استخدام البيانات المزيفة للمقارنة مع طلبات API الحقيقية
 * في بيئة التطوير المحلية
 */
export const mockApiResponse = (endpoint: string, method: string, requestData?: any) => {
  // تنفيذ منطق للعثور على نقطة النهاية المناسبة واسترجاع استجابة مزيفة
  const endpointData = apiDocumentation.endpoints.find(e => 
    e.name.includes(endpoint) && e.request.method === method
  );
  
  if (endpointData) {
    return {
      status: endpointData.response.status,
      data: endpointData.response.body
    };
  }
  
  return {
    status: 404,
    data: {
      success: false,
      message: "Endpoint not found"
    }
  };
};
