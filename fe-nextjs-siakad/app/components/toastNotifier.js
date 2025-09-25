'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Toast } from 'primereact/toast';


const ToastNotifier = forwardRef((_, ref) => {
  const toastRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showToast(status, message = '', action = null, duration = 3000, position = 'top-right') {
      let config = {
        life: duration,  
        position: position,  
        style: { marginTop: '10px' }, 
      };

      if (action) {
        config = {
          ...config,
          action: action,
        };
      }

      switch (status) {
        case '00':
          config = {
            ...config,
            severity: 'success',
            summary: 'Berhasil',
            detail: message || 'Data berhasil disimpan!',
          };
          break;
        case '01':
          config = {
            ...config,
            severity: 'error',
            summary: 'Gagal',
            detail: message || 'Terjadi kesalahan saat menyimpan!',
          };
          break;
        case '03':
          config = {
            ...config,
            severity: 'warn',
            summary: 'Peringatan',
            detail: message || 'Data tidak ditemukan!',
          };
          break;
        case '99':
          config = {
            ...config,
            severity: 'error',
            summary: 'Permintaan tidak valid',
            detail: message || 'Silakan periksa input Anda!',
          };
          break;
        default:
          config = {
            ...config,
            severity: 'info',
            summary: 'Info',
            detail: message || 'Status tidak diketahui!',
          };
      }

      toastRef.current?.show(config);
    },
  }));

  return (
    <Toast
      ref={toastRef}
      className="p-toast-custom"
      style={{ margin: '10px' }}  
    />
  );
});

ToastNotifier.displayName = 'ToastNotifier';
export default ToastNotifier;
