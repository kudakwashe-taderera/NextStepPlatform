import { toast } from 'react-hot-toast';

interface ToastOptions {
  title?: string;
  description: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const showToast = ({ title, description, variant = 'default', duration = 3000 }: ToastOptions) => {
    switch (variant) {
      case 'success':
        return toast.success(description, { duration });
      case 'error':
        return toast.error(description, { duration });
      case 'warning':
        return toast(description, {
          icon: '⚠️',
          duration,
          style: {
            backgroundColor: '#FFFAEB',
            color: '#995400',
            border: '1px solid #FFE4B8'
          }
        });
      default:
        return toast(description, { duration });
    }
  };

  return { toast: showToast };
};
