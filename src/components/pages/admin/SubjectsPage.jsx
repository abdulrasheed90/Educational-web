import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminLayout from '../../admin/AdminLayout';
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from '../../../services/adminService';
import { useConfirm } from '../../../hooks/useConfirm';

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    const { confirm, ConfirmComponent } = useConfirm();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#06b5cc',
        isActive: true
    });

    const gradientOptions = [
        { label: 'Cyan', value: '#06b5cc', gradient: 'from-[#11282b] to-[#06b5cc]' },
        { label: 'Purple', value: '#8B5CF6', gradient: 'from-[#8B5CF6] to-[#C4B5FD]' },
        { label: 'Green', value: '#10B981', gradient: 'from-[#10B981] to-[#6EE7B7]' },
        { label: 'Amber', value: '#F59E0B', gradient: 'from-[#F59E0B] to-[#FCD34D]' },
        { label: 'Pink', value: '#EC4899', gradient: 'from-[#EC4899] to-[#F9A8D4]' }
    ];

    useEffect(() => {
        fetchSubjects();
    }, [search]);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const response = await getAllSubjects();
            if (response.success) {
                let filtered = response.data.subjects || [];
                if (search) {
                    filtered = filtered.filter(s =>
                        s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.description?.toLowerCase().includes(search.toLowerCase())
                    );
                }
                setSubjects(filtered);
            }
        } catch (error) {
            toast.error('Failed to load subjects');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSubject) {
                await updateSubject(editingSubject._id, formData);
                toast.success('Subject updated successfully');
            } else {
                await createSubject(formData);
                toast.success('Subject created successfully');
            }
            setShowModal(false);
            resetForm();
            fetchSubjects();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await confirm({
                title: 'Delete Subject',
                message: 'Are you sure you want to delete this subject? Note: This may affect related lessons.',
                variant: 'danger',
                confirmText: 'Delete',
                cancelText: 'Cancel'
            });
            await deleteSubject(id);
            toast.success('Subject deleted successfully');
            fetchSubjects();
        } catch (error) {
            // User cancelled or error occurred
            if (error !== false) {
                toast.error('Failed to delete subject');
            }
        }
    };

    const openEditModal = (subject) => {
        setEditingSubject(subject);
        setFormData({
            name: subject.name,
            description: subject.description || '',
            color: subject.color || '#06b5cc',
            isActive: subject.status === 'active' || subject.isActive
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingSubject(null);
        setFormData({
            name: '',
            description: '',
            color: '#06b5cc',
            isActive: true
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Subjects Management</h1>
                        <p className="text-[#94A3B8]">Manage courses and study materials</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#06b5cc] hover:bg-[#06b5cc]/80 rounded-xl transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Subject
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 max-w-md">
                    <Search className="w-5 h-5 text-[#94A3B8]" />
                    <input
                        type="text"
                        placeholder="Search subjects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-white placeholder:text-[#94A3B8] w-full"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-12 text-center text-[#94A3B8]">
                            Loading subjects...
                        </div>
                    ) : subjects.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-[#94A3B8]">
                            No subjects found. Create one to get started!
                        </div>
                    ) : (
                        subjects.map((subject) => (
                            <div key={subject._id} className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradientOptions.find(g => g.value === subject.color)?.gradient || 'from-[#11282b] to-[#06b5cc]'}`}>
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(subject)}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#06b5cc]"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(subject._id)}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{subject.name}</h3>
                                <p className="text-[#94A3B8] text-sm mb-4 line-clamp-2">{subject.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className={`px-2 py-1 rounded text-xs ${subject.status === 'active' || subject.isActive ? 'bg-[#06b5cc]/10 text-green-400' : 'bg-gray-500/10 text-[#94A3B8]'}`}>
                                        {subject.status === 'active' || subject.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                    {/* Assuming sections count might come from backend later, or remove if not available */}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal - NO LEVEL INPUT FIELD */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-[#94A3B8] hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="e.g. Mathematics"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#06b5cc]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows="3"
                                    placeholder="Brief description of the subject"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#06b5cc]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Theme Color</label>
                                <div className="flex gap-3">
                                    {gradientOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color: option.value })}
                                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${option.gradient} border-2 transition-all ${formData.color === option.value ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                                                }`}
                                            title={option.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#06b5cc] focus:ring-0"
                                />
                                <label htmlFor="isActive" className="text-sm text-[#94A3B8]">Active (Visible to users)</label>
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-white/10 text-[#94A3B8] hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-[#06b5cc] hover:bg-[#06b5cc]/80 text-white rounded-lg transition-colors font-medium"
                                >
                                    {editingSubject ? 'Update Subject' : 'Create Subject'}
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
