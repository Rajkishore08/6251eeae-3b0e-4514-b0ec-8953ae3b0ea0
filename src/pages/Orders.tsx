import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Eye, 
  Check, 
  Truck, 
  X,
  FileText,
  Calendar,
  Filter
} from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD-001",
      customer: "Ramesh Kumar",
      customerBusiness: "Kumar Traders",
      date: "2024-01-15",
      status: "pending",
      items: 3,
      total: 2450,
      advance: 500
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma", 
      customerBusiness: "Sharma Electronics",
      date: "2024-01-14",
      status: "confirmed",
      items: 2,
      total: 1890,
      advance: 0
    },
    {
      id: "ORD-003",
      customer: "Arjun Singh",
      customerBusiness: "Singh Groceries", 
      date: "2024-01-13",
      status: "delivered",
      items: 5,
      total: 3200,
      advance: 1000
    },
    {
      id: "ORD-004",
      customer: "Meera Patel",
      customerBusiness: "Patel Textiles",
      date: "2024-01-12", 
      status: "cancelled",
      items: 2,
      total: 1200,
      advance: 0
    }
  ];

  const stats = [
    {
      title: "Total Orders",
      value: "45",
      status: "all"
    },
    {
      title: "Pending",
      value: "8",
      status: "pending"
    },
    {
      title: "Confirmed", 
      value: "12",
      status: "confirmed"
    },
    {
      title: "Delivered",
      value: "23",
      status: "delivered"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning-light text-warning';
      case 'confirmed': return 'bg-primary/10 text-primary';
      case 'delivered': return 'bg-success-light text-success';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusActions = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" title="Confirm Order">
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" title="Cancel Order">
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" title="Mark as Delivered">
              <Truck className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" title="Cancel Order">
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'delivered':
        return (
          <Button variant="ghost" size="sm" title="Generate Invoice">
            <FileText className="w-4 h-4" />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      title="Orders"
      action={
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders or customers..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-lg">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                      
                      <div className="ml-8">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.customerBusiness}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold">₹{order.total}</p>
                      {order.advance > 0 && (
                        <p className="text-xs text-success">Advance: ₹{order.advance}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {getStatusActions(order.status)}
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

export default Orders;