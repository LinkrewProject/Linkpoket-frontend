import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Router from './routes/Router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 32,
          zIndex: 20000,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(28, 28, 28, 0.8)',
            color: 'var(--color-primary-0)',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontSize: '14px',
          },
        }}
      />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
