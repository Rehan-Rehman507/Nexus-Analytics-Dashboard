export const reportCategories = [
  { id: 'revenue', name: 'Revenue Report', description: 'Comprehensive breakdown of gross revenues, net margins, MRR and refunds.' },
  { id: 'customer', name: 'Customer Report', description: 'Acquisition velocity, cohort retention analysis and lifetime customer value.' },
  { id: 'sales', name: 'Sales Performance', description: 'Quota attainment, deal size distribution and conversion funnel analytics.' },
  { id: 'product', name: 'Product Performance', description: 'SKU velocity, inventory turnover rates and top-grossing items.' },
];

export const reportsData = {
  revenue: {
    summary: [
      { label: 'Gross Revenue', value: '$52,140.00', change: '+14.2%' },
      { label: 'Net Profit', value: '$35,394.00', change: '+12.8%' },
      { label: 'Operating Costs', value: '$12,900.00', change: '+3.1%' },
      { label: 'Refund Volume', value: '$3,846.00', change: '-1.4%' },
    ],
    chartData: [
      { name: 'Week 1', gross: 12400, net: 8600, costs: 3800 },
      { name: 'Week 2', gross: 13800, net: 9400, costs: 4400 },
      { name: 'Week 3', gross: 11900, net: 8100, costs: 3800 },
      { name: 'Week 4', gross: 14040, net: 9294, costs: 4746 },
    ],
    csvRows: [
      { Period: '2024-Q1 W1', GrossRevenue: 12400.00, NetRevenue: 8600.00, Costs: 3800.00, Margin: '69.3%' },
      { Period: '2024-Q1 W2', GrossRevenue: 13800.00, NetRevenue: 9400.00, Costs: 4400.00, Margin: '68.1%' },
      { Period: '2024-Q1 W3', GrossRevenue: 11900.00, NetRevenue: 8100.00, Costs: 3800.00, Margin: '68.0%' },
      { Period: '2024-Q1 W4', GrossRevenue: 14040.00, NetRevenue: 9294.00, Costs: 4746.00, Margin: '66.2%' },
    ]
  },
  customer: {
    summary: [
      { label: 'Active Users', value: '2,845', change: '+8.2%' },
      { label: 'New Signups', value: '412', change: '+19.4%' },
      { label: 'Retention Rate', value: '94.2%', change: '+1.8%' },
      { label: 'Avg Customer LTV', value: '$2,450.00', change: '+7.6%' },
    ],
    chartData: [
      { name: 'Week 1', newUsers: 95, retainedUsers: 640 },
      { name: 'Week 2', newUsers: 110, retainedUsers: 680 },
      { name: 'Week 3', newUsers: 98, retainedUsers: 710 },
      { name: 'Week 4', newUsers: 109, retainedUsers: 745 },
    ],
    csvRows: [
      { Week: 'Week 1', NewSignups: 95, RetainedUsers: 640, ChurnRate: '1.2%', LTV: 2380.00 },
      { Week: 'Week 2', NewSignups: 110, RetainedUsers: 680, ChurnRate: '1.1%', LTV: 2410.00 },
      { Week: 'Week 3', NewSignups: 98, RetainedUsers: 710, ChurnRate: '1.4%', LTV: 2435.00 },
      { Week: 'Week 4', NewSignups: 109, RetainedUsers: 745, ChurnRate: '1.3%', LTV: 2450.00 },
    ]
  },
  sales: {
    summary: [
      { label: 'Deals Closed', value: '1,429', change: '+15.4%' },
      { label: 'Avg Deal Size', value: '$842.00', change: '+4.2%' },
      { label: 'Win Rate', value: '38.4%', change: '+3.1%' },
      { label: 'Sales Cycle', value: '14.2 Days', change: '-2.1 Days' },
    ],
    chartData: [
      { name: 'Inbound', deals: 820, value: 48000 },
      { name: 'Outbound', deals: 410, value: 34000 },
      { name: 'Partners', deals: 199, value: 22000 },
    ],
    csvRows: [
      { Channel: 'Inbound Organic', DealsClosed: 820, TotalValue: 48000.00, WinRate: '42.1%' },
      { Channel: 'Outbound Enterprise', DealsClosed: 410, TotalValue: 34000.00, WinRate: '31.5%' },
      { Channel: 'Partner Ecosystem', DealsClosed: 199, TotalValue: 22000.00, WinRate: '46.0%' },
    ]
  },
  product: {
    summary: [
      { label: 'Active Catalog SKUs', value: '8', change: '0' },
      { label: 'Units Sold (Month)', value: '3,412', change: '+21.3%' },
      { label: 'Inventory Turnover', value: '6.4x', change: '+0.8x' },
      { label: 'Out of Stock Items', value: '1', change: '-2' },
    ],
    chartData: [
      { name: 'Cloud Engine', units: 320, rev: 159680 },
      { name: 'Neural API', units: 580, rev: 144420 },
      { name: 'Security Sentinel', units: 145, rev: 130355 },
      { name: 'Telemetry Stream', units: 640, rev: 120960 },
      { name: 'Edge Gateway', units: 78, rev: 97500 },
    ],
    csvRows: [
      { SKU: 'PROD-01', Name: 'Nexus Cloud Engine Pro', UnitsSold: 320, Revenue: 159680.00, StockStatus: 'In Stock' },
      { SKU: 'PROD-02', Name: 'Nexus Neural Inference API', UnitsSold: 580, Revenue: 144420.00, StockStatus: 'In Stock' },
      { SKU: 'PROD-03', Name: 'Enterprise Security Sentinel', UnitsSold: 145, Revenue: 130355.00, StockStatus: 'In Stock' },
      { SKU: 'PROD-04', Name: 'Real-Time Streaming Telemetry', UnitsSold: 640, Revenue: 120960.00, StockStatus: 'In Stock' },
      { SKU: 'PROD-05', Name: 'Nexus Edge Compute Gateway v2', UnitsSold: 78, Revenue: 97500.00, StockStatus: 'Low Stock' },
    ]
  }
};
