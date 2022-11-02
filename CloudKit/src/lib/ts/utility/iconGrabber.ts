type Extension = 'svg' | 'png';

class iconGrabber {
	private rootAssets: string;
	private extension: Extension;

	constructor(extension: Extension, rootAssets = '/assets') {
		this.extension = extension;
		this.rootAssets = rootAssets;
	}

	/**
	 *
	 * @param context folder name where the icon is
	 * @param name exact file name `without extension`
	 * @returns absolute path of the icon
	 */
	get(context: 'country' | 'logos' | 'interact', name: string): string {
		return `${this.rootAssets}/${context}/${name}.${this.extension}`;
	}
}

/** This singleton returns (trough it's get function) the absolute path of an available icon (png).*/
const grabberPNG = new iconGrabber('png');
/** This singleton returns (trough it's get function) the absolute path of an available icon (svg).*/
const grabberSVG = new iconGrabber('svg');

export { grabberSVG, grabberPNG };