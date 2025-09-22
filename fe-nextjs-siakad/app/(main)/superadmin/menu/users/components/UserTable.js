'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function UserTable({ data, loading, onEdit, onDelete, onComplete }) {
  return (
    <DataTable
      value={data}
      paginator
      rows={10}
      loading={loading}
      scrollable
      size="small"
      className="text-sm"
      emptyMessage="No users found."
    >
      <Column field="id" header="ID" style={{ width: '60px' }} />
      <Column field="name" header="Name" filter />
      <Column field="email" header="Email" filter />
      <Column field="role" header="Role" />
      <Column
        field="created_at"
        header="Created At"
        body={(row) => (row.created_at ? new Date(row.created_at).toLocaleString() : '-')}
      />
      <Column
        field="updated_at"
        header="Updated At"
        body={(row) => (row.updated_at ? new Date(row.updated_at).toLocaleString() : '-')}
      />
      <Column
        header="Actions"
        body={(row) => (
          <div className="flex gap-2">
            <Button icon="pi pi-pencil" size="small" severity="warning" onClick={() => onEdit(row)} />
            <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => onDelete(row.id)} />
            {onComplete && (
              <Button icon="pi pi-check" size="small" severity="info" onClick={() => onComplete(row)} />
            )}
          </div>
        )}
        style={{ width: '180px' }}
      />
    </DataTable>
  );
}
