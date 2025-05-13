// A simple toast hook for now, we'll enhance this later
export function useToast() {
  const toast = ({ title, description, variant = 'default' }) => {
    console.log(`[Toast - ${variant}] ${title}: ${description}`);
    // In a real implementation, this would show a toast notification
  };

  return { toast };
}