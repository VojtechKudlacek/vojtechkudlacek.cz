import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

export default function* steps() {
	yield* step1();
	yield* step2();
	yield* step3();
}
