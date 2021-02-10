interface EmptyProperties { }

interface ChildrenProperties {
  children: ReactNode;
}

interface Dictionary<T> {
	[key: string]: T;
}

interface Point {
	id: number;
	x: number;
	y: number;
	z: number;
	size: number;
}

interface Vector {
	vx: number;
	vy: number;
}

type DynamicPoint = Point & Vector & { speed: number; };
