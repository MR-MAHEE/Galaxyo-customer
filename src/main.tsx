import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import theme from "./styles/theme.ts";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>
);
