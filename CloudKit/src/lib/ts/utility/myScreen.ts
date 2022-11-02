import { mobile, desktop } from '../constants/screen';

/**
 * Returns true|false if given width represents desired screen
 * @param {number} screenWidth width to verify (window.innerWidth)
 * @return True/False
 */
const Screen = {
	isMobile: (screenWidth: number): boolean => {
		return screenWidth <= mobile;
	},
	isTablet: (screenWidth: number): boolean => {
		return screenWidth > mobile && screenWidth < desktop;
	},
	isDesktop: (screenWidth: number): boolean => {
		return screenWidth >= desktop;
	}
};

export default Screen;