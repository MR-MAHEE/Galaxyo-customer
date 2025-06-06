import { notification } from "antd";

export const errorToast = async (errorMsg) => {
  const message = "Something went wrong";
  
  if (errorMsg) {
    notification.error({ message: errorMsg ?? message });
  }
};

export const successToast = async (message: string) => {
  if (message) {
    notification.success({ message });
  }
};
