/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Session {
	accessToken: string;
	refreshToken: string;
}

export interface User {
	/**
	 * @minLength 3
	 * @example "john"
	 */
	username: string;
	/** @example "example@example.com" */
	email: string;
	/** @example false */
	emailVerified: boolean;
	/**
	 * @minLength 6
	 * @example "changeme"
	 */
	password: string;
	sessions: Session[];
}

export interface CreateUserDto {
	/**
	 * @minLength 3
	 * @example "john"
	 */
	username: string;
	/** @example "example@example.com" */
	email: string;
	/**
	 * @minLength 6
	 * @example "changeme"
	 */
	password: string;
}

export interface AuthTokensDto {
	accessToken: string;
	refreshToken: string;
}

export interface RefreshDto {
	refreshToken: string;
}

export interface TokenDto {
	token: string;
}

export interface ResetPasswordLinkDto {
	email: string;
	newPassword: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType;
	/** request body */
	body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
	secure?: boolean;
	format?: ResponseType;
}

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance;
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private secure?: boolean;
	private format?: ResponseType;

	constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
		this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
		this.secure = secure;
		this.format = format;
		this.securityWorker = securityWorker;
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method);

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === 'object' && formItem !== null) {
			return JSON.stringify(formItem);
		} else {
			return `${formItem}`;
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		if (input instanceof FormData) {
			return input;
		}
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key];
			const propertyContent: any[] = property instanceof Array ? property : [property];

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File;
				formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
			}

			return formData;
		}, new FormData());
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<AxiosResponse<T>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const responseFormat = format || this.format || undefined;

		if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
			body = this.createFormData(body as Record<string, unknown>);
		}

		if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
			body = JSON.stringify(body);
		}

		return this.instance.request({
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type ? { 'Content-Type': type } : {}),
			},
			params: query,
			responseType: responseFormat,
			data: body,
			url: path,
		});
	};
}

/**
 * @title Google docs
 * @version 1.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> {
	http: HttpClient<SecurityDataType>;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
	}

	users = {
		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerGetMe
		 * @request GET:/users/me
		 * @secure
		 */
		usersControllerGetMe: (params: RequestParams = {}) =>
			this.http.request<User, any>({
				path: `/users/me`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),
	};
	auth = {
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignUp
		 * @request POST:/auth/sign-up
		 */
		authControllerSignUp: (data: CreateUserDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/auth/sign-up`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignIn
		 * @request POST:/auth/sign-in
		 */
		authControllerSignIn: (data: CreateUserDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/auth/sign-in`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignOut
		 * @request POST:/auth/sign-out
		 */
		authControllerSignOut: (params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/auth/sign-out`,
				method: 'POST',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRefresh
		 * @request POST:/auth/refresh
		 */
		authControllerRefresh: (data: RefreshDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/auth/refresh`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerVerifyEmail
		 * @request POST:/auth/verify-email
		 */
		authControllerVerifyEmail: (data: TokenDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/auth/verify-email`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerResetPasswordLink
		 * @request POST:/auth/reset-password-link
		 */
		authControllerResetPasswordLink: (data: ResetPasswordLinkDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/auth/reset-password-link`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerResetPassword
		 * @request POST:/auth/reset-password
		 */
		authControllerResetPassword: (data: TokenDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/auth/reset-password`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),
	};
}
