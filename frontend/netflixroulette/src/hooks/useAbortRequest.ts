import React from "react";

export default (controller: AbortController) => {
  React.useEffect(
    () => () => {
      controller.abort();
    },
    [controller]
  );
};
