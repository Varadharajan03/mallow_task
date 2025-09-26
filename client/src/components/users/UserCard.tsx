import React from 'react';
import type { User } from '../../types';

interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <div className="[perspective:1000px]">
            <div className="relative h-64 w-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-5 flex flex-col items-center justify-center text-center animate-scale-in [backface-visibility:hidden]">
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-24 h-24 rounded-full mb-4 shadow" />
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center rotate-y-180 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{`${user.first_name} ${user.last_name}`}</h3>
                    <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                    <div className="text-xs text-gray-600 space-y-1 mb-4">
                        {user.job_title && <div>{user.job_title}{user.company ? ` @ ${user.company}` : ''}</div>}
                        {(user.city || user.country) && <div>{[user.city, user.country].filter(Boolean).join(', ')}</div>}
                        {user.phone && <div>{user.phone}</div>}
                        {user.website && <div className="truncate max-w-[200px]"><a className="text-indigo-600 hover:underline" href={user.website} target="_blank" rel="noreferrer">{user.website}</a></div>}
                    </div>
                    <div className="flex space-x-2 mt-auto">
                        <button onClick={() => onEdit(user)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                        <button onClick={() => onDelete(user._id)} className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;

