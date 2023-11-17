import { createEventListener } from '@solid-primitives/event-listener';
import { createHydratableSingletonRoot } from '@solid-primitives/rootless';
import { MaybeAccessor, access } from '@solid-primitives/utils';
import { clamp } from 'lodash';
import { Accessor, AccessorArray, Signal, createEffect, createSignal, on, onMount } from 'solid-js';
import { isAccessor } from '~/lib/lib';
import { Immutable, Vec2D } from '~/lib/types';

export const useWheelDelta = createHydratableSingletonRoot(() => {
	const [delta, setDelta] = createSignal<Vec2D>([0, 0]);
	onMount(() => createEventListener(window, 'wheel', (e) => setDelta([e.deltaX, e.deltaY])));
	return delta;
});

/**
 * Creates a reactive index, ensuring it stays within the range of 0 to the array's last index when set. If a reactive accessor is provided, automatically adjusts the index to remain in bounds when the array length changes.
 */
export function createIdx<T>(arr: MaybeAccessor<Immutable<T[]>>, initVal = 0): Signal<number> {
	const [idx, _setIdx] = createSignal(clamp(initVal, 0, access(arr).length - 1));

	if (isAccessor(arr))
		createEffectOn(arr as Accessor<T[]>, () =>
			_setIdx(clamp(idx(), 0, (arr as Accessor<T[]>)().length - 1))
		);

	function setIdx(val: number | ((prev: number) => number)) {
		const newVal = typeof val === 'function' ? val(idx()) : val;
		_setIdx(clamp(newVal, 0, access(arr).length - 1));
		return newVal;
	}

	return [idx, setIdx];
}

export function createEffectOn<T>(
	deps: AccessorArray<T> | Accessor<T>,
	cb: (val: T, prev: T | undefined) => void,
	opts: { defer?: boolean } = {}
): void {
	createEffect(on(deps, cb, opts), undefined);
}
