import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Edit,
  Eye,
  BarChart3
} from "lucide-react";

const Inventory = () => {
  const products = [
    {
      id: "1",
      name: "Rice 5kg",
      sku: "RICE-5KG",
      price: 450,
      stock: 25,
      threshold: 10,
      unit: "bags",
      category: "Grocery",
      fastMoving: true
    },
    {
      id: "2",
      name: "Cooking Oil 1L", 
      sku: "OIL-1L",
      price: 180,
      stock: 5,
      threshold: 10,
      unit: "bottles",
      category: "Grocery",
      fastMoving: true
    },
    {
      id: "3",
      name: "Sugar 2kg",
      sku: "SUGAR-2KG", 
      price: 120,
      stock: 15,
      threshold: 8,
      unit: "packets",
      category: "Grocery",
      fastMoving: false
    },
    {
      id: "4",
      name: "Tea 250g",
      sku: "TEA-250G",
      price: 85,
      stock: 2,
      threshold: 5,
      unit: "packets", 
      category: "Beverages",
      fastMoving: true
    },
    {
      id: "5",
      name: "Wheat Flour 10kg",
      sku: "FLOUR-10KG",
      price: 380,
      stock: 12,
      threshold: 6,
      unit: "bags",
      category: "Grocery", 
      fastMoving: false
    }
  ];

  const stats = [
    {
      title: "Total Products",
      value: "45",
      icon: Package,
      color: "primary"
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: AlertTriangle,
      color: "warning"
    },
    {
      title: "Inventory Value",
      value: "₹85,450",
      icon: TrendingUp,
      color: "success"
    }
  ];

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock <= threshold / 2) return { status: 'critical', color: 'bg-destructive/10 text-destructive' };
    if (stock <= threshold) return { status: 'low', color: 'bg-warning-light text-warning' };
    return { status: 'good', color: 'bg-success-light text-success' };
  };

  return (
    <Layout 
      title="Inventory"
      action={
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
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
                    'text-success'
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
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Products</Button>
                <Button variant="outline">Low Stock</Button>
                <Button variant="outline">Fast Moving</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock, product.threshold);
                
                return (
                  <div 
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{product.name}</h3>
                          {product.fastMoving && (
                            <Badge variant="default" className="text-xs">
                              Fast Moving
                            </Badge>
                          )}
                          <Badge className={stockStatus.color} variant="outline">
                            {stockStatus.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          SKU: {product.sku} • {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold">₹{product.price}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="font-semibold">
                          {product.stock} {product.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Min: {product.threshold}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="font-semibold">
                          ₹{product.price * product.stock}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit Product">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Stock History">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products.filter(p => p.stock <= p.threshold).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-warning-light rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {product.stock} | Min: {product.threshold}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Restock
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Bulk Stock Update
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Stock Movement Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Low Stock Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;