import type { Any } from '@nestjs-starter/shared/types';

export interface IBaseFacade {
	commands: {
		[key: string]: (...args: Any[]) => Any;
	};
	queries: {
		[key: string]: (...args: Any[]) => Any;
	};
	events: {
		[key: string]: (...args: Any[]) => void;
	};
}
