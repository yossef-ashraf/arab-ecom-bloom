
import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// نوع بيانات بطاقة الدفع
interface PaymentCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

// بيانات وهمية لبطاقات الدفع
const mockCards: PaymentCard[] = [
  {
    id: "1",
    cardNumber: "4242 **** **** 4242",
    cardHolder: "محمد أحمد",
    expiryDate: "12/25",
    isDefault: true
  },
  {
    id: "2",
    cardNumber: "5555 **** **** 5555",
    cardHolder: "محمد أحمد",
    expiryDate: "10/26",
    isDefault: false
  }
];

const PaymentMethods = () => {
  const [cards, setCards] = useState<PaymentCard[]>(mockCards);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // توليد معرف فريد
    const newId = Date.now().toString();
    
    // محاكاة إخفاء رقم البطاقة ماعدا آخر 4 أرقام
    const maskedCardNumber = `${newCard.cardNumber.substring(0, 4)} **** **** ${newCard.cardNumber.slice(-4)}`;
    
    // إضافة البطاقة الجديدة
    const cardToAdd: PaymentCard = {
      id: newId,
      cardNumber: maskedCardNumber,
      cardHolder: newCard.cardHolder,
      expiryDate: newCard.expiryDate,
      isDefault: cards.length === 0 // جعل البطاقة الافتراضية إذا كانت الأولى
    };
    
    setCards(prev => [...prev, cardToAdd]);
    setNewCard({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة بطاقة الدفع بنجاح"
    });
  };

  const handleRemoveCard = (cardId: string) => {
    const cardToRemove = cards.find(card => card.id === cardId);
    
    // إذا كانت البطاقة المراد حذفها هي الافتراضية، حدد بطاقة أخرى كافتراضية
    if (cardToRemove?.isDefault && cards.length > 1) {
      const updatedCards = cards.filter(card => card.id !== cardId);
      updatedCards[0].isDefault = true;
      setCards(updatedCards);
    } else {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
    
    toast({
      title: "تم الحذف",
      description: "تم حذف بطاقة الدفع بنجاح"
    });
  };

  const setDefaultCard = (cardId: string) => {
    setCards(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === cardId
      }))
    );
    
    toast({
      title: "تم التحديث",
      description: "تم تعيين البطاقة الافتراضية بنجاح"
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-bloom-navy">طرق الدفع</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-bloom-navy">
              <Plus className="ml-1 w-4 h-4" />
              إضافة بطاقة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة بطاقة دفع جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل بطاقة الدفع لإضافتها إلى حسابك</DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddCard} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">رقم البطاقة</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={newCard.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardHolder">اسم حامل البطاقة</Label>
                <Input
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="الاسم كما يظهر على البطاقة"
                  value={newCard.cardHolder}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={handleChange}
                    required
                    maxLength={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">رمز الأمان CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="***"
                    value={newCard.cvv}
                    onChange={handleChange}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">إلغاء</Button>
                </DialogClose>
                <Button type="submit" className="bg-bloom-navy">إضافة البطاقة</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {cards.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-4">لا توجد بطاقات دفع</h3>
          <p className="text-gray-500 mb-6">لم تقم بإضافة أي بطاقات دفع حتى الآن</p>
          <Button
            className="bg-bloom-navy"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="ml-1 w-4 h-4" />
            إضافة بطاقة
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`border rounded-lg p-5 ${
                card.isDefault ? "bg-bloom-navy/5 border-bloom-navy/40" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-700 to-purple-800 p-3 rounded-md ml-4">
                    <CreditCard className="text-white" />
                  </div>
                  
                  <div>
                    <p className="font-medium">{card.cardNumber}</p>
                    <p className="text-sm text-gray-500">
                      {card.cardHolder} | تنتهي في {card.expiryDate}
                    </p>
                    {card.isDefault && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-bloom-navy/10 text-bloom-navy rounded">
                        البطاقة الافتراضية
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleRemoveCard(card.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  
                  {!card.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultCard(card.id)}
                    >
                      تعيين كافتراضية
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
