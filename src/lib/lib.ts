import { MaybeAccessor } from '@solid-primitives/utils';

export function isAccessor<T>(val: MaybeAccessor<T>): boolean {
	return typeof val === 'function' && !val.length;
}
