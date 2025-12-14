import { useRoutes } from "react-router-dom";
import router from "./router";

import { ConfigProvider } from "antd";

function BeforeRouterEnter() {
  const outlet = useRoutes(router);
  return outlet;
}

const primary_color = "#be4bdb";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: primary_color,
          },
          Checkbox: {
            colorPrimary: primary_color,
          },
        },
      }}
    >
      <div className="App">
        <BeforeRouterEnter />
      </div>
    </ConfigProvider>
  );
}

export default App;
