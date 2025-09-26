import React from 'react';
import type { User } from '../../types';

interface UserListItemProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit, onDelete }) => {
    return (
        <tr className="transition-colors hover:bg-gray-50 animate-fade-in-up">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button onClick={() => onDelete(user._id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
        </tr>
    );
};

export default UserListItem;

