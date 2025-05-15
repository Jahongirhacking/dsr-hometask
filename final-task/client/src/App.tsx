import { LoadingOutlined } from "@ant-design/icons";
import { Suspense } from "react";
import Router from "./routes";
import "./style.scss";

const App = () => {
  return (
    <Suspense fallback={<LoadingOutlined />}>
      <Router />
    </Suspense>
  )
}

export default App
