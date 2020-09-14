import type { DasbyClient } from '@lib/DasbyClient';
import { isThenable } from '@sapphire/utilities';
import { Events } from '@sapphire/framework';
import type { ValueTransformer } from 'typeorm';
import nodeFetch, { RequestInit, Response } from 'node-fetch';
import type { URL } from 'url';

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export const bigIntTransformer: ValueTransformer = { from: Number, to: String };

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export function floatPromise(ctx: { client: DasbyClient }, promise: Promise<unknown>) {
	if (isThenable(promise)) promise.catch((error) => ctx.client.emit(Events.Error, error));
}

export const enum FetchResultTypes {
	JSON,
	Buffer,
	Text,
	Result
}

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export async function fetch<R>(url: URL | string, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch<R>(url: URL | string, options: RequestInit, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch(url: URL | string, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: URL | string, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: URL | string, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch<R>(url: URL | string, options: RequestInit, type: FetchResultTypes): Promise<Response | Buffer | string | R>;
export async function fetch(url: URL | string, options?: RequestInit | FetchResultTypes, type?: FetchResultTypes) {
	if (typeof options === 'undefined') {
		options = {};
		type = FetchResultTypes.JSON;
	} else if (typeof options === 'number') {
		type = options;
		options = {};
	} else if (typeof type === 'undefined') {
		type = FetchResultTypes.JSON;
	}

	const result: Response = await nodeFetch(url, options);
	if (!result.ok) throw new Error(`${url}\n${result.statusText}\n${await result.text()}`);

	switch (type) {
		case FetchResultTypes.Result:
			return result;
		case FetchResultTypes.Buffer:
			return result.buffer();
		case FetchResultTypes.JSON:
			return result.json();
		case FetchResultTypes.Text:
			return result.text();
		default:
			throw new Error(`Unknown type ${type}`);
	}
}
