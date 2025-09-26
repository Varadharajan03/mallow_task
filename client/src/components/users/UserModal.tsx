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
    });

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
            });
        }
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            ...formData,
            // The API might expect an avatar, provide a default one.
            avatar: user?.avatar || 'https://reqres.in/img/faces/1-image.jpg',
        };
        try {
            setIsSubmitting(true);
            if (user) {
                await dispatch(updateUser({ ...userData, _id: user._id })).unwrap();
            } else {
                await dispatch(createUser(userData)).unwrap();
            }
            showToast(user ? 'User updated' : 'User created', 'success');
            onClose();
        } catch (err) {
            showToast('Operation failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl animate-scale-in">
                <h2 className="text-2xl font-bold mb-4">{user ? 'Edit User' : 'Create User'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" name="phone" value={(formData as any).phone || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input type="text" name="job_title" value={(formData as any).job_title || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input type="text" name="company" value={(formData as any).company || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" name="city" value={(formData as any).city || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input type="text" name="country" value={(formData as any).country || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Website</label>
                            <input type="text" name="website" value={(formData as any).website || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea name="bio" value={(formData as any).bio || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={3} />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 w-24 flex justify-center text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50">
                            {isSubmitting ? <Loader /> : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;

