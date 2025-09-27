import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createUser, updateUser } from '../../features/users/usersSlice';
import Loader from '../common/Loader';
import { useToast } from '../common/Toast';
import type { User } from '../../types';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    type UserForm = {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        job_title: string;
        company: string;
        city: string;
        country: string;
        website: string;
        bio: string;
        avatar: string;
    };

    const [formData, setFormData] = useState<UserForm>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '',
        company: '',
        city: '',
        country: '',
        website: '',
        bio: '',
        avatar: '',
    });

    // Extract image URL from Google Images or other complex URLs
    const extractImageUrl = (url: string): string => {
        try {
            // Handle Google Images URLs
            const imgUrlMatch = url.match(/imgurl=([^&]+)/);
            if (imgUrlMatch) {
                return decodeURIComponent(imgUrlMatch[1]);
            }
            
            // Handle direct URLs
            if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i)) {
                return url;
            }
            
            return url;
        } catch {
            return url;
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone || '',
                job_title: user.job_title || '',
                company: user.company || '',
                city: user.city || '',
                country: user.country || '',
                website: user.website || '',
                bio: user.bio || '',
                avatar: user.avatar || '',
            });
        } else {
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                job_title: '',
                company: '',
                city: '',
                country: '',
                website: '',
                bio: '',
                avatar: '',
            });
        }
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'avatar') {
            const extractedUrl = extractImageUrl(value);
            setFormData(prev => ({ ...prev, [name]: extractedUrl }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleClose = () => {
        setIsSubmitting(false);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            job_title: '',
            company: '',
            city: '',
            country: '',
            website: '',
            bio: '',
            avatar: '',
        });
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            ...formData,
            avatar: formData.avatar || user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(`${formData.first_name} ${formData.last_name}`),
        };
        
        try {
            setIsSubmitting(true);
            let result;
            
            if (user) {
                result = await dispatch(updateUser({ ...userData, _id: user._id })).unwrap();
                showToast('User updated successfully!', 'success');
            } else {
                result = await dispatch(createUser(userData)).unwrap();
                console.log(result)
                showToast('User created successfully!', 'success');
            }
            
            // Close modal after successful operation
            handleClose();
        } catch (error: any) {
            console.log("errorrrr", error);
            // Show more specific error message
            const errorMessage = error || 'Operation failed. Please try again.';
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Don't render anything if modal is not open
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden">
                <div className="flex h-full">
                    {/* Left Panel - Avatar Section */}
                    <div className="w-1/3 bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-500 p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center">
                            <div className="mb-6 group">
                                <div className="relative inline-block">
                                    <img
                                        src={formData.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(`${formData.first_name} ${formData.last_name}`) + '&background=f59e0b&color=fff&size=128'}
                                        alt="Avatar Preview"
                                        className="w-32 h-32 rounded-full border-4 border-white/20 object-cover shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(`${formData.first_name} ${formData.last_name}`) + '&background=f59e0b&color=fff&size=128';
                                        }}
                                    />
                                    <div className="absolute inset-0 rounded-full border-4 border-white/0 group-hover:border-white/40 transition-colors duration-300"></div>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                {user ? 'Edit Profile' : 'Create Profile'}
                            </h2>
                            <p className="text-white/80">
                                {user ? 'Update your information' : 'Fill in your details'}
                            </p>
                            
                            {/* Avatar URL Input */}
                            <div className="mt-6 w-full">
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    Avatar URL
                                </label>
                                <input
                                    type="text"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    placeholder="Paste image URL here..."
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                                />
                                <p className="text-xs text-white/70 mt-2">
                                    Supports Google Images URLs and direct image links
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form Section */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <div className="p-6 pb-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">User Information</h3>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Form Content */}
                        <div className="flex-1 p-6 overflow-y-auto" style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#f59e0b #f3f4f6'
                        }}>
                            <style>
                                {`
                                .flex-1::-webkit-scrollbar {
                                    width: 8px;
                                }
                                .flex-1::-webkit-scrollbar-track {
                                    background: #f3f4f6;
                                    border-radius: 10px;
                                }
                                .flex-1::-webkit-scrollbar-thumb {
                                    background: #f59e0b;
                                    border-radius: 10px;
                                }
                                .flex-1::-webkit-scrollbar-thumb:hover {
                                    background: #d97706;
                                }
                                `}
                            </style>
                            <form onSubmit={handleSubmit} className="space-y-6 min-h-[600px]">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                {/* Professional Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Job Title</label>
                                        <input
                                            type="text"
                                            name="job_title"
                                            value={formData.job_title}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter job title"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter company name"
                                        />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter website URL"
                                        />
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter city"
                                        />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter country"
                                        />
                                    </div>
                                </div>

                                {/* Bio Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Footer with Action Buttons */}
                        <div className="p-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    className="px-8 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                                >
                                    {isSubmitting ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            <span>{user ? 'Update' : 'Create'}</span>
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;