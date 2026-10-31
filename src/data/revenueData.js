export const revenuePeriods = {
  weekly: [
    { name: 'Mon', revenue: 5400, previous: 4800, expenses: 1400, net: 4000 },
    { name: 'Tue', revenue: 7200, previous: 6100, expenses: 1900, net: 5300 },
    { name: 'Wed', revenue: 6800, previous: 6300, expenses: 1750, net: 5050 },
    { name: 'Thu', revenue: 8900, previous: 7400, expenses: 2200, net: 6700 },
    { name: 'Fri', revenue: 9400, previous: 8100, expenses: 2500, net: 6900 },
    { name: 'Sat', revenue: 5100, previous: 4600, expenses: 1200, net: 3900 },
    { name: 'Sun', revenue: 5494, previous: 4900, expenses: 1300, net: 4194 },
  ],
  monthly: [
    { name: 'Jan', revenue: 31200, previous: 28000, expenses: 8400, net: 22800 },
    { name: 'Feb', revenue: 34500, previous: 29500, expenses: 9100, net: 25400 },
    { name: 'Mar', revenue: 32800, previous: 31000, expenses: 8800, net: 24000 },
    { name: 'Apr', revenue: 39200, previous: 33400, expenses: 10400, net: 28800 },
    { name: 'May', revenue: 41500, previous: 36000, expenses: 11200, net: 30300 },
    { name: 'Jun', revenue: 40200, previous: 37500, expenses: 10900, net: 29300 },
    { name: 'Jul', revenue: 44100, previous: 39000, expenses: 11800, net: 32300 },
    { name: 'Aug', revenue: 46800, previous: 41200, expenses: 12400, net: 34400 },
    { name: 'Sep', revenue: 45300, previous: 42000, expenses: 12100, net: 33200 },
    { name: 'Oct', revenue: 48294, previous: 43100, expenses: 12900, net: 35394 },
    { name: 'Nov', revenue: 51200, previous: 44800, expenses: 13600, net: 37600 },
    { name: 'Dec', revenue: 56400, previous: 49000, expenses: 15200, net: 41200 },
  ],
  yearly: [
    { name: '2021', revenue: 245000, previous: 190000, expenses: 78000, net: 167000 },
    { name: '2022', revenue: 382000, previous: 245000, expenses: 112000, net: 270000 },
    { name: '2023', revenue: 495000, previous: 382000, expenses: 145000, net: 350000 },
    { name: '2024', revenue: 642000, previous: 495000, expenses: 184000, net: 458000 },
    { name: '2025', revenue: 810000, previous: 642000, expenses: 228000, net: 582000 },
  ],
};

export const revenueBreakdown = [
  {
    category: 'Product Sales',
    amount: 19800.54,
    percentage: 41,
    color: '#8B5CF6',
    growth: '+14.2%',
  },
  {
    category: 'Subscriptions',
    amount: 16420.00,
    percentage: 34,
    color: '#3B82F6',
    growth: '+18.6%',
  },
  {
    category: 'Services',
    amount: 8210.00,
    percentage: 17,
    color: '#10B981',
    growth: '+6.5%',
  },
  {
    category: 'Other Revenue',
    amount: 3863.46,
    percentage: 8,
    color: '#F59E0B',
    growth: '+2.1%',
  },
];

export const revenueByPaymentMethod = [
  { name: 'Credit / Debit Card (Stripe)', value: 27527.58, percentage: 57, color: '#8B5CF6' },
  { name: 'PayPal Direct', value: 11107.62, percentage: 23, color: '#3B82F6' },
  { name: 'Bank Transfer (ACH / Wire)', value: 6761.16, percentage: 14, color: '#10B981' },
  { name: 'Crypto / Web3 Gateway', value: 2897.64, percentage: 6, color: '#F59E0B' },
];

export const revenueStatsSummary = {
  totalRevenue: 48294.00,
  netRevenue: 35394.00,
  grossRevenue: 52140.00,
  refunds: 3846.00,
  avgDealSize: 842.00,
  refundRate: '2.4%',
};

export const revenueBreakdownTableData = [
  { id: 'REV-01', stream: 'Enterprise Cloud Subscription', channel: 'Direct Sales', gross: 18500.00, fee: 555.00, net: 17945.00, status: 'Active', growth: '+22%' },
  { id: 'REV-02', stream: 'AI Core API Usage Metered', channel: 'Self-Serve API', gross: 12420.00, fee: 372.60, net: 12047.40, status: 'Active', growth: '+31%' },
  { id: 'REV-03', stream: 'Pro Monthly Plan', channel: 'In-app Checkout', gross: 9450.00, fee: 283.50, net: 9166.50, status: 'Active', growth: '+9%' },
  { id: 'REV-04', stream: 'Custom Integration Services', channel: 'Partner Portal', gross: 5600.00, fee: 168.00, net: 5432.00, status: 'Reviewing', growth: '+4%' },
  { id: 'REV-05', stream: 'Priority Support SLA Add-on', channel: 'Renewals', gross: 2324.00, fee: 69.72, net: 2254.28, status: 'Active', growth: '+12%' },
];
