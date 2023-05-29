/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { ISection } from "../components/MultiStepForm";

interface ISectionContext {
	sections: ISection[];
	updateSections: (data: ISection[]) => void;
}

export interface IProviderProps {
	children: React.ReactNode;
}

const SectionContext = createContext({} as ISectionContext);

export const SectionContextProvider = ({ children }: IProviderProps) => {
	const [sections, setSections] = useState<ISection[]>([
		{
			interval: [
				{
					startDate: "",
					endDate: "",
				},
			],
			valueType: "",
			amount: undefined,
		},
	]);

	const updateSections = (data: ISection[]) => {
		setSections(data);
		localStorage.setItem("formData", JSON.stringify(data));
	};

	return (
		<SectionContext.Provider
			value={{
				sections,
				updateSections,
			}}
		>
			{children}
		</SectionContext.Provider>
	);
};

export const useSectionContext = () => useContext(SectionContext);
