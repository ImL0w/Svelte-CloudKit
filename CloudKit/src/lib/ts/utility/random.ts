export function randomInteger(max: number, min = 1): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomString(max: number): string {
	return Math.random()
		.toString(36)
		.substring(2, 2 + max);
}