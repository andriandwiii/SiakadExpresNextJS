import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'SMA Bunga - Sistem Informasi Akademik',
    description: 'Sistem Informasi Akademik untuk SMA Bunga, memudahkan pengelolaan data akademik dan siswa.',
    robots: { index: true, follow: true },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'SMA Bunga - Sistem Informasi Akademik',
        description: 'Sistem Informasi Akademik untuk SMA Bunga, memudahkan pengelolaan data akademik dan siswa.'
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
