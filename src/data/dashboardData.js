export const dashboardKPIs = {
  totalRevenue: {
    title: 'Total Revenue',
    value: 48294.00,
    formattedValue: '$48,294.00',
    change: 12.8,
    isPositive: true,
    comparison: 'vs. previous period',
    sparkline: [32000, 35000, 34000, 39000, 42000, 41000, 45000, 48294],
  },
  totalCustomers: {
    title: 'Total Customers',
    value: 2845,
    formattedValue: '2,845',
    change: 8.2,
    isPositive: true,
    comparison: 'vs. previous period',
    sparkline: [2100, 2250, 2300, 2480, 2600, 2710, 2780, 2845],
  },
  totalOrders: {
    title: 'Total Orders',
    value: 1429,
    formattedValue: '1,429',
    change: 15.4,
    isPositive: true,
    comparison: 'vs. previous period',
    sparkline: [950, 1020, 1100, 1080, 1250, 1310, 1380, 1429],
  },
  conversionRate: {
    title: 'Conversion Rate',
    value: 4.85,
    formattedValue: '4.85%',
    change: 2.1,
    isPositive: true,
    comparison: 'vs. previous period',
    sparkline: [3.8, 3.9, 4.1, 4.0, 4.3, 4.5, 4.7, 4.85],
  },
};

export const quickStats = [
  { label: 'Active Sessions', value: '412', change: '+5.4%' },
  { label: 'Avg. Order Value', value: '$134.20', change: '+3.2%' },
  { label: 'Churn Rate', value: '1.4%', change: '-0.3%' },
  { label: 'MRR Growth', value: '$8,420', change: '+18.1%' },
];

export const recentActivity = [
  {
    id: 1,
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    action: 'upgraded to',
    target: 'Enterprise Tier',
    time: '4 mins ago',
    amount: '+$499.00',
    type: 'upgrade'
  },
  {
    id: 2,
    user: 'Devin Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    action: 'placed order',
    target: '#TX-8921',
    time: '18 mins ago',
    amount: '+$149.00',
    type: 'purchase'
  },
  {
    id: 3,
    user: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    action: 'renewed subscription',
    target: 'Pro Annual',
    time: '1 hour ago',
    amount: '+$790.00',
    type: 'renewal'
  },
  {
    id: 4,
    user: 'Marcus Sterling',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    action: 'requested refund for',
    target: '#TX-8802',
    time: '3 hours ago',
    amount: '-$89.00',
    type: 'refund'
  },
];
