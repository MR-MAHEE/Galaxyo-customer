import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { signIn } from "../../../redux/actions/authActions";
import { Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { resetSignInSuccess } from "../../../redux/reducers/authSlice";
import { getBranchById } from "../../../redux/actions/branchActions";

// Zod Schema for validation
const schema = z.object({
  username: z.string().min(1, "Username is required"), // Assuming username is username
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const BranchLogin = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { signIn: signInState } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data: branch } = useSelector(
    (state: RootState) => state.branch.branchData
  );

    // Fetch branch data on mount if branchId exists
  useEffect(() => {
    if (branchId) {
      dispatch(getBranchById(branchId));
    }
  }, [branchId, dispatch]);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle successful sign-in
  useEffect(() => {
    if (signInState.success) {
      // Navigate to the desired page after successful login, e.g., the menu or dashboard
      navigate("/menu"); // Replace with your desired route
      dispatch(resetSignInSuccess()); // Reset success state after navigation
    }
  }, [signInState.success, navigate, dispatch]);

  // Submit handler
  const onSubmit = (data: FormData) => {
    // Assuming 'username' corresponds to 'username' in the signIn payload
    dispatch(
      signIn({
        username: data.username,
        password: data.password,
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f2f6ff] flex items-center justify-center py-6 px-2">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {/* Placeholder for logo */}
            <span className="text-3xl text-theme font-bold">🏢</span>{" "}
            {/* Changed icon */}
          </div>
          <div>
            <div className="font-semibold text-lg md:text-xl text-gray-800">
              {branch?.branchName}
            </div>
            <div className="text-xs text-customGray mt-1">
            {`${branch?.address || ""}, ${branch?.district || ""}, ${
                  branch?.state || ""
                }`}
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <div className="text-center">
            <div className="font-bold text-xl md:text-2xl text-gray-800 mb-1">
              Welcome Back
            </div>
            <div className="font-semibold text-lg md:text-xl text-gray-700 mb-2">
              Sign In to Your Account
            </div>
            <div className="text-theme text-sm mb-2">
              Please enter your credentials to continue.
            </div>
          </div>
          {/* Ant Design Form */}
          <Form
            onFinish={handleSubmit(onSubmit)}
            layout="vertical"
            className="flex flex-col gap-4"
          >
            {/* Username Input */}
            <Form.Item
              label="Username"
              name="username"
              validateStatus={errors.username ? "error" : ""}
              help={errors.username?.message}
              className="mb-0"
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Your Username"
                    className="rounded-lg px-4 py-2 transition"
                  />
                )}
              />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              label="Password"
              name="password"
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
              className="mb-0"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Enter Your Password"
                    className="rounded-lg px-4 py-2 transition"
                  />
                )}
              />
            </Form.Item>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              loading={signInState.loading}
              className="w-full bg-theme hover:bg-purple-700 text-white font-semibold rounded-full py-3 mt-2 transition disabled:opacity-60 disabled:cursor-not-allowed text-lg border-none"
            >
              {signInState.loading ? "Signing In..." : "Sign In"}
            </Button>

            {signInState.success && !signInState.loading && (
              <div className="text-green-600 text-center text-sm mt-1">
                Sign in successful!
              </div>
            )}
          </Form>
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-customGray">Powered by</span>
            <span className="text-theme font-bold text-lg leading-tight">
              Galuxyo
            </span>
            <span className="text-xs text-customGray -mt-1">
              Restaurant POS software
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchLogin;
