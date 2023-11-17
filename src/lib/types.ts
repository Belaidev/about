import { DeepReadonly } from 'ts-essentials';

export type Immutable<T> = DeepReadonly<T>;

export type Vec2D = [x: number, y: number];
