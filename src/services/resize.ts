type Subscriber = (width: number) => void;

class ResizeControl {

	private readonly DEBOUNCE: number = 1000;

	private subscribers: Array<Subscriber> = [];
	private processing: boolean = false;

	constructor() {
		this.onResize = this.onResize.bind(this);
		document.addEventListener('resize', this.onResize);
	}

	private onResize(): void {
		if (this.processing) {
			return;
		}
		this.processing = true;
		setTimeout(() => {
			for (const subscriber of this.subscribers) {
				subscriber(window.innerWidth);
			}
		}, this.DEBOUNCE);
	}

	public subscribe(fn: Subscriber) {
		this.subscribers.push(fn);
	}

	public unsubscribe(fn: Subscriber) {
		const index = this.subscribers.indexOf(fn);
		if (index >= 0) {
			this.subscribers.splice(index, 1);
		}
	}

}

const resizeControl = new ResizeControl();

export default resizeControl;
