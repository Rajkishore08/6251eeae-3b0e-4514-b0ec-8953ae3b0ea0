import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Eye, 
  ShoppingCart, 
  Wallet, 
  FileText,
  MessageCircle,
  Users
} from "lucide-react";

const Customers = () => {
  const customers = [
    {
      id: "1",
      name: "Ramesh Kumar",
      phone: "+91 98765 43210",
      businessName: "Kumar Traders",
      balance: 2450,
      lastOrder: "2024-01-15",
      totalOrders: 12
    },
    {
      id: "2", 
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      businessName: "Sharma Electronics",
      balance: 0,
      lastOrder: "2024-01-14",
      totalOrders: 8
    },
    {
      id: "3",
      name: "Arjun Singh", 
      phone: "+91 76543 21098",
      businessName: "Singh Groceries",
      balance: 1890,
      lastOrder: "2024-01-13",
      totalOrders: 15
    },
    {
      id: "4",
      name: "Meera Patel",
      phone: "+91 65432 10987",
      businessName: "Patel Textiles",
      balance: 0,
      lastOrder: "2024-01-12",
      totalOrders: 6
    }
  ];

  const stats = [
    {
      title: "Total Customers",
      value: "156",
      icon: Users,
      color: "primary"
    },
    {
      title: "With Outstanding",
      value: "23",
      icon: Wallet,
      color: "warning"
    },
    {
      title: "Total Outstanding",
      value: "₹45,280",
      icon: FileText,
      color: "destructive"
    }
  ];

  return (
    <Layout 
      title="Customers"
      action={
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      }
    >
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
                    stat.color === 'primary' ? 'text-primary' :
                    stat.color === 'warning' ? 'text-warning' :
                    'text-destructive'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Customers</Button>
                <Button variant="outline">With Dues</Button>
                <Button variant="outline">Recent</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div 
                  key={customer.id}
                  className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.businessName}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className={`font-semibold ${
                        customer.balance > 0 ? 'text-warning' : 'text-success'
                      }`}>
                        {customer.balance > 0 ? `₹${customer.balance}` : 'Cleared'}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Orders</p>
                      <p className="font-semibold">{customer.totalOrders}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Wallet className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
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

export default Customers;