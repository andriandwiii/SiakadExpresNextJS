'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
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

const UserFormModal = ({ isOpen, onClose, onSubmit, user }) => {
  const isEdit = !!user;

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'KURIKULUM',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Nama wajib diisi'),
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    role: Yup.string().required('Role wajib dipilih'),
    password: !isEdit
      ? Yup.string().required('Password wajib diisi')
      : Yup.string(),
  });

  const handleSubmit = (values, actions) => {
    const payload = isEdit
      ? { name: values.name, email: values.email, role: values.role }
      : values; // create include password

    onSubmit(payload);
    actions.setSubmitting(false);
  };

  return (
    <Dialog
      header={isEdit ? 'Edit User' : 'Add User'}
      visible={isOpen}
      onHide={onClose}
      style={{ minWidth: '400px' }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div>
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                className="w-full mt-1"
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
                className="w-full mt-1"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="small" className="p-error" />
            </div>

            {!isEdit && (
              <div>
                <label htmlFor="password">Password</label>
                <Password
                  id="password"
                  name="password"
                  className="w-full mt-1"
                  value={values.password}
                  onChange={handleChange}
                  toggleMask
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
                className="w-full mt-1"
                placeholder="Select Role"
              />
              <ErrorMessage name="role" component="small" className="p-error" />
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <Button
                label="Cancel"
                severity="secondary"
                onClick={onClose}
              />
              <Button
                label={isEdit ? 'Update' : 'Create'}
                type="submit"
                severity="success"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserFormModal;
