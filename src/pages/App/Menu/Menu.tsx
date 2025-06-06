import { BookOpen, Home, Contact, MoreHorizontal } from "lucide-react";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import BottomNavLayout from "../../../components/BottomNavLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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

  const [search, setSearch] = useState("");

  // Filter categories by name (case-insensitive)
  const filteredCategories =
    categories?.filter((cat: any) =>
      cat?.name?.toLowerCase().includes(search.toLowerCase())
    ) || [];
  const error = !loading && !success && categories.length === 0;

  useEffect(() => {
    if (branchId) {
      dispatch(getCategoriesByBranchId(branchId));
    }
  }, [branchId, dispatch]);

  return (
    <BottomNavLayout>
      <div className="bg-[#eaf2fb] min-h-screen pb-[90px]">
        {/* Search Bar */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="flex items-center w-[340px] h-[46px] bg-white rounded-full shadow px-5">
            <input
              type="text"
              placeholder="Search item"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-none bg-transparent text-base flex-1"
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
        <div className="ml-6 mt-2 font-semibold text-[20px] text-[#444]">
          Choose Categories
        </div>
        <div className="grid grid-cols-3 gap-5 px-6 pt-5 pb-[120px]">
          {loading ? (
            <div className="col-span-3 text-center py-10">
              <Spin size="large" />
            </div>
          ) : !categories || categories.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10">
              <Empty description="No categories found" />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10">
              <Empty description="No categories found" />
            </div>
          ) : (
            filteredCategories.map((cat: any, i: number) => (
              <div
                key={cat.id || i}
                className="bg-white rounded-xl shadow flex flex-col items-center p-2.5 min-h-[120px]"
              >
                <img
                  src={cat?.img || cat?.image || "https://via.placeholder.com/70"}
                  alt={cat?.name}
                  className="w-[70px] h-[70px] object-cover rounded-lg mb-2"
                />
                <div
                  className="text-[15px] text-[#444] font-medium w-[70px] text-center overflow-hidden text-ellipsis whitespace-nowrap mt-1"
                  title={cat?.name}
                >
                  {cat?.name}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Navigation (fixed) */}
        <div className="fixed left-0 right-0 bottom-0 bg-white rounded-t-[18px] shadow-[0_-2px_16px_#0002] flex justify-around items-center h-[70px] z-[100]">
          <div
            className="flex flex-col items-center text-[#111] cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            <BookOpen size={28} />
            <span className="text-[13px] mt-0.5 font-medium">Menu</span>
          </div>
          <div
            className="flex flex-col items-center text-[#888] cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <Home size={28} />
            <span className="text-[13px] mt-0.5">Home</span>
          </div>
          <div
            className="flex flex-col items-center text-[#888] cursor-pointer"
            onClick={() => navigate("/call-waiter")}
          >
            <Contact size={28} />
            <span className="text-[13px] mt-0.5">Call Waiter</span>
          </div>
          <div
            className="flex flex-col items-center text-[#888] cursor-pointer"
            onClick={() => navigate("/more")}
          >
            <MoreHorizontal size={28} />
            <span className="text-[13px] mt-0.5">More</span>
          </div>
        </div>
      </div>
    </BottomNavLayout>
  );
};

export default Menu;
