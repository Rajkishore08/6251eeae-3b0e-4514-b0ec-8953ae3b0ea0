import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  Wallet, 
  Package,
  AlertTriangle,
  Clock,
  Plus,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Sales",
      value: "₹12,450",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "success"
    },
    {
      title: "Total Receivables",
      value: "₹45,280",
      change: "-2.1%",
      trend: "down",
      icon: Wallet,
      color: "warning"
    },
    {
      title: "Total Customers",
      value: "156",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "primary"
    },
    {
      title: "Pending Orders",
      value: "8",
      change: "+2",
      trend: "up",
      icon: ShoppingCart,
      color: "warning"
    }
  ];

  const quickActions = [
    { label: "New Order", icon: Plus, variant: "primary" as const, href: "/orders/new" },
    { label: "Collect Payment", icon: Wallet, variant: "success" as const, href: "/payments" },
    { label: "Add Customer", icon: Users, variant: "outline" as const, href: "/customers" },
    { label: "Add Product", icon: Package, variant: "outline" as const, href: "/inventory" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Ramesh Kumar", amount: "₹2,450", status: "pending" },
    { id: "ORD-002", customer: "Priya Sharma", amount: "₹1,890", status: "confirmed" },
    { id: "ORD-003", customer: "Arjun Singh", amount: "₹3,200", status: "delivered" },
  ];

  const lowStockItems = [
    { name: "Rice (5kg)", current: 2, threshold: 10 },
    { name: "Cooking Oil", current: 1, threshold: 5 },
    { name: "Sugar", current: 3, threshold: 8 },
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="animate-fade-in shadow-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${
                    stat.color === 'success' ? 'text-success' :
                    stat.color === 'warning' ? 'text-warning' :
                    stat.color === 'primary' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs flex items-center mt-1 ${
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change} from yesterday
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    className="h-20 flex-col space-y-2 text-center"
                    asChild
                  >
                    <a href={action.href}>
                      <Icon className="w-6 h-6" />
                      <span>{action.label}</span>
                    </a>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/orders">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-warning-light text-warning' :
                        order.status === 'confirmed' ? 'bg-primary/10 text-primary' :
                        'bg-success-light text-success'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Low Stock Alert
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/inventory">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-warning-light rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {item.current} | Min: {item.threshold}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;