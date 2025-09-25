/* eslint-disable @next/next/no-img-element */
'use client';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Nilai Siswa',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Absensi',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [students, setStudents] = useState<Demo.Product[]>([]);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Jumlah Siswa</span>
                            <div className="text-900 font-medium text-xl">350</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-users text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Absensi Siswa</span>
                            <div className="text-900 font-medium text-xl">95%</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-calendar text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Meningkat</span>
                    <span className="text-500">dari minggu lalu</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Nilai Rata-rata</span>
                            <div className="text-900 font-medium text-xl">85</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-chart-line text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Peningkatan</span>
                    <span className="text-500">dari tahun lalu</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tugas Belum Dinilai</span>
                            <div className="text-900 font-medium text-xl">32</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-pencil text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">Segera Dinilai</span>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Nilai Siswa Per Bulan</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <DataTable></DataTable>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Absensi Siswa Per Minggu</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <DataTable></DataTable>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Absensi Siswa Per Bulan</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <DataTable></DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
