import React, { useState, useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import AddEditProductModal from '../components/modals/AddEditProductModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { useDashboard } from '../context/DashboardContext';
import { productCategories } from '../data/productsData';
import { formatCurrency } from '../utils/formatCurrency';
import { exportToCSV } from '../utils/exportCSV';
import {
  Package,
  Plus,
  Search,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Download,
  Star,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Products() {
  const { products, deleteProduct } = useDashboard();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('revenue-desc');

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesCategory =
          selectedCategory === 'All Categories' || prod.category === selectedCategory;
        const matchesSearch =
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'units-desc') return b.unitsSold - a.unitsSold;
        if (sortBy === 'revenue-desc') return b.revenue - a.revenue;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (prod, e) => {
    e?.stopPropagation();
    setEditingProduct(prod);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (id, e) => {
    e?.stopPropagation();
    setDeletingProductId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  const handleExportProducts = () => {
    try {
      const exportable = products.map((p) => ({
        SKU: p.id,
        Name: p.name,
        Category: p.category,
        Price: p.price,
        UnitsSold: p.unitsSold,
        GrossRevenue: p.revenue,
        StockStatus: p.stockStatus,
        StockCount: p.stockCount,
      }));
      exportToCSV(exportable, 'nexus-products-catalog.csv');
      toast.success('Catalog records exported to CSV');
    } catch {
      toast.error('Failed to export catalog');
    }
  };

  const actionButtons = (
    <>
      <Button
        variant="outline"
        size="sm"
        icon={Download}
        onClick={handleExportProducts}
      >
        Export Catalog
      </Button>
      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        onClick={handleOpenAdd}
      >
        Add Product
      </Button>
    </>
  );

  return (
    <PageLayout
      title="Product Catalog & Inventory"
      subtitle="Manage digital software licenses, API subscriptions and hardware telemetry appliances"
      actions={actionButtons}
    >
      {/* Control Toolbar */}
      <div className="p-4 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Search & Category */}
        <div className="w-full md:w-auto flex flex-1 flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
          >
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Sort and View mode switch */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
            >
              <option value="revenue-desc">Highest Revenue</option>
              <option value="units-desc">Most Units Sold</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical</option>
            </select>
          </div>

          <div className="flex items-center p-1 bg-[#0B0D12] border border-[#252B38] rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Content: Grid vs Table */}
      {filteredProducts.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#151923] border border-[#252B38]">
          <EmptyState
            icon={Package}
            title="No products match your criteria"
            description="Try clearing your category filter or adjusting your search term."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
          />
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group rounded-2xl bg-[#151923] border border-[#252B38] hover:border-slate-700 transition-all duration-300 shadow-card-dark overflow-hidden flex flex-col justify-between"
            >
              {/* Product Cover Image */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151923] via-transparent to-black/30" />
                <div className="absolute top-3 left-3">
                  <Badge size="xs">{prod.stockStatus}</Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] text-amber-400 border border-white/10">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{prod.rating}</span>
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] text-slate-300 font-mono">
                  {prod.id}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    {prod.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1 group-hover:text-violet-300 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {prod.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-4 pt-3 border-t border-[#252B38] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Price</span>
                    <div className="font-bold text-white text-sm">
                      {formatCurrency(prod.price)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">Units Sold</span>
                    <div className="font-semibold text-slate-200">
                      {prod.unitsSold.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs flex justify-between items-center text-slate-400">
                  <span>Gross Revenue:</span>
                  <span className="font-semibold text-emerald-400">
                    {formatCurrency(prod.revenue)}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-[#10131B] border-t border-[#252B38] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Stock: <strong className="text-slate-200">{prod.stockCount}</strong>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleOpenEdit(prod, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Product"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleOpenDelete(prod.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#151923] border border-[#252B38] rounded-2xl shadow-card-dark overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#252B38] bg-[#10131B]/70 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Units Sold</th>
                <th className="py-3.5 px-4">Total Revenue</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B38]/60 text-slate-300">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-white">{prod.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{prod.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{prod.category}</td>
                  <td className="py-3 px-4 font-bold text-white font-mono">
                    {formatCurrency(prod.price)}
                  </td>
                  <td className="py-3 px-4">{prod.unitsSold.toLocaleString()} units</td>
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">
                    {formatCurrency(prod.revenue)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge>{prod.stockStatus}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => handleOpenEdit(prod, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleOpenDelete(prod.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        product={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProductId)}
        onClose={() => setDeletingProductId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Catalog Item?"
        message="This product will be permanently removed from catalog records and local storage. Confirm deletion?"
        confirmLabel="Yes, Delete Product"
      />
    </PageLayout>
  );
}
