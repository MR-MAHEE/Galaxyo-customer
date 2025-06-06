import React, { useEffect } from "react";
import { BookOpen, Home, Contact, MoreHorizontal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUser } from "@/redux/actions/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const navs = [
  { label: "Menu", icon: BookOpen, path: "/menu" },
  { label: "Home", icon: Home, path: "/home" },
  { label: "Call Waiter", icon: Contact, path: "/call-waiter" },
  { label: "More", icon: MoreHorizontal, path: "/more" },
];

const BottomNavLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div
      style={{ background: "#eaf2fb", minHeight: "100vh", paddingBottom: 90 }}
    >
      <div>{children}</div>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          boxShadow: "0 -2px 16px #0002",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 70,
          zIndex: 100,
        }}
      >
        {navs.map((nav) => {
          const Icon = nav.icon;
          const isActive = location.pathname === nav.path;
          return (
            <div
              key={nav.path}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: isActive ? "#111" : "#888",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
              }}
              onClick={() => navigate(nav.path)}
            >
              <Icon size={28} />
              <span style={{ fontSize: 13, marginTop: 2 }}>{nav.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavLayout;
