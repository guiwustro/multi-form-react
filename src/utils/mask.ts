export const percentualMask = (value: string | number) => {
	if (!value) {
		return undefined;
	}
	if (typeof value === "number") {
		return `${Number(value).toFixed(2).replace(".", ",")} %`;
	}
	return `${Number(value.replace(",", ".")).toFixed(2).replace(".", ",")} %`;
};
