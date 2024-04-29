import React from "react";
import { Spinner } from "reactstrap";

function LoadingComponent() {
  return (
    <div className="mt-3 mb-3">
      <Spinner style={{ color: "#F45197" }} />
    </div>
  );
}

export default LoadingComponent;
