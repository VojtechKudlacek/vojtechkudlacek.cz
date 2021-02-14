import ContextManager from './ContextManager';
import EntityFactory from './EntityFactory';

class Background {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private ctxManager: ContextManager;
	private entityFactory: EntityFactory;

	private entityCount: number;
	private entities: Array<MovingObject>;

	private stop: boolean;

	constructor(canvas: HTMLCanvasElement, entityCount: number) {
		this.canvas = canvas;
		this.entityCount = entityCount;
		this.stop = false;
		this.entities = [];
		this.ctx = canvas.getContext('2d')!;
		this.ctxManager = new ContextManager(this.ctx);
		this.entityFactory = new EntityFactory();
		this.animate = this.animate.bind(this);
	}

	private get Size(): Size {
		return { width: this.canvas.width, height: this.canvas.height };
	}

	private process(): void {
		while (this.entities.length < this.entityCount) {
			this.entities.push(this.entityFactory.createEntity(this.Size));
		}
	}

	private render(): void {

	}

	public animate(): void {
		if (!this || this.stop) {
			return;
		}
		requestAnimationFrame(this.animate);
		this.process();
		this.render();
	}

	public terminate(): void {
		this.stop = true;
	}

}

export default Background;
