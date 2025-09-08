import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingCart,
  Wallet,
  FileText,
  MessageCircle,
  Download,
  Plus
} from "lucide-react";

const CustomerDetail = () => {
  const { customerId } = useParams();
  
  // Mock customer data
  const customer = {
    id: customerId,
    name: "Ramesh Kumar",
    phone: "+91 98765 43210",
    businessName: "Kumar Traders",
    address: "123 Market Street, Mumbai, MH 400001",
    balance: 2450,
    joinedDate: "2023-06-15",
    totalOrders: 12,
    totalSpent: 25600
  };

  const ledgerEntries = [
    {
      id: "1",
      date: "2024-01-15",
      type: "DEBIT",
      description: "Order #ORD-001 - Rice, Oil",
      amount: 2450,
      balance: 2450
    },
    {
      id: "2",
      date: "2024-01-10",
      type: "CREDIT",
      description: "Payment via UPI",
      amount: 1500,
      balance: 0
    },
    {
      id: "3",
      date: "2024-01-08",
      type: "DEBIT",
      description: "Order #ORD-002 - Sugar, Tea",
      amount: 1500,
      balance: 1500
    }
  ];

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      amount: 2450,
      items: "Rice 5kg, Cooking Oil 1L"
    },
    {
      id: "ORD-002", 
      date: "2024-01-08",
      status: "delivered",
      amount: 1500,
      items: "Sugar 2kg, Tea 250g"
    }
  ];

  return (
    <Layout 
      title={customer.name}
      action={
        <div className="flex space-x-2">
          <Button variant="success">
            <Wallet className="w-4 h-4 mr-2" />
            Collect Payment
          </Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Customer Info Card */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-2xl font-bold">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <p className="text-lg text-muted-foreground">{customer.businessName}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Mumbai, MH
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Since {new Date(customer.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                    <p className={`text-2xl font-bold ${customer.balance > 0 ? 'text-warning' : 'text-success'}`}>
                      {customer.balance > 0 ? `₹${customer.balance}` : 'Cleared'}
                    </p>
                  </div>
                  <div className="flex space-x-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="font-semibold">{customer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="font-semibold">₹{customer.totalSpent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <ShoppingCart className="w-5 h-5" />
                <span>New Order</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Wallet className="w-5 h-5" />
                <span>Record Payment</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <MessageCircle className="w-5 h-5" />
                <span>Send WhatsApp</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Download className="w-5 h-5" />
                <span>Download Statement</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="ledger" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ledger">Ledger</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="ledger">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Account Ledger</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ledgerEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant={entry.type === 'DEBIT' ? 'destructive' : 'default'}>
                            {entry.type}
                          </Badge>
                          <div>
                            <p className="font-medium">{entry.description}</p>
                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${entry.type === 'DEBIT' ? 'text-destructive' : 'text-success'}`}>
                          {entry.type === 'DEBIT' ? '+' : '-'}₹{entry.amount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Balance: ₹{entry.balance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{order.id}</span>
                          <Badge variant={order.status === 'delivered' ? 'default' : 'destructive'}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{order.items}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.amount}</p>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Customer Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="mt-1">{customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                    <p className="mt-1">{customer.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p className="mt-1">{customer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="mt-1">{customer.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Customer Since</label>
                    <p className="mt-1">{new Date(customer.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerDetail;