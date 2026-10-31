import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { productCategories } from '../../data/productsData';
import { useDashboard } from '../../context/DashboardContext';
import toast from 'react-hot-toast';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80',
];

export default function AddEditProductModal({ isOpen, onClose, product = null }) {
  const { addProduct, updateProduct } = useDashboard();
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Cloud Services',
    price: '',
    unitsSold: '',
    stockCount: '',
    stockStatus: 'In Stock',
    description: '',
    image: PRESET_IMAGES[0],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Cloud Services',
        price: product.price ?? '',
        unitsSold: product.unitsSold ?? '',
        stockCount: product.stockCount ?? '',
        stockStatus: product.stockStatus || 'In Stock',
        description: product.description || '',
        image: product.image || PRESET_IMAGES[0],
      });
    } else {
      setFormData({
        name: '',
        category: 'Cloud Services',
        price: '',
        unitsSold: '0',
        stockCount: '100',
        stockStatus: 'In Stock',
        description: '',
        image: PRESET_IMAGES[0],
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (isEditing) {
      updateProduct(product.id, {
        ...formData,
        price: Number(formData.price),
        unitsSold: Number(formData.unitsSold) || 0,
        stockCount: Number(formData.stockCount) || 0,
      });
    } else {
      addProduct({
        ...formData,
        price: Number(formData.price),
        unitsSold: Number(formData.unitsSold) || 0,
        stockCount: Number(formData.stockCount) || 0,
      });
    }

    onClose();
  };

  const categories = productCategories.filter((c) => c !== 'All Categories');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Add New Product'}
      subtitle={
        isEditing
          ? `Update details for SKU ${product.id}`
          : 'Create a new catalog item or digital SaaS offering'
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Product / Service Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Nexus Dedicated Neural Cluster"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Stock Status
            </label>
            <select
              value={formData.stockStatus}
              onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
              className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Pricing & Quantities */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              min="0"
              placeholder="199.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Units Sold
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={formData.unitsSold}
              onChange={(e) => setFormData({ ...formData, unitsSold: e.target.value })}
              className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Available Units
            </label>
            <input
              type="number"
              min="0"
              placeholder="100"
              value={formData.stockCount}
              onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
              className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="2"
            placeholder="Brief technical or product specification..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Image Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Choose Cover Image
          </label>
          <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1">
            {PRESET_IMAGES.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Preset ${idx}`}
                onClick={() => setFormData({ ...formData, image: imgUrl })}
                className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all shrink-0 ${
                  formData.image === imgUrl
                    ? 'border-violet-500 ring-2 ring-violet-500/30'
                    : 'border-[#252B38] opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
          <input
            type="url"
            placeholder="Or enter custom image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#252B38] flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {isEditing ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
