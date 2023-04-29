export function createFakeArray(length: number) {
	return Array(length)
		.fill(0)
		.map((_, index) => index);
}
