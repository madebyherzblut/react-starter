import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
  <React.Suspense fallback={"Loading..."}>Hello World.</React.Suspense>,
  document.getElementById("root")
);
