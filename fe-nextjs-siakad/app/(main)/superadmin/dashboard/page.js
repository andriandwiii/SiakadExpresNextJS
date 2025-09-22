'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import { getUsers } from "../../superadmin/menu/users/utils/api"; // pastikan path sesuai

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        roles: {}
    });

    const userRoleData = {
        labels: Object.keys(stats.roles),
        datasets: [
            {
                label: 'Jumlah Users per Role',
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043', '#26A69A'],
                data: Object.values(stats.roles),
            },
        ],
    };

    const options = { plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedName = localStorage.getItem("name");

        if (!token) {
            router.push("/"); // redirect ke login jika belum login
        } else {
            if (storedName) setName(storedName);
            fetchStats(token);
        }
    }, [router]);

    const fetchStats = async (token) => {
        setLoading(true);
        try {
            const users = await getUsers(token); // ambil data user
            const total = users.length;
            const active = users.filter(u => u.is_active !== false).length; // asumsi ada is_active
            const inactive = total - active;

            // hitung per role
            const roles = {};
            users.forEach(u => {
                if (u.role) roles[u.role] = (roles[u.role] || 0) + 1;
            });

            setStats({ totalUsers: total, activeUsers: active, inactiveUsers: inactive, roles });
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Haii, {name || "Super Admin"} 👋</h1>
            <p className="text-gray-600">Selamat datang di dashboard SUPER ADMIN !!!</p>

            <Divider />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card title="Total Users" className="bg-blue-100 border-blue-300">
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </Card>
                <Card title="Active Users" className="bg-green-100 border-green-300">
                    <div className="text-2xl font-bold">{stats.activeUsers}</div>
                </Card>
                <Card title="Inactive Users" className="bg-red-100 border-red-300">
                    <div className="text-2xl font-bold">{stats.inactiveUsers}</div>
                </Card>
                <Card title="Manage Users">
                    <Button label="Go to Users" icon="pi pi-users" className="p-button-sm p-button-info" onClick={() => router.push('/superadmin/menu/users')} />
                </Card>
            </div>

            {/* Chart */}
            <div className="mt-6 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Users by Role</h3>
                <Chart type="doughnut" data={userRoleData} options={options} style={{ height: '300px' }} />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card title="Tip" className="bg-yellow-50 border-yellow-300">
                    <p>Periksa data pengguna secara berkala dan pastikan semua informasi terbaru.</p>
                </Card>
                <Card title="Reminder" className="bg-purple-50 border-purple-300">
                    <p>Update hak akses pengguna sesuai peran mereka untuk menjaga keamanan.</p>
                </Card>
                <Card title="Quick Action" className="bg-teal-50 border-teal-300">
                    <Button label="Add User" icon="pi pi-plus" className="p-button-sm p-button-success" onClick={() => router.push('/users')} />
                </Card>
            </div>
        </div>
    );
}
