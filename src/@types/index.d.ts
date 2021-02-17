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
	size: number;
	vx: number;
	vy: number;
	vr: number;
}

interface Position {
	x: number;
	y: number;
}
