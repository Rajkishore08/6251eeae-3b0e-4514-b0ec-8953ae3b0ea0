import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Wallet, 
  CreditCard, 
  Banknote,
  RefreshCw,
  CheckCircle,
  Clock,
  Copy,
  Smartphone
} from "lucide-react";
import { useState } from "react";

const Payments = () => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [upiGenerated, setUpiGenerated] = useState(false);

  const customers = [
    { id: "1", name: "Ramesh Kumar", balance: 2450 },
    { id: "2", name: "Priya Sharma", balance: 0 },
    { id: "3", name: "Arjun Singh", balance: 1890 },
    { id: "4", name: "Meera Patel", balance: 0 }
  ];

  const recentPayments = [
    {
      id: "PAY-001",
      customer: "Ramesh Kumar",
      amount: 1500,
      method: "UPI",
      status: "success",
      date: "2024-01-15 14:30",
      reference: "UPI123456789"
    },
    {
      id: "PAY-002", 
      customer: "Arjun Singh",
      amount: 800,
      method: "Cash",
      status: "success", 
      date: "2024-01-15 12:15",
      reference: "CASH001"
    },
    {
      id: "PAY-003",
      customer: "Meera Patel",
      amount: 1200,
      method: "UPI",
      status: "pending",
      date: "2024-01-15 11:45",
      reference: "UPI987654321"
    }
  ];

  const generateUPI = () => {
    if (paymentAmount && selectedCustomer) {
      setUpiGenerated(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-success-light text-success';
      case 'pending': return 'bg-warning-light text-warning';
      case 'failed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <RefreshCw className="w-4 h-4" />;
    }
  };

  const stats = [
    {
      title: "Today's Collections",
      value: "₹8,450",
      icon: Wallet,
      color: "success"
    },
    {
      title: "UPI Payments",
      value: "₹6,200",
      icon: Smartphone,
      color: "primary"
    },
    {
      title: "Cash Payments",
      value: "₹2,250",
      icon: Banknote,
      color: "warning"
    }
  ];

  return (
    <Layout title="Payments">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${
                    stat.color === 'success' ? 'text-success' :
                    stat.color === 'primary' ? 'text-primary' :
                    'text-warning'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Collection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Collect Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upi" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upi">UPI Payment</TabsTrigger>
                  <TabsTrigger value="cash">Cash Payment</TabsTrigger>
                </TabsList>

                <TabsContent value="upi" className="space-y-4">
                  <div>
                    <Label htmlFor="customer">Select Customer</Label>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.filter(c => c.balance > 0).map((customer) => (
                          <SelectItem key={customer.id} value={customer.name}>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Outstanding: ₹{customer.balance}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Payment Amount</Label>
                    <Input 
                      type="number" 
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={generateUPI}
                    disabled={!paymentAmount || !selectedCustomer}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate UPI QR
                  </Button>

                  {upiGenerated && (
                    <div className="mt-4 p-4 bg-accent/30 rounded-lg text-center">
                      <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        UPI Payment Link
                      </p>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 text-xs bg-muted p-2 rounded">
                          upi://pay?pa=merchant@paytm&pn=KhataBook&am={paymentAmount}&cu=INR
                        </code>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="mt-2">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Check Status
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cash" className="space-y-4">
                  <div>
                    <Label htmlFor="cashCustomer">Select Customer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.filter(c => c.balance > 0).map((customer) => (
                          <SelectItem key={customer.id} value={customer.name}>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Outstanding: ₹{customer.balance}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cashAmount">Cash Amount</Label>
                    <Input type="number" placeholder="Enter cash amount" />
                  </div>

                  <div>
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Input placeholder="Payment note or reference" />
                  </div>

                  <Button variant="success" className="w-full">
                    <Banknote className="w-4 h-4 mr-2" />
                    Record Cash Payment
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Pay Customers */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Customers with Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customers.filter(c => c.balance > 0).map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-warning">₹{customer.balance} outstanding</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Banknote className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      {payment.method === 'UPI' ? (
                        <Smartphone className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Banknote className="w-5 h-5 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{payment.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.reference} • {payment.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-semibold">₹{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">{payment.method}</p>
                    </div>
                    
                    <Badge className={getStatusColor(payment.status)}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(payment.status)}
                        <span>{payment.status}</span>
                      </span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payments;