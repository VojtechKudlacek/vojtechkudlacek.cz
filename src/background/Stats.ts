class Stats {

	private records: number;
	private barWidth: number;

	private fps: number;
	private history: Array<number>;
	private ctx: CanvasRenderingContext2D;

	public dom: HTMLCanvasElement;

	constructor(records: number = 30, barWidth: number = 3) {
		this.records = records;
		this.barWidth = barWidth;
		this.fps = 0;
		this.history = [];
		this.dom = document.createElement('canvas');
		this.dom.style.position = 'absolute';
		this.dom.style.left = '0';
		this.dom.style.top = '0';
		this.dom.style.border = '1px solid #00FFFF';
		this.dom.style.zIndex = '999';
		this.dom.width = this.records * this.barWidth;
		this.dom.height = 50;
		this.ctx = this.dom.getContext('2d')!;
		this.ctx.strokeStyle = '#00FFFF';
		this.ctx.fillStyle = '#00FFFF';
		this.ctx.font = '16px sans-serif';
		this.startInterval();
		this.updateDom();
	}

	private updateHistory(): void {
		this.history.push(this.fps);
		if (this.history.length > this.records) {
			this.history.shift();
		}
	}

	private updateDom(): void {
		this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
		for (let i = 0; i < this.history.length; i++) {
			const fps = this.history[i];
			const barHeight = Math.floor(fps / 2); // 60fps = 30px
			this.ctx.beginPath();
			this.ctx.rect(i * this.barWidth, this.dom.height - barHeight, this.barWidth, barHeight);
			this.ctx.fill();
		}
		if (this.history.length) {
			this.ctx.fillText(String(this.history[this.history.length - 1]), 4, 16);
		} else {
			this.ctx.fillText('Wait', 4, 16);
		}
	}

	private startInterval(): void {
		const i = setInterval(() => {
			if (!this) {
				clearInterval(i);
				return;
			}
			this.updateHistory();
			this.updateDom();
			this.fps = 0;
		}, 1000);
	}

	public tick(): void {
		this.fps++;
	}

}

export default Stats;
