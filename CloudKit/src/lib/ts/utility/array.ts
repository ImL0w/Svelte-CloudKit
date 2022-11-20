/**
 * @param key Object key to store it's value
 * @param objects Array of objects
 * @returns  Normal array
 * @example Input ==> "tony", [{tony: "123"}, {tony: "nana", notony: "no"}]
 * Output ==> ["123", "nana"]
 */

export function extractObjValues(key: string, ...objects: object[]): never[] {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return objects.map((obj) => obj[key] ?? undefined)?.filter((obj) => obj) || [];
}

/**
 *
 * @param classList array of strings to be concatinated with spaces
 * @returns String with desired classes concatinated
 * @example Input ==> ["class1", "class2", "class3"]
 * Output ==> "class1 class2 class3"
 */
export function concatClasses(...classList: string[]): string {
	return ''.concat(
		...classList
			.filter((value) => value)
			.map((className, index, filtered) => className.concat(index < filtered.length - 1 ? ' ' : ''))
	);
}