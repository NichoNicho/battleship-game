import React from "react";
import { Provider } from "react-redux";
import store from "$store";

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default TestWrapper;
