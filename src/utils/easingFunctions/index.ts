// tslint:disable:no-parameter-reassignment
export const easeInOut = (t: number): number => t < 0.5 ? (16 * t * t * t * t * t) : (1 + 16 * (--t) * t * t * t * t);
export const easeOut = (t: number) => t * (2 - t);
