import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SectionContextProvider } from "../contexts/SectionContext";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return <SectionContextProvider>{children}</SectionContextProvider>;
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
