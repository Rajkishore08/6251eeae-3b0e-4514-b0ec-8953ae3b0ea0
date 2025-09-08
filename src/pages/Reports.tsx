import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package,
  Calendar,
  FileText,
  BarChart3
} from "lucide-react";

const Reports = () => {
  const salesData = {
    today: 12450,
    yesterday: 11200,
    thisWeek: 78900,
    thisMonth: 245600,
    growth: 12.5
  };

  const customerReports = [
    { name: "Ramesh Kumar", outstanding: 2450, orders: 12, lastOrder: "2024-01-15" },
    { name: "Arjun Singh", outstanding: 1890, orders: 15, lastOrder: "2024-01-13" },
    { name: "Meera Patel", outstanding: 0, orders: 6, lastOrder: "2024-01-12" }
  ];

  const topProducts = [
    { name: "Rice 5kg", sold: 45, revenue: 20250 },
    { name: "Cooking Oil 1L", sold: 32, revenue: 5760 },
    { name: "Sugar 2kg", sold: 28, revenue: 3360 },
    { name: "Tea 250g", sold: 24, revenue: 2040 }
  ];

  const orderStats = {
    total: 156,
    pending: 8,
    confirmed: 12,
    delivered: 134,
    cancelled: 2
  };

  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Sales
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{salesData.today.toLocaleString()}</div>
              <p className="text-xs text-success">+{salesData.growth}% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <Calendar className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{salesData.thisMonth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Monthly revenue</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.total}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Customers
              </CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Sales Overview</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <span>Today</span>
                      <span className="font-semibold">₹{salesData.today.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <span>Yesterday</span>
                      <span className="font-semibold">₹{salesData.yesterday.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <span>This Week</span>
                      <span className="font-semibold">₹{salesData.thisWeek.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-success-light rounded-lg">
                      <span className="font-medium">This Month</span>
                      <span className="font-bold text-success">₹{salesData.thisMonth.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Top Selling Products</CardTitle>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sold} units sold</p>
                          </div>
                        </div>
                        <span className="font-semibold">₹{product.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Customer Outstanding Report</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerReports.map((customer) => (
                    <div key={customer.name} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-semibold">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.orders} orders • Last: {customer.lastOrder}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          customer.outstanding > 0 ? 'text-warning' : 'text-success'
                        }`}>
                          {customer.outstanding > 0 ? `₹${customer.outstanding}` : 'Cleared'}
                        </p>
                        <p className="text-sm text-muted-foreground">Outstanding</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Inventory Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <span>Total Products</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-warning-light rounded-lg">
                      <span>Low Stock Items</span>
                      <span className="font-semibold text-warning">8</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-success-light rounded-lg">
                      <span>Total Inventory Value</span>
                      <span className="font-semibold text-success">₹85,450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Stock Movement</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-accent/30 rounded-lg">
                      <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Stock movement report will show here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order Analytics</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-accent/30 rounded-lg">
                    <p className="text-2xl font-bold">{orderStats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-warning-light rounded-lg">
                    <p className="text-2xl font-bold text-warning">{orderStats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{orderStats.confirmed}</p>
                    <p className="text-sm text-muted-foreground">Confirmed</p>
                  </div>
                  <div className="text-center p-4 bg-success-light rounded-lg">
                    <p className="text-2xl font-bold text-success">{orderStats.delivered}</p>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">{orderStats.cancelled}</p>
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <span>Export PDF Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Download className="w-6 h-6" />
                <span>Export Excel Sheet</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span>Analytics Dashboard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;