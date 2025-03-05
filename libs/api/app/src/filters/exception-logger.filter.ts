import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { isApiException } from '../util';

import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { I18nReq } from '@nestjs-starter/api/types';
import type { Response } from 'express';
import type { ICommonResponseInterface } from '@nestjs-starter/shared/types';

@Catch()
export class ExceptionLoggerFilter implements ExceptionFilter<unknown> {
	constructor(
		@InjectPinoLogger()
		private readonly pinoLogger: PinoLogger,
	) {}

	private handleHttpException(req: I18nReq, res: Response, e: HttpException): void {
		const status = e.getStatus();

		!isApiException(e) &&
			this.pinoLogger.warn(
				{ error: e },
				`[WARNING]: A plain non translated error was thrown.`,
			);

		const jsonRes: ICommonResponseInterface<null> = isApiException(e)
			? this.getApiExceptionErrorResponse(e) // Use a new function
			: this.getStandardErrorResponse(e, status);

		this.pinoLogger.error(
			{
				jsonRes,
				body: req.body,
				params: req.params,
				query: req.query,
			},
			`[${e.getStatus()}]: ${e.message}`,
		);

		res.status(status).json(jsonRes);
	}

	private handleGeneralException(req: I18nReq, res: Response, e: unknown): void {
		this.pinoLogger.error(
			{
				body: req.body,
				params: req.params,
				query: req.query,
				headers: req.headers,
			},
			e instanceof Error ? e.message : 'Internal error',
		);

		const jsonRes: ICommonResponseInterface<null> = this.getInternalServerErrorResponse();

		res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(jsonRes);
	}

	private getStandardErrorResponse(
		e: HttpException,
		statusCode: number,
	): ICommonResponseInterface<null> {
		const message = e.message || 'An unexpected error occurred.';

		return {
			status: statusCode,
			message: message,
			data: null,
		};
	}

	private getInternalServerErrorResponse(): ICommonResponseInterface<null> {
		return {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal Server Error',
			data: null,
		};
	}

	private getApiExceptionErrorResponse(e: HttpException): ICommonResponseInterface<null> {
		const status = e.getStatus();
		const message = e.message || 'An unexpected error occurred.';

		return {
			status: status,
			message: message,
			data: null,
		};
	}

	public catch(e: unknown, host: ArgumentsHost): void {
		const httpHost = host.switchToHttp();
		const req = httpHost.getRequest<I18nReq>();
		const res = httpHost.getResponse<Response>();

		e instanceof HttpException
			? this.handleHttpException(req, res, e)
			: this.handleGeneralException(req, res, e);
	}
}
