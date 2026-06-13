import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4">Page not found</p>
        <a href="/" className="mt-6 inline-block underline">Go home</a>
      </div>
    </div>
  ),
});