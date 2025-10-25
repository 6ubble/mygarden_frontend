import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/providers/QueryProvider/queryClient';
import { Router } from './app/providers/RouterProvider/Router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>
  );
}

export default App;
