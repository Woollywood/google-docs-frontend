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

export interface UserDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	/** @minLength 3 */
	username: string;
	email: string;
	emailVerified: boolean;
	/** @minLength 3 */
	password: string;
	activeOrganizationId: string | null;
}

export interface PageMetaDto {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface PaginatedUserModel {
	data: UserDto[];
	meta: PageMetaDto;
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

export interface SessionDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	accessToken: string;
	refreshToken: string;
	userId: string | null;
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

export interface DocumentDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	title: string;
	content: string | null;
	userId: string | null;
	organizationId: string | null;
}

export interface PaginatedDocumentModel {
	data: DocumentDto[];
	meta: PageMetaDto;
}

export interface CreateDocumentDto {
	/**
	 * @minLength 3
	 * @example "blank"
	 */
	title: string;
	content?: string | null;
}

export interface UpdateDocumentDto {
	/**
	 * @minLength 3
	 * @example "blank"
	 */
	title?: string;
	content?: string | null;
}

export interface OrganizationDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	title: string;
	ownerId: string | null;
}

export interface CreateOrganizationDto {
	title: string;
}

export interface SendOrganizationNotificationDto {
	recipientId?: string;
	organizationId?: string | null;
}

export interface NotificationDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	type: NotificationDto;
	token: string;
	recipientId: string;
	senderId: string;
	organizationId: string | null;
}

export interface KickMemberDto {
	organizationId: string;
	userId: string;
}

export interface AcceptOrganizationInvitationDto {
	organizationId?: string | null;
	token: string;
}

export interface RejectOrganizationInvitationDto {
	token: string;
}

export interface PaginatedNotificationModel {
	data: NotificationDto[];
	meta: PageMetaDto;
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
		 * @name UsersControllerGetUsers
		 * @request GET:/api/v1/users
		 * @secure
		 */
		usersControllerGetUsers: (
			query: {
				/** @default "asc" */
				order?: 'asc' | 'desc';
				/**
				 * @min 1
				 * @default 1
				 */
				page?: number;
				/**
				 * @min 1
				 * @max 50
				 * @default 10
				 */
				take?: number;
				search: string;
			},
			params: RequestParams = {},
		) =>
			this.http.request<PaginatedUserModel, any>({
				path: `/api/v1/users`,
				method: 'GET',
				query: query,
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
		 * @request POST:/api/v1/auth/sign-up
		 */
		authControllerSignUp: (data: CreateUserDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/api/v1/auth/sign-up`,
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
		 * @request POST:/api/v1/auth/sign-in
		 */
		authControllerSignIn: (data: CreateUserDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/api/v1/auth/sign-in`,
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
		 * @request POST:/api/v1/auth/sign-out
		 * @secure
		 */
		authControllerSignOut: (params: RequestParams = {}) =>
			this.http.request<SessionDto, any>({
				path: `/api/v1/auth/sign-out`,
				method: 'POST',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRefresh
		 * @request POST:/api/v1/auth/refresh
		 */
		authControllerRefresh: (data: RefreshDto, params: RequestParams = {}) =>
			this.http.request<AuthTokensDto, any>({
				path: `/api/v1/auth/refresh`,
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
		 * @request POST:/api/v1/auth/verify-email
		 */
		authControllerVerifyEmail: (data: TokenDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/api/v1/auth/verify-email`,
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
		 * @request POST:/api/v1/auth/reset-password-link
		 */
		authControllerResetPasswordLink: (data: ResetPasswordLinkDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/api/v1/auth/reset-password-link`,
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
		 * @request POST:/api/v1/auth/reset-password
		 */
		authControllerResetPassword: (data: TokenDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/api/v1/auth/reset-password`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerIdentity
		 * @request GET:/api/v1/auth/identity
		 * @secure
		 */
		authControllerIdentity: (params: RequestParams = {}) =>
			this.http.request<UserDto, any>({
				path: `/api/v1/auth/identity`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),
	};
	documents = {
		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerGetMyDocuments
		 * @request GET:/api/v1/documents/my
		 * @secure
		 */
		documentsControllerGetMyDocuments: (
			query: {
				/** @default "asc" */
				order?: 'asc' | 'desc';
				/**
				 * @min 1
				 * @default 1
				 */
				page?: number;
				/**
				 * @min 1
				 * @max 50
				 * @default 10
				 */
				take?: number;
				search: string;
			},
			params: RequestParams = {},
		) =>
			this.http.request<PaginatedDocumentModel, any>({
				path: `/api/v1/documents/my`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerCreateDocument
		 * @request POST:/api/v1/documents
		 * @secure
		 */
		documentsControllerCreateDocument: (data: CreateDocumentDto, params: RequestParams = {}) =>
			this.http.request<DocumentDto, any>({
				path: `/api/v1/documents`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerGetDocument
		 * @request GET:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerGetDocument: (id: string, params: RequestParams = {}) =>
			this.http.request<DocumentDto, any>({
				path: `/api/v1/documents/${id}`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerDelete
		 * @request DELETE:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerDelete: (id: string, params: RequestParams = {}) =>
			this.http.request<any, DocumentDto>({
				path: `/api/v1/documents/${id}`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerPath
		 * @request PATCH:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerPath: (id: string, data: UpdateDocumentDto, params: RequestParams = {}) =>
			this.http.request<any, DocumentDto>({
				path: `/api/v1/documents/${id}`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),
	};
	organizations = {
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetMy
		 * @request GET:/api/v1/organizations/my
		 * @secure
		 */
		organizationsControllerGetMy: (params: RequestParams = {}) =>
			this.http.request<OrganizationDto[], any>({
				path: `/api/v1/organizations/my`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetCurrent
		 * @request GET:/api/v1/organizations/current
		 * @secure
		 */
		organizationsControllerGetCurrent: (params: RequestParams = {}) =>
			this.http.request<OrganizationDto, any>({
				path: `/api/v1/organizations/current`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerJoin
		 * @request POST:/api/v1/organizations/join/{id}
		 * @secure
		 */
		organizationsControllerJoin: (id: string, params: RequestParams = {}) =>
			this.http.request<any, OrganizationDto>({
				path: `/api/v1/organizations/join/${id}`,
				method: 'POST',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerLeave
		 * @request POST:/api/v1/organizations/leave
		 * @secure
		 */
		organizationsControllerLeave: (params: RequestParams = {}) =>
			this.http.request<any, OrganizationDto>({
				path: `/api/v1/organizations/leave`,
				method: 'POST',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerCreate
		 * @request POST:/api/v1/organizations/new
		 * @secure
		 */
		organizationsControllerCreate: (data: CreateOrganizationDto, params: RequestParams = {}) =>
			this.http.request<OrganizationDto, any>({
				path: `/api/v1/organizations/new`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerDelete
		 * @request DELETE:/api/v1/organizations/{id}
		 * @secure
		 */
		organizationsControllerDelete: (id: string, params: RequestParams = {}) =>
			this.http.request<any, OrganizationDto>({
				path: `/api/v1/organizations/${id}`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerMembers
		 * @request GET:/api/v1/organizations/members/{id}
		 * @secure
		 */
		organizationsControllerMembers: (
			id: string,
			query: {
				/** @default "asc" */
				order?: 'asc' | 'desc';
				/**
				 * @min 1
				 * @default 1
				 */
				page?: number;
				/**
				 * @min 1
				 * @max 50
				 * @default 10
				 */
				take?: number;
				search: string;
			},
			params: RequestParams = {},
		) =>
			this.http.request<PaginatedUserModel, any>({
				path: `/api/v1/organizations/members/${id}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerSendInvite
		 * @request POST:/api/v1/organizations/send-invite
		 * @secure
		 */
		organizationsControllerSendInvite: (data: SendOrganizationNotificationDto, params: RequestParams = {}) =>
			this.http.request<any, NotificationDto>({
				path: `/api/v1/organizations/send-invite`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerKickMember
		 * @request POST:/api/v1/organizations/kick
		 * @secure
		 */
		organizationsControllerKickMember: (data: KickMemberDto, params: RequestParams = {}) =>
			this.http.request<void, any>({
				path: `/api/v1/organizations/kick`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerAcceptInvite
		 * @request POST:/api/v1/organizations/accept-invite
		 * @secure
		 */
		organizationsControllerAcceptInvite: (data: AcceptOrganizationInvitationDto, params: RequestParams = {}) =>
			this.http.request<any, NotificationDto>({
				path: `/api/v1/organizations/accept-invite`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerRejectInvite
		 * @request POST:/api/v1/organizations/reject-invite
		 * @secure
		 */
		organizationsControllerRejectInvite: (data: RejectOrganizationInvitationDto, params: RequestParams = {}) =>
			this.http.request<any, NotificationDto>({
				path: `/api/v1/organizations/reject-invite`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),
	};
	notifications = {
		/**
		 * No description
		 *
		 * @tags Notifications
		 * @name NotificationsControllerGetAll
		 * @request GET:/api/v1/notifications
		 * @secure
		 */
		notificationsControllerGetAll: (
			query?: {
				/** @default "asc" */
				order?: 'asc' | 'desc';
				/**
				 * @min 1
				 * @default 1
				 */
				page?: number;
				/**
				 * @min 1
				 * @max 50
				 * @default 10
				 */
				take?: number;
			},
			params: RequestParams = {},
		) =>
			this.http.request<PaginatedNotificationModel, any>({
				path: `/api/v1/notifications`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params,
			}),
	};
}
