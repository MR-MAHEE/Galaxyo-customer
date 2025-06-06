import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import NotFound from "./pages/NotFound";
import Customer from "./pages/Auth/Customer";
import BranchLogin from "./pages/Auth/BranchLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./pages/App/Menu";
import Home from "./pages/App/Home";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="h-screen flex justify-center items-center italic font-mono text-theme text-4xl font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Auth Routes */}
            <Route path="/customer/:tableId" element={<Customer />} />
            <Route path="/branch-login/:branchId" element={<BranchLogin />} />

            {/* Protected AppRoutes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/menu" element={<Menu />} />
              <Route path="/home" element={<Home />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
