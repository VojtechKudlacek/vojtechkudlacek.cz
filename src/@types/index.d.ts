interface EmptyProperties { }

interface ChildrenProperties {
  children: ReactNode;
}

interface Dictionary<T> {
	[key: string]: T;
}

interface Velocity {
	vx: number;
	vy: number;
	vr: number; // Rotation velocity
}

interface Shape {
	content: import('pixi.js').Graphics;
	slowProgression: number;
	size: number;
	vx: number;
	originalVx: number;
	vy: number;
	originalVy: number;
	vr: number;
	originalVr: number;
}

interface Position {
	x: number;
	y: number;
}
