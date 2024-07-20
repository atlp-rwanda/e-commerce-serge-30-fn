import { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../../service/productApi';
import { useGetAllOrdersQuery } from '../../service/OrderApi';
import { PieChart } from '../../components/vendorcomponents/PieChart';
import { BarChart } from '../../components/vendorcomponents/BarChart';
import { Table } from '../../components/vendorcomponents/Table';
import { StatisticCard } from '../../components/vendorcomponents/StatisticCard';
import { IProduct, Order } from '../../types';

export function VendorDashboard() {
  const { data: products, isLoading: productsLoading } =
    useGetAllProductsQuery();
  const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery();

  const [orderStatusData, setOrderStatusData] = useState<any>(null);
  const [productInventoryData, setProductInventoryData] = useState<any>(null);

  useEffect(() => {
    if (!productsLoading && !ordersLoading) {
      const pendingOrdersCount =
        orders?.data.filter((order) => order.status === 'pending').length ?? 0;
      const totalOrdersCount = orders?.data.length ?? 0;

      setOrderStatusData({
        labels: ['Pending', 'Completed', 'Cancelled'],
        datasets: [
          {
            label: 'Order Status',
            data: [
              pendingOrdersCount,
              totalOrdersCount - pendingOrdersCount,
              5,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setProductInventoryData({
        labels: products?.data.map((product) => product.name) ?? [],
        datasets: [
          {
            label: 'Inventory Quantity',
            data: products?.data.map((product) => product.quantity) ?? [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [productsLoading, ordersLoading, products?.data, orders?.data]);

  const totalProducts = productsLoading
    ? 'Loading...'
    : (products?.data.length ?? 0);
  const totalOrders = ordersLoading ? 'Loading...' : (orders?.data.length ?? 0);
  const pendingOrders = ordersLoading
    ? 'Loading...'
    : (orders?.data.filter((order) => order.status === 'pending').length ?? 0);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-8">
        <StatisticCard title="Total Products" value={totalProducts} />
        <StatisticCard title="Total Orders" value={totalOrders} />
        <StatisticCard title="Total Revenue" value="$0.00" />
        <StatisticCard title="Pending Orders" value={pendingOrders} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
          Statistics
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-4 md:p-6 shadow-lg rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Order Status
            </h3>
            {orderStatusData && <PieChart data={orderStatusData} />}
          </div>

          <div className="w-full md:w-1/2 lg:w-2/3 bg-white p-4 md:p-6 shadow-lg rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Product Inventory
            </h3>
            {productInventoryData && <BarChart data={productInventoryData} />}
          </div>
        </div>

        <div className="mb-4 md:mb-8">
          <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Detailed Statistics
            </h3>
            <Table
              data={[
                { Metric: 'Total Products', Value: totalProducts },
                { Metric: 'Total Orders', Value: totalOrders },
                { Metric: 'Pending Orders', Value: pendingOrders },
                { Metric: 'Total Revenue', Value: '$0.00' },
              ]}
              columns={[
                { header: 'Metric', accessor: 'Metric' },
                { header: 'Value', accessor: 'Value' },
              ]}
              loading={false}
            />
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-2">Orders</h3>
          <Table<Order>
            data={orders?.data ?? []}
            columns={[
              { header: 'Order ID', accessor: 'id' },
              { header: 'Customer', accessor: 'customer' },
              { header: 'Total', accessor: 'total' },
              { header: 'Status', accessor: 'status' },
            ]}
            loading={ordersLoading}
          />

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Product Inventory
          </h3>
          <Table<IProduct>
            data={products?.data ?? []}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Price', accessor: 'price' },
              { header: 'Quantity', accessor: 'quantity' },
            ]}
            loading={productsLoading}
          />
        </div>
      </div>
    </div>
  );
}
