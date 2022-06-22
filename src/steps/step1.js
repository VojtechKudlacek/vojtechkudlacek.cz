import sleep from '../utils/sleep';
import { classes, waitForClick, centerOnScreen, unlock } from '../utils/dom';
import { typeText, untypeText, vanishRest } from '../utils/typing';

export default function* step1() {
	const interactive = document.getElementById('interactive');
	const cx = classes(interactive);

	yield sleep(1000);
	cx.remove('invisible');
	yield waitForClick(interactive, true);
	yield untypeText(interactive, 70);
	yield sleep(300);
	yield typeText(interactive, 'I\'m Vojtech', 70);
	yield sleep(500);
	yield typeText(interactive, 'I\'m Vojtech ........... ', 100);
	yield typeText(interactive, 'I\'m Vojtech ........... and', 70);
	yield sleep(1000);
	cx.remove('transition');
	yield vanishRest(interactive, 'tech');
	yield sleep(1000);
	yield typeText(interactive, 'tech is awesome!', 70);
	yield sleep(1500);
	cx.remove('transition');
	yield vanishRest(interactive, 'awesome');
	yield sleep(1000);
	cx.add('transition');
	centerOnScreen(interactive);
	yield sleep(500);
	unlock(interactive);
	yield waitForClick(interactive, true);
	yield untypeText(interactive, 70);
	yield typeText(interactive, 'Unfortunately this web is still in progress. :(', 70);
}
