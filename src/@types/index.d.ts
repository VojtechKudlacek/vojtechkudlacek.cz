interface EmptyProperties { }

interface ChildrenProperties {
  children: ReactNode;
}

interface Dictionary<T> {
	[key: string]: T;
}

interface Size {
	width: number;
	height: number;
}

interface Velocity {
	vx: number;
	vy: number;
	vr: number; // Rotation velocity
}

interface Position {
	x: number;
	y: number;
}

interface MovingObject extends Position, Velocity {
	id: number;
	r: number; // Rotation
	size: number;
	src: CanvasImageSource;
}
