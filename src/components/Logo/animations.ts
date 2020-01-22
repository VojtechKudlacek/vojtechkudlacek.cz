export const animateLogo = (progress: number): string => {
	const left = 251 * progress;
	const right = 512 - (225 * progress);
	const path = `M ${left} 0 L ${left + 42} 0 L 251 426 L 251 0 L 287 0 L 287 204 L` +
		`${Math.max(right - 51, 251)} 0 L ${right} 0 L 287 256 L ${right} 512 L` +
		`${Math.max(right - 51, 251)} 512 L 287 308 L 287 512 L 251 512 Z`;
	return path;
};

export const animateLine = (progress: number): string => {
	const top = 330 * progress;
	const bottom = 512 - (134 * progress);
	const path = `M 251 ${top} L 287 ${top} L 287 ${bottom} L 251 ${bottom} Z`;
	return path;
};

export const animateSmileyFace = (progress: number): string => {
	const left = 251 - (191 * progress);
	const right = 287 + (165 * progress);
	const top = 330 - (60 * progress);
	const bottom = 330 + (60 * progress);
	const path = `M ${left} ${top} Q 256 ${bottom} ${right} ${top} L ${right} ${top + 48} Q 256 ${bottom + 48} ${left} ${top + 48} Z`;
	return path;
};

export const animateSmileyEye = (progress: number): number => {
	const size = 32 + (progress * 16);
	return size;
};
