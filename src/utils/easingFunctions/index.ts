// tslint:disable:no-parameter-reassignment
export const easeInOut = (x: number): number => x < 0.5 ? (16 * x * x * x * x * x) : (1 + 16 * (--x) * x * x * x * x);
