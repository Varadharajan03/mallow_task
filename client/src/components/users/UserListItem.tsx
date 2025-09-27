import React, { useState } from 'react';
import type { User } from '../../types';

interface UserListItemProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState({ edit: false, delete: false });

    const handleEdit = async () => {
        setIsLoading(prev => ({ ...prev, edit: true }));
        setTimeout(() => {
            onEdit(user);
            setIsLoading(prev => ({ ...prev, edit: false }));
        }, 300);
    };

    const handleDelete = async () => {
        setIsLoading(prev => ({ ...prev, delete: true }));
        setTimeout(() => {
            onDelete(user._id);
            setIsLoading(prev => ({ ...prev, delete: false }));
        }, 300);
    };


    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.first_name} ${user.last_name}`)}&background=6366f1&color=fff&size=200`;

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all duration-500 overflow-hidden animate-in slide-in-from-bottom-4 fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="relative">
                            <div className="relative h-16 w-16 group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    className="h-16 w-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300 ring-2 ring-white group-hover:ring-indigo-200" 
                                    src={user.avatar || fallbackAvatar} 
                                    alt={`${user.first_name} ${user.last_name}`}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = fallbackAvatar;
                                    }}
                                />
                                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white animate-pulse group-hover:animate-bounce"></div>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 truncate">
                                    {`${user.first_name} ${user.last_name}`}
                                </h3>
                                {user.job_title && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 group-hover:bg-indigo-200 transition-colors duration-300">
                                        {user.job_title}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate max-w-xs">{user.email}</span>
                                </div>
                                
                                {user.company && (
                                    <div className="flex items-center space-x-2 group-hover:text-purple-600 transition-colors duration-300">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h6m-8 0v-2a2 2 0 012-2h8a2 2 0 012 2v2z" />
                                        </svg>
                                        <span className="truncate max-w-xs">{user.company}</span>
                                    </div>
                                )}
                                
                                {(user.city || user.country) && (
                                    <div className="flex items-center space-x-2 group-hover:text-pink-600 transition-colors duration-300">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="truncate">
                                            {[user.city, user.country].filter(Boolean).join(', ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 group-hover:scale-110"
                            title={isExpanded ? 'Show less' : 'Show more'}
                        >
                            <svg 
                                className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <button 
                            onClick={handleEdit}
                            disabled={isLoading.edit}
                            className="relative px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 hover:text-indigo-800 transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-indigo-500 group-hover:text-white"
                        >
                            {isLoading.edit ? (
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Edit</span>
                                </div>
                            )}
                        </button>

                        <button 
                            onClick={handleDelete}
                            disabled={isLoading.delete}
                            className="relative px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 hover:text-red-800 transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-red-500 group-hover:text-white"
                        >
                            {isLoading.delete ? (
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Delete</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-gray-100 pt-6 animate-in slide-in-from-top-2 fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.phone && (
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>Phone</span>
                                    </div>
                                    <p className="text-gray-600 pl-6">{user.phone}</p>
                                </div>
                            )}

                            {user.website && (
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                        </svg>
                                        <span>Website</span>
                                    </div>
                                    <a 
                                        href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 pl-6 underline-offset-2 hover:underline transition-colors duration-200"
                                    >
                                        {user.website}
                                    </a>
                                </div>
                            )}

                            {user.bio && (
                                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>About</span>
                                    </div>
                                    <p className="text-gray-600 pl-6 leading-relaxed">{user.bio}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
            </div>
        </div>
    );
};

export default UserListItem;