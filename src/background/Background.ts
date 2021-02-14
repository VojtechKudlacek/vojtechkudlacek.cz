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
	private refilInterval!: NodeJS.Timeout;

	constructor(canvas: HTMLCanvasElement, entityCount: number) {
		this.canvas = canvas;
		this.entityCount = entityCount;
		this.stop = false;
		this.entities = [];
		this.ctx = canvas.getContext('2d')!;
		this.ctxManager = new ContextManager(this.ctx);
		this.entityFactory = new EntityFactory(16, '#777', 3);
		this.animate = this.animate.bind(this);
	}

	private get Size(): Size {
		return { width: this.canvas.width, height: this.canvas.height };
	}

	private refill(): void {
		this.refilInterval = setInterval(() => {
			if (this.entities.length < this.entityCount) {
				this.entities.push(this.entityFactory.createEntity(this.Size));
			}
		}, 500);
	}

	private process(): void {
		for (let i = 0; i < this.entities.length; i++) {
			this.entityFactory.processEntity(this.entities[i]);
			if (this.entityFactory.isOutOfscreen(this.entities[i], this.Size)) {
				this.entities.splice(i, 1);
				i--;
			}
		}
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < this.entities.length; i++) {
			const e = this.entities[i];
			this.ctxManager.drawRotatedSquareImage(e.src, e.size, e.x, e.y, e.r);
		}
	}

	private animate(): void {
		if (!this || this.stop) {
			return;
		}
		requestAnimationFrame(this.animate);
		this.process();
		this.render();
	}

	public init(): void {
		this.refill();
		this.animate();
	}

	public terminate(): void {
		this.stop = true;
		clearInterval(this.refilInterval);
	}

}

export default Background;
