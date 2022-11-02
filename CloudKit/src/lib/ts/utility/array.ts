// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * 
 * @param key Object key to store it's value
 * @param objects Array of objects
 * @returns  Normal array
 * @example Input ==> "tony", [{tony: "123"}, {tony: "nana", notony: "no"}]
 * Output ==> ["123", "nana"]
 */
export function objectsToRaw(key: string, ...objects: object[]): Array<any> {
	const rawArray = [];
	objects.forEach((value) => {
		rawArray.push(value[key]);
	});
	return rawArray;
}

/**
 * 
 * @param classList array of strings to be concatinated with spaces
 * @returns String with desired classes concatinated
 * @example Input ==> ["class1", "class2", "class3"]
 * Output ==> "class1 class2 class3"
 */
export function concatClasses(...classList: string[]): string {
	classList.forEach((className, i) => {
		classList[i] = className.concat(i !== classList.length - 1 ? ' ' : '');
	});
	return ''.concat(...classList);
}