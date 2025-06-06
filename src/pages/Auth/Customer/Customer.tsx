import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { createCustomer } from "../../../redux/actions/customerAction";
import { Form, Input, Button, InputNumber } from "antd"; // Ant Design imports
import { useForm, Controller } from "react-hook-form"; // React Hook Form imports
import { z } from "zod"; // Zod import
import { zodResolver } from "@hookform/resolvers/zod"; // Zod Resolver import

// Define CustomerPayload interface locally for clarity
interface CustomerPayload {
  name: string;
  phone: string;
  tableId: string;
  noOfGuest: string;
}

// Zod Schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number (10 digits required)"),
  noOfGuest: z
    .number({ invalid_type_error: "Number of guests is required" })
    .min(1, "Number of guests must be at least 1"),
});

type FormData = z.infer<typeof schema>;

const Customer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, customer } = useSelector(
    (state: RootState) => state.customer
  );

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      noOfGuest: 1, // Default to 1 guest
    },
  });

  // Replace this with actual tableId logic if available
  const tableId = "68261ed6f2cd67133c370d5e";

  // Submit handler using React Hook Form's handleSubmit
  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      noOfGuest: String(data.noOfGuest), // Convert number to string for the payload
      tableId,
    } as CustomerPayload; // Explicitly cast to CustomerPayload
    dispatch(createCustomer(payload));
  };

  return (
    <div className="min-h-screen bg-[#f2f6ff] flex items-center justify-center py-6 px-2">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {/* Placeholder for logo */}
            <span className="text-3xl text-theme font-bold">🍽️</span>
          </div>
          <div>
            <div className="font-semibold text-lg md:text-xl text-gray-800">
              Amba Family Bar & Restaurant
            </div>
            <div className="text-xs text-customGray mt-1">
              163, Tilak Road, Vishrantwadi Pune
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <div className="text-center">
            <div className="font-bold text-xl md:text-2xl text-gray-800 mb-1">
              Welcome to <span className="text-theme">[Restaurant_Name]</span>!
            </div>
            <div className="font-semibold text-lg md:text-xl text-gray-700 mb-2">
              Let's Get Started
            </div>
            <div className="text-theme text-sm mb-2">
              Please share a few details to begin your order.
            </div>
          </div>
          {/* Ant Design Form */}
          <Form
            onFinish={handleSubmit(onSubmit)}
            layout="vertical"
            className="flex flex-col gap-4" // Apply existing gap
          >
            {/* Name Input */}
            <Form.Item
              label="Name"
              name="name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
              className="mb-0" // Adjust margin as needed
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Your Name"
                    className="rounded-lg px-4 py-2 transition" // Apply existing styles
                  />
                )}
              />
            </Form.Item>

            {/* Phone Input */}
            <Form.Item
              label="Mobile Number"
              name="phone"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone?.message}
              className="mb-0" // Adjust margin as needed
            >
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Your Mobile Number"
                    className="rounded-lg px-4 py-2 transition" // Apply existing styles
                    type="tel" // Use tel type for mobile input
                  />
                )}
              />
            </Form.Item>

            {/* No. of Guest Input */}
            <Form.Item
              label="No. of Person / Guest"
              name="noOfGuest"
              validateStatus={errors.noOfGuest ? "error" : ""}
              help={errors.noOfGuest?.message as string} // Cast to string as help expects string
              className="mb-0" // Adjust margin as needed
            >
              <Controller
                name="noOfGuest"
                control={control}
                render={({ field }) => (
                  // Ant Design InputNumber requires value and onChange
                  <InputNumber
                    {...field}
                    min={1}
                    placeholder="No. of person / Guest"
                    className="rounded-lg px-4 py-2 transition w-full" // Apply existing styles and make it full width
                    // InputNumber's onChange provides the number directly
                    onChange={(value) => {
                      // Convert null or undefined to 1, otherwise use the number value
                      field.onChange(
                        value === null || value === undefined ? 1 : value
                      );
                    }}
                    value={field.value === undefined ? 1 : field.value} // Ensure value is not undefined for InputNumber
                  />
                )}
              />
            </Form.Item>

            <div className="text-xs text-customGray text-center">
              This information helps us with billing and to recognize our valued
              guests. We respect your privacy
            </div>

            {/* Submit Button */}
            <Button
              type="primary" // Ant Design primary button style
              htmlType="submit"
              loading={loading}
              className="w-full bg-theme hover:bg-purple-700 text-white font-semibold rounded-full py-3 mt-2 transition disabled:opacity-60 disabled:cursor-not-allowed text-lg border-none" // Apply existing styles and remove border
            >
              {loading ? "Processing..." : "Enter the menu"}
            </Button>

            {error && (
              <div className="text-red-500 text-center text-sm mt-1">
                {error}
              </div>
            )}
            {customer && !loading && (
              <div className="text-green-600 text-center text-sm mt-1">
                Welcome, {customer?.name || "Guest"}!{" "}
                {/* Use 'Guest' as fallback */}
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

export default Customer;
