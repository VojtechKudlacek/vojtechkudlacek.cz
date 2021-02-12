interface EmptyProperties { }

interface ChildrenProperties {
  children: ReactNode;
}

interface Dictionary<T> {
	[key: string]: T;
}

interface MovingObject {
	id: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	speed: number;
}
