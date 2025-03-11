export const getCssVariable = (name: string) => {
	return window.getComputedStyle(document.body).getPropertyValue(name);
};
