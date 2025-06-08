import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import NotFound from "./pages/NotFound";
import Customer from "./pages/Auth/Customer";
import BranchLogin from "./pages/Auth/BranchLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./pages/App/Menu";
import Home from "./pages/App/Home";
import CallWaiter from "./pages/App/CallWaiter";
import More from "./pages/App/More";
import Profile from "./pages/App/Profile";

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
              <Route path="/call-waiter" element={<CallWaiter />} />
              <Route path="/more" element={<More />} />

              {/* Employee Routes */}
              <Route path="/profile" element={<Profile />} />
              {/* Redirect / to /menu */}
              <Route path="/" element={<Navigate to={localStorage.getItem("role") === "employee" ? "/profile" : "/menu"} replace />} />
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
