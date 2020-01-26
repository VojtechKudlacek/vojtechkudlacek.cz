interface EmptyProperties { }

interface ChildrenProperties {
  children: ReactNode;
}

interface LooseObject<T = any> {
	[key: string]: T;
}

interface ReducerAction {
	type: string;
	payload?: any;
}

type DispatchFunction = (action: ReducerAction) => void;

interface AppState {
	sceneChanging: boolean;
	projects: Array<Project>;
}

interface Project {
	name: string;
	description: string;
	link: string;
}
