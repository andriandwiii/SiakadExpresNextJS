"use client";
import React, { useContext, useState, useEffect } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [userRole, setUserRole] = useState<string | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const roleFromLocalStorage = localStorage.getItem("role");
    console.log("ROLE DI LOCALSTORAGE:", roleFromLocalStorage);
    setUserRole(roleFromLocalStorage);
  }
}, []);

  if (!userRole) return null;

  let model: any[] = [];

  // =========================
  // 1. SUPER ADMIN SEKOLAH
  // =========================
  if (userRole === "SUPER_ADMIN") {

    model = [
      {
        label: "Dashboard",
        items: [
          { label: "Dashboard Utama", icon: "pi pi-fw pi-chart-bar", to: "/superadmin/dashboard" },
        ],
      },
      {
        label: "Master Data",
        items: [
          { label: "Agama", icon: "pi pi-fw pi-building-columns", to: "/master/agama" },
          { label: "Aset Sekolah", icon: "pi pi-fw pi-warehouse", to: "/master/aset_sekolah" },
          { label: "Guru", icon: "pi pi-fw pi-users", to: "/master/guru" },
          { label: "Informasi Sekolah", icon: "pi pi-fw pi-info-circle", to: "/master/informasi_sekolah" },
          { label: "Kelas", icon: "pi pi-fw pi-th-large", to: "/master/kelas" },
          { label: "Kurikulum", icon: "pi pi-fw pi-book", to: "/master/kurikulum" },
          { label: "Mapel", icon: "pi pi-fw pi-bookmark", to: "/master/mapel" },
          { label: "User", icon: "pi pi-fw pi-user", to: "/superadmin/menu/users" },
        ],
      },
    ];
  }

  // =========================
  // 2. KURIKULUM
  // =========================
  else if (userRole === "Kurikulum") {
    model = [
      {
        label: "Dashboard Kurikulum",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/kurikulum/dashboard" }],
      },
      {
        label: "Akademik",
        items: [
          { label: "Pengaturan Jadwal Pelajaran", icon: "pi pi-fw pi-calendar", to: "/kurikulum/jadwal" },
          { label: "Ujian", icon: "pi pi-fw pi-pencil", to: "/kurikulum/ujian" },
          { label: "Cetak Rapor", icon: "pi pi-fw pi-file", to: "/kurikulum/rapor" },
          { label: "Perencanaan Kegiatan Belajar", icon: "pi pi-fw pi-book", to: "/kurikulum/rencana" },
        ],
      },
    ];
  }

  // =========================
  // 3. KESISWAAN
  // =========================
  else if (userRole === "Kesiswaan") {
    model = [
      {
        label: "Dashboard Kesiswaan",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/kesiswaan/dashboard" }],
      },
      {
        label: "Data Siswa",
        items: [
          { label: "Manajemen Data Siswa", icon: "pi pi-fw pi-users", to: "/kesiswaan/data-siswa" },
          { label: "Profil Siswa", icon: "pi pi-fw pi-id-card", to: "/kesiswaan/profil-siswa" },
        ],
      },
    ];
  }

  // =========================
  // 4. KEUANGAN
  // =========================
  else if (userRole === "Keuangan") {
    model = [
      {
        label: "Dashboard Keuangan",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/keuangan/dashboard" }],
      },
      {
        label: "Keuangan",
        items: [
          { label: "Manajemen Keuangan", icon: "pi pi-fw pi-wallet", to: "/keuangan/manajemen" },
          { label: "Laporan Keuangan", icon: "pi pi-fw pi-file", to: "/keuangan/laporan" },
        ],
      },
    ];
  }

  // =========================
  // 5. TU/TAS
  // =========================
  else if (userRole === "TU" || userRole === "TAS") {
    model = [
      {
        label: "Dashboard TU/TAS",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/tu/dashboard" }],
      },
      {
        label: "Kehadiran",
        items: [
          { label: "Absensi Siswa", icon: "pi pi-fw pi-user-check", to: "/tu/absensi-siswa" },
          { label: "Absensi Kelas", icon: "pi pi-fw pi-users", to: "/tu/absensi-kelas" },
          { label: "Agenda Guru", icon: "pi pi-fw pi-calendar", to: "/tu/agenda-guru" },
        ],
      },
    ];
  }

  // =========================
  // 6. BP/BK
  // =========================
  else if (userRole === "BP" || userRole === "BK") {
    model = [
      {
        label: "Dashboard BK",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/bk/dashboard" }],
      },
      {
        label: "Bimbingan Konseling",
        items: [
          { label: "Absensi Siswa", icon: "pi pi-fw pi-user-check", to: "/bk/absensi" },
          { label: "Catatan BK", icon: "pi pi-fw pi-file-edit", to: "/bk/catatan" },
        ],
      },
    ];
  }

  // =========================
  // 7. ADMIN WEB SEKOLAH
  // =========================
  else if (userRole === "Admin Web Sekolah") {
    model = [
      {
        label: "Dashboard Admin Web",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/adminweb/dashboard" }],
      },
      {
        label: "Pengelolaan Website",
        items: [
          { label: "Website Sekolah", icon: "pi pi-fw pi-globe", to: "/adminweb/website" },
          { label: "Media Sosial", icon: "pi pi-fw pi-share-alt", to: "/adminweb/sosial" },
        ],
      },
    ];
  }

  // =========================
  // 8. GURU
  // =========================
  else if (userRole === "Guru") {
    model = [
      {
        label: "Dashboard Guru",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/guru/dashboard" }],
      },
      {
        label: "Kehadiran & Mengajar",
        items: [
          { label: "Absensi Guru", icon: "pi pi-fw pi-user-check", to: "/guru/absensi" },
          { label: "Absensi Kelas", icon: "pi pi-fw pi-users", to: "/guru/absensi-kelas" },
          { label: "Agenda Mengajar", icon: "pi pi-fw pi-calendar", to: "/guru/agenda" },
        ],
      },
      {
        label: "Penilaian",
        items: [{ label: "Input Nilai", icon: "pi pi-fw pi-pencil", to: "/guru/nilai" }],
      },
    ];
  }

  // =========================
  // 9. SISWA
  // =========================
  else if (userRole === "Siswa") {
    model = [
      {
        label: "Dashboard Siswa",
        items: [{ label: "Beranda", icon: "pi pi-fw pi-home", to: "/siswa/dashboard" }],
      },
      {
        label: "Akademik",
        items: [
          { label: "Absensi Siswa", icon: "pi pi-fw pi-user-check", to: "/siswa/absensi" },
          { label: "Nilai & Rapor", icon: "pi pi-fw pi-book", to: "/siswa/nilai" },
          { label: "Informasi Sekolah", icon: "pi pi-fw pi-info-circle", to: "/siswa/informasi" },
        ],
      },
      {
        label: "Komunikasi",
        items: [
          { label: "Rumah - Sekolah", icon: "pi pi-fw pi-comments", to: "/siswa/komunikasi/rumah-sekolah" },
          { label: "Guru/Karyawan", icon: "pi pi-fw pi-users", to: "/siswa/komunikasi/guru" },
        ],
      },
    ];
  }

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => (
          <AppMenuitem item={item} root={true} index={i} key={i} />
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
