'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const roles = [
  { label: 'KURIKULUM', value: 'KURIKULUM' },
  { label: 'KESISWAAN', value: 'KESISWAAN' },
  { label: 'KEUANGAN', value: 'KEUANGAN' },
  { label: 'TU_TASM', value: 'TU_TASM' },
  { label: 'BP_BKM', value: 'BP_BKM' },
  { label: 'ADMIN_WEB', value: 'ADMIN_WEB' },
  { label: 'GURU', value: 'GURU' },
  { label: 'SISWA', value: 'SISWA' },
];

const defaultValues = {
  name: '',
  email: '',
  role: 'KURIKULUM',
  password: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Nama wajib diisi'),
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  role: Yup.string().required('Role wajib dipilih'),
  password: Yup.string(),
});

const UserFormModal = ({ isOpen, onClose, onSubmit, user, mode }) => {
  const isEdit = mode === 'edit';

  const initialValues = user
    ? { name: user.name, email: user.email, role: user.role, password: '' }
    : defaultValues;

  const title = isEdit ? `Edit User: ${user?.name || ''}` : 'Tambah User';

  return (
    <Dialog style={{ minWidth: '50vw' }} header={title} visible={isOpen} onHide={onClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const payload = isEdit
            ? { name: values.name, email: values.email, role: values.role }
            : values; // include password for new user
          onSubmit(payload);
          actions.setSubmitting(false);
        }}
      >
        {({ values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div>
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                className="w-full mt-2"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="small" className="p-error" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                name="email"
                className="w-full mt-2"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="small" className="p-error" />
            </div>

            {!isEdit && (
              <div>
                <label htmlFor="password">Password</label>
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  className="w-full mt-2"
                  value={values.password}
                  onChange={handleChange}
                />
                <ErrorMessage name="password" component="small" className="p-error" />
              </div>
            )}

            <div>
              <label htmlFor="role">Role</label>
              <Dropdown
                id="role"
                name="role"
                value={values.role}
                options={roles}
                onChange={(e) => setFieldValue('role', e.value)}
                className="w-full mt-2"
                placeholder="Select Role"
              />
              <ErrorMessage name="role" component="small" className="p-error" />
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <Button label="Cancel" severity="secondary" onClick={onClose} />
              <Button
                label={isEdit ? 'Update' : 'Simpan'}
                type="submit"
                severity="success"
                disabled={isSubmitting}
                icon="pi pi-save"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserFormModal;
