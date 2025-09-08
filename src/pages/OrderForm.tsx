import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { 
  Plus, 
  Minus, 
  Save, 
  Check, 
  Truck, 
  FileText,
  Trash2
} from "lucide-react";
import { useState } from "react";

const OrderForm = () => {
  const { orderId } = useParams();
  const isEdit = !!orderId;

  const [orderItems, setOrderItems] = useState([
    { id: 1, productId: "1", productName: "Rice 5kg", price: 450, quantity: 2, total: 900 },
    { id: 2, productId: "2", productName: "Cooking Oil 1L", price: 180, quantity: 1, total: 180 }
  ]);

  const [customer, setCustomer] = useState("Ramesh Kumar");
  const [advanceAmount, setAdvanceAmount] = useState(500);

  const customers = [
    { id: "1", name: "Ramesh Kumar", business: "Kumar Traders" },
    { id: "2", name: "Priya Sharma", business: "Sharma Electronics" },
    { id: "3", name: "Arjun Singh", business: "Singh Groceries" }
  ];

  const products = [
    { id: "1", name: "Rice 5kg", price: 450, stock: 25 },
    { id: "2", name: "Cooking Oil 1L", price: 180, stock: 15 },
    { id: "3", name: "Sugar 2kg", price: 120, stock: 30 },
    { id: "4", name: "Tea 250g", price: 85, stock: 40 }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;
  const balance = total - advanceAmount;

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      productId: "",
      productName: "",
      price: 0,
      quantity: 1,
      total: 0
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'productId') {
          const product = products.find(p => p.id === value);
          if (product) {
            updated.productName = product.name;
            updated.price = product.price;
            updated.total = product.price * updated.quantity;
          }
        } else if (field === 'quantity' || field === 'price') {
          updated.total = updated.quantity * updated.price;
        }
        return updated;
      }
      return item;
    }));
  };

  return (
    <Layout 
      title={isEdit ? `Edit Order ${orderId}` : "New Order"}
      action={
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="success">
            <Check className="w-4 h-4 mr-2" />
            Confirm Order
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Customer Selection */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Select Customer</Label>
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((cust) => (
                      <SelectItem key={cust.id} value={cust.name}>
                        <div>
                          <p className="font-medium">{cust.name}</p>
                          <p className="text-sm text-muted-foreground">{cust.business}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="orderDate">Order Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order Items</CardTitle>
            <Button variant="outline" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-accent/30 rounded-lg">
                  <div className="flex-1">
                    <Select 
                      value={item.productId} 
                      onValueChange={(value) => updateItem(item.id, 'productId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ₹{product.price} • Stock: {product.stock}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-32">
                    <Label className="text-xs">Price</Label>
                    <Input 
                      type="number" 
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    />
                  </div>

                  <div className="w-24">
                    <Label className="text-xs">Qty</Label>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="w-24 text-center">
                    <Label className="text-xs">Total</Label>
                    <p className="font-semibold">₹{item.total}</p>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="advance">Advance Payment</Label>
                <Input 
                  type="number" 
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                  placeholder="Enter advance amount"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Balance to be collected: ₹{balance}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Advance:</span>
                  <span>₹{advanceAmount}</span>
                </div>
                <div className="flex justify-between font-semibold text-warning">
                  <span>Balance Due:</span>
                  <span>₹{balance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button variant="primary">
                <Check className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>
              <Button variant="success">
                <Truck className="w-4 h-4 mr-2" />
                Mark as Delivered
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderForm;