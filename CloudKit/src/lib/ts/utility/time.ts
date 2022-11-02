export const currentTime = (): string => {
	const today = new Date();
	return `${today.getHours()}:${today.getMinutes()}`;
};