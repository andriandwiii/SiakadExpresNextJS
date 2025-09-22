'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { getUsers } from "../../superadmin/menu/users/utils/api"; // sesuaikan path

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

    // Chart data
    const userRoleData = {
        labels: Object.keys(stats.roles),
        datasets: [
            {
                label: 'Users per Role',
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043', '#26A69A'],
                data: Object.values(stats.roles),
            },
        ],
    };
    const chartOptions = { plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false };

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

    if (loading) return <div className="h-screen flex justify-center items-center text-xl">Loading...</div>;

    return (
        <div className="grid p-4 gap-4">
            {/* Summary Cards */}
            <div className="col-12 lg:col-6 xl:col-3">
                <Card className="mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total Users</span>
                            <div className="text-900 font-medium text-xl">{stats.totalUsers}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-users text-blue-500 text-xl" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
                <Card className="mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Active Users</span>
                            <div className="text-900 font-medium text-xl">{stats.activeUsers}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-check-circle text-green-500 text-xl" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
                <Card className="mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Inactive Users</span>
                            <div className="text-900 font-medium text-xl">{stats.inactiveUsers}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-times-circle text-red-500 text-xl" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
                <Card className="mb-0">
                    <Button
                        label="Manage Users"
                        icon="pi pi-users"
                        className="p-button-sm p-button-info w-full"
                        onClick={() => router.push('/superadmin/menu/users')}
                    />
                </Card>
            </div>

            {/* Chart Users by Role */}
            <div className="col-12">
                <Card>
                    <h5 className="mb-3">Users by Role</h5>
                    <Chart type="doughnut" data={userRoleData} options={chartOptions} style={{ height: '300px' }} />
                </Card>
            </div>

            {/* Quick Info / Tips */}
            <div className="col-12 lg:col-4">
                <Card>
                    <h5 className="mb-2">Tip</h5>
                    <p>Periksa data pengguna secara berkala dan pastikan semua informasi terbaru.</p>
                </Card>
            </div>
            <div className="col-12 lg:col-4">
                <Card>
                    <h5 className="mb-2">Reminder</h5>
                    <p>Update hak akses pengguna sesuai peran mereka untuk menjaga keamanan.</p>
                </Card>
            </div>
            <div className="col-12 lg:col-4">
                <Card>
                    <h5 className="mb-2">Quick Action</h5>
                    <Button label="Add User" icon="pi pi-plus" className="p-button-success w-full" onClick={() => router.push('/superadmin/menu/users')} />
                </Card>
            </div>
        </div>
    );
}
