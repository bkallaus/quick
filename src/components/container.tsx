import React, { ReactNode } from "react";

const CalculationContainer = ({ children }: { children: ReactNode }) => {
  return (
    <article
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
      }}
    >
      {children}
    </article>
  );
};

export default CalculationContainer;
