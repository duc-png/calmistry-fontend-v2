import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { Loader, User, Shield, AlertTriangle } from 'lucide-react';

const AccountManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm(`Are you sure you want to change user role to ${newRole}?`)) return;

        try {
            await userService.updateUserRole(userId, newRole);
            toast.success("User role updated successfully");
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Failed to update role");
        }
    };

    if (loading) return <div className="text-center p-10"><Loader className="animate-spin m-auto" /></div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-blue-600" /> Account Management
            </h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.fullName || user.username}</div>
                                            <div className="text-sm text-gray-500">@{user.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.roles.includes('ADMIN') ? 'bg-red-100 text-red-800' :
                                            user.roles.includes('EXPERT') ? 'bg-purple-100 text-purple-800' :
                                                'bg-green-100 text-green-800'}`}>
                                        {user.roles.join(', ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {!user.roles.includes('ADMIN') && (
                                        <div className="flex gap-2">
                                            {user.roles.includes('USER') && !user.roles.includes('EXPERT') && (
                                                <button
                                                    onClick={() => handleRoleChange(user.id, 'EXPERT')}
                                                    className="text-purple-600 hover:text-purple-900 border border-purple-200 px-3 py-1 rounded hover:bg-purple-50 transition"
                                                >
                                                    Promote to Expert
                                                </button>
                                            )}
                                            {user.roles.includes('EXPERT') && (
                                                <button
                                                    onClick={() => handleRoleChange(user.id, 'USER')}
                                                    className="text-orange-600 hover:text-orange-900 border border-orange-200 px-3 py-1 rounded hover:bg-orange-50 transition"
                                                >
                                                    Demote to User
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountManagement;
