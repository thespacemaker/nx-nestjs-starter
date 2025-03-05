import type { HttpStatus } from '../../types';

export interface ICommonResponseInterface<T = unknown> {
	status: HttpStatus;
	message: string;
	data: T;
}
