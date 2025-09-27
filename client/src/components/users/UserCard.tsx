import React from 'react';
import type { User } from '../../types';

interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <div className="group [perspective:1000px] h-72">
            <div className="relative h-full w-full transition-all duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] hover:scale-105">
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="h-full bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-2xl border border-amber-200 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 transform hover:-translate-y-1">
                        <div className="relative mb-6">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-75 blur-sm animate-pulse"></div>
                            <img 
                                src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(`${user.first_name} ${user.last_name}`) + '&background=f59e0b&color=fff&size=96'} 
                                alt={`${user.first_name} ${user.last_name}`} 
                                className="relative w-24 h-24 rounded-full border-3 border-white object-cover shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(`${user.first_name} ${user.last_name}`) + '&background=f59e0b&color=fff&size=96';
                                }}
                            />
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-2 transform group-hover:translate-y-1 transition-transform duration-500">
                            {`${user.first_name} ${user.last_name}`}
                        </h3>
                        
                        <div className="text-center space-y-1 transform group-hover:translate-y-1 transition-transform duration-500 delay-75">
                            <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                            {user.job_title && (
                                <p className="text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                                    {user.job_title}
                                </p>
                            )}
                        </div>
                        
                        <div className="mt-4 text-xs text-gray-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center space-x-1">
                                <svg className="h-3 w-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>Hover to view details</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="h-full bg-white rounded-2xl shadow-2xl border border-amber-200 p-6 flex flex-col">
                        <div className="text-center mb-4 pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {`${user.first_name} ${user.last_name}`}
                            </h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        
                        <div className="flex-1 space-y-3 text-sm">
                            {user.job_title && (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                    <div>
                                        <span className="font-medium text-gray-800">{user.job_title}</span>
                                        {user.company && <span className="text-gray-600"> @ {user.company}</span>}
                                    </div>
                                </div>
                            )}
                            
                            {(user.city || user.country) && (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-gray-700">
                                        {[user.city, user.country].filter(Boolean).join(', ')}
                                    </span>
                                </div>
                            )}
                            
                            {user.phone && (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-700">{user.phone}</span>
                                </div>
                            )}
                            
                            {user.website && (
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <a 
                                        href={user.website} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-amber-600 hover:text-amber-800 transition-colors duration-200 truncate max-w-[160px] hover:underline"
                                    >
                                        {user.website.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            )}
                            
                            {user.bio && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                                        {user.bio}
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                            <button 
                                onClick={() => onEdit(user)} 
                                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-center space-x-1"
                            >
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit</span>
                            </button>
                            <button 
                                onClick={() => onDelete(user._id)} 
                                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-center space-x-1"
                            >
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;