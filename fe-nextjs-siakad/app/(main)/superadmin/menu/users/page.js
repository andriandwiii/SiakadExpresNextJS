'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUsers, createUser, updateUser, deleteUser } from "./utils/api";
import UserFormModal from "./components/UserFormModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ToastNotifier from "./../../../../components/ToastNotifier";

export default function UsersPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const toastRef = useRef(null);

  // cek token
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) router.push("/");
    else setToken(t);
  }, [router]);

  // ambil data user
  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers(token);
      setUsers(res || []);
    } catch (err) {
      console.error("Fetch users failed:", err);
      toastRef.current?.showToast('01', 'Gagal memuat data user');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        await updateUser(token, editingUser.id, data);
        toastRef.current?.showToast('00', 'User berhasil diupdate');
      } else {
        await createUser(token, data);
        toastRef.current?.showToast('00', 'User berhasil dibuat');
      }
      await fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Gagal simpan user:", err);
      toastRef.current?.showToast('01', 'Gagal menyimpan user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    if (confirm("Yakin mau hapus user ini?")) {
      try {
        await deleteUser(token, user.id);
        toastRef.current?.showToast('00', 'User berhasil dihapus');
        await fetchUsers();
      } catch (err) {
        console.error("Delete user failed:", err);
        toastRef.current?.showToast('01', 'Gagal menghapus user');
      }
    }
  };

  const handleComplete = (user) => {
    toastRef.current?.showToast('03', `Lengkapi data user: ${user.name}`);
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" severity="warning" onClick={() => handleEdit(rowData)} />
      <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleDelete(rowData)} />
      <Button icon="pi pi-check" size="small" severity="info" onClick={() => handleComplete(rowData)} />
    </div>
  );

  return (
    <div className="p-4">
      <ToastNotifier ref={toastRef} />

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button
          label="Add User"
          icon="pi pi-plus"
          severity="primary"
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      <DataTable
        value={users}
        paginator
        rows={10}
        loading={loading}
        size="small"
        className="text-sm"
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" style={{ width: '60px' }} />
        <Column field="name" header="Name" filter />
        <Column field="email" header="Email" filter />
        <Column field="role" header="Role" />
        <Column
          field="created_at"
          header="Created At"
          body={(row) => row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
        />
        <Column
          field="updated_at"
          header="Updated At"
          body={(row) => row.updated_at ? new Date(row.updated_at).toLocaleString() : '-'}
        />
        <Column header="Actions" body={actionBodyTemplate} style={{ width: '180px' }} />
      </DataTable>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        user={editingUser}
      />
    </div>
  );
}
