import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminLayout from '../../admin/AdminLayout';
import { getAllPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../../../services/adminService';
import { useConfirm } from '../../../hooks/useConfirm';

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'monthly',
    subject: 'all',
    price: 0,
    currency: 'PKR',
    duration: 30,
    features: [],
    isActive: true,
    displayOrder: 0,
    stripePriceId: '',
    popular: false
  });
  const [featureInput, setFeatureInput] = useState('');
  const { confirm, ConfirmComponent } = useConfirm();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllPricingPlans();
      if (response.success) {
        setPlans(response.data);
      }
    } catch (error) {
      toast.error('Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await updatePricingPlan(editingPlan._id, formData);
        toast.success('Plan updated successfully');
      } else {
        await createPricingPlan(formData);
        toast.success('Plan created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchPlans();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await confirm({
        title: 'Delete Pricing Plan',
        message: 'Are you sure you want to delete this pricing plan?',
        variant: 'danger',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      });
      await deletePricingPlan(id);
      toast.success('Plan deleted successfully');
      fetchPlans();
    } catch (error) {
      if (error !== false) {
        toast.error('Failed to delete plan');
      }
    }
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      type: plan.type,
      subject: plan.subject,
      price: plan.price,
      currency: plan.currency,
      duration: plan.duration,
      features: plan.features || [],
      isActive: plan.isActive,
      displayOrder: plan.displayOrder,
      stripePriceId: plan.stripePriceId || '',
      popular: !!plan.popular
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      type: 'monthly',
      subject: 'all',
      price: 0,
      currency: 'PKR',
      duration: 30,
      features: [],
      isActive: true,
      displayOrder: 0,
      stripePriceId: '',
      popular: false
    });
    setFeatureInput('');
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, idx) => idx !== index) });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Pricing Management</h1>
            <p className="text-[#94A3B8]">Manage subscription plans and pricing</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#06b5cc] hover:bg-[#06b5cc]/80 rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-[#94A3B8]">
              Loading plans...
            </div>
          ) : plans.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#94A3B8]">
              No pricing plans found
            </div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan._id}
                className={`relative bg-gradient-to-br from-[#111113] to-[#111113]/50 border rounded-2xl p-6 hover:border-white/20 transition-all ${plan.isActive ? 'border-[#06b5cc]/50' : 'border-white/10'
                  }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  {!plan.isActive && (
                    <span className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400">
                      Inactive
                    </span>
                  )}
                  {plan.popular && (
                    <span className="px-2 py-1 rounded text-xs bg-[#F7C94C]/20 text-[#F7C94C] border border-[#F7C94C]/30 flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price.toLocaleString()}</span>
                    <span className="text-[#94A3B8]">{plan.currency}</span>
                  </div>
                  <p className="text-[#94A3B8] text-sm mt-1">
                    {plan.duration} days • {plan.type}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#94A3B8]">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subject Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-[#06b5cc]/10 text-[#06b5cc] capitalize">
                    {plan.subject.replace('-', ' ')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-[#111113] to-[#111113]/90 border border-white/10 rounded-2xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }}>
                <X className="w-6 h-6 text-[#94A3B8]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Plan Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Basic Plan"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="subject">Per Subject</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Price *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    min="0"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Currency *</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Duration (days) *</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    required
                    min="1"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#94A3B8]">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  >
                    <option value="all">All Subjects</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="biology">Biology</option>
                    <option value="computer-science">Computer Science</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-2 text-[#94A3B8]">Stripe Price ID (from Stripe Dashboard) *</label>
                  <input
                    type="text"
                    value={formData.stripePriceId}
                    onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
                    required
                    placeholder="e.g., price_1N2b3c4d5e..."
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  />
                  <p className="text-[10px] text-[#94A3B8] mt-1">Found in Stripe &rarr; Product Catalog &rarr; Price ID</p>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#94A3B8]">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Add feature and press Enter"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#06b5cc]"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg"
                    >
                      <span className="text-white text-sm">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isActive" className="text-sm text-[#94A3B8]">
                    Active (visible to users)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="popular" className="text-sm text-[#94A3B8] cursor-pointer">
                    Mark as Popular
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#06b5cc] hover:bg-[#06b5cc]/80 rounded-xl transition-colors"
                >
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmComponent />
    </AdminLayout>
  );
}

