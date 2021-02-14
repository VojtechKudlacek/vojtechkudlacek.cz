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

interface MovingObject {
	id: number;
	x: number;
	y: number;
	r: number; // Rotation
	vx: number;
	vy: number;
	vr: number; // Rotation velocity
	size: number;
	src: CanvasImageSource;
}
