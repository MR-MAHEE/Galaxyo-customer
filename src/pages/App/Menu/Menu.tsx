import { BookOpen, Home, Contact, MoreHorizontal } from "lucide-react";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import BottomNavLayout from "../../../components/BottomNavLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { getCategoriesByBranchId } from "@/redux/actions/categoryActions";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get branchId from user redux state
  const branchId = useSelector(
    (state: RootState) => state.auth.userState.data?.branchId
  );
  console.log({ branchId });

  const {
    loading,
    success,
    data: categories,
  } = useSelector((state: RootState) => state.category.getCategoriesByBranchId);
  const error = !loading && !success && categories.length === 0;

  useEffect(() => {
    if (branchId) {
      dispatch(getCategoriesByBranchId(branchId));
    }
  }, [branchId, dispatch]);

  return (
    <BottomNavLayout>
      <div
        style={{ background: "#eaf2fb", minHeight: "100vh", paddingBottom: 90 }}
      >
        {/* Search Bar */}
        <div
          style={{
            padding: "32px 0 16px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 30,
              boxShadow: "0 1px 6px #0001",
              display: "flex",
              alignItems: "center",
              width: 340,
              height: 46,
              padding: "0 20px",
            }}
          >
            <input
              type="text"
              placeholder="Search item"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 16,
                flex: 1,
              }}
            />
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="9" r="7" />
              <line x1="16" y1="16" x2="13.5" y2="13.5" />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div
          style={{
            marginLeft: 24,
            marginTop: 8,
            fontWeight: 600,
            fontSize: 20,
            color: "#444",
          }}
        >
          Choose Categories
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            padding: "20px 24px 120px 24px",
          }}
        >
          {loading ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              <Spin size="large" />
            </div>
          ) : !categories || categories.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#888",
                padding: "40px 0",
              }}
            >
              <Empty description="No categories found" />
            </div>
          ) : (
            categories.map((cat: any, i: number) => (
              <div
                key={cat.id || i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 1px 8px #0001",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 10,
                  minHeight: 120,
                }}
              >
                <img
                  src={
                    cat?.img || cat?.image || "https://via.placeholder.com/70"
                  }
                  alt={cat?.name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{
                    fontSize: 15,
                    color: "#444",
                    fontWeight: 500,
                    width: 70,
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: 4,
                  }}
                  title={cat?.name}
                >
                  {cat?.name}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Navigation (fixed) */}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#111",
              cursor: "pointer",
            }}
            onClick={() => navigate("/menu")}
          >
            <BookOpen size={28} />
            <span style={{ fontSize: 13, marginTop: 2, fontWeight: 500 }}>
              Menu
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#888",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <Home size={28} />
            <span style={{ fontSize: 13, marginTop: 2 }}>Home</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#888",
              cursor: "pointer",
            }}
            onClick={() => navigate("/call-waiter")}
          >
            <Contact size={28} />
            <span style={{ fontSize: 13, marginTop: 2 }}>Call Waiter</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#888",
              cursor: "pointer",
            }}
            onClick={() => navigate("/more")}
          >
            <MoreHorizontal size={28} />
            <span style={{ fontSize: 13, marginTop: 2 }}>More</span>
          </div>
        </div>
      </div>
    </BottomNavLayout>
  );
};

export default Menu;
