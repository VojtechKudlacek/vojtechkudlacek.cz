class ImagePreloader {

	private readonly imagesToLoad: Array<string> = ['bio.png', 'home.png', 'projects.png', 'jspower.svg', 'vk.svg', 'vkmobile.svg'];

	private loaded: number = 0;

	public requiredToLoad: number = 0;

	constructor() {
		this.requiredToLoad = this.imagesToLoad.length;
	}

	public load(updateFn: (loadedCount: number) => void) {
		for (const src of this.imagesToLoad) {
			const image = new Image();
			image.onload = () => updateFn(++this.loaded);
			image.src = `/images/${src}`;
		}
	}

}

export default ImagePreloader;
