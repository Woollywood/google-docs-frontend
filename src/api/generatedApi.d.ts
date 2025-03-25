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
export interface ToggleOrganizationDto {
	id: string | null;
}
export interface LeaveOrganizationDto {
	id: string;
}
export interface CreateOrganizationDto {
	title: string;
}
export interface MemberDto {
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	/** @minLength 3 */
	username: string;
	email: string;
	emailVerified: boolean;
	activeOrganizationId: string | null;
	isMember: boolean;
	isInvitationSended: boolean;
}
export interface PaginatedMembersModel {
	data: MemberDto[];
	meta: PageMetaDto;
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
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
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
export declare enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}
export declare class HttpClient<SecurityDataType = unknown> {
	instance: AxiosInstance;
	private securityData;
	private securityWorker?;
	private secure?;
	private format?;
	constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
	setSecurityData: (data: SecurityDataType | null) => void;
	protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
	protected stringifyFormItem(formItem: unknown): string;
	protected createFormData(input: Record<string, unknown>): FormData;
	request: <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title Google docs
 * @version 1.0
 * @contact
 */
export declare class Api<SecurityDataType extends unknown> {
	http: HttpClient<SecurityDataType>;
	constructor(http: HttpClient<SecurityDataType>);
	users: {
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
			params?: RequestParams,
		) => Promise<AxiosResponse<PaginatedUserModel>>;
	};
	auth: {
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignUp
		 * @request POST:/api/v1/auth/sign-up
		 */
		authControllerSignUp: (data: CreateUserDto, params?: RequestParams) => Promise<AxiosResponse<AuthTokensDto>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignIn
		 * @request POST:/api/v1/auth/sign-in
		 */
		authControllerSignIn: (data: CreateUserDto, params?: RequestParams) => Promise<AxiosResponse<AuthTokensDto>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerSignOut
		 * @request POST:/api/v1/auth/sign-out
		 * @secure
		 */
		authControllerSignOut: (params?: RequestParams) => Promise<AxiosResponse<SessionDto>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRefresh
		 * @request POST:/api/v1/auth/refresh
		 */
		authControllerRefresh: (data: RefreshDto, params?: RequestParams) => Promise<AxiosResponse<AuthTokensDto>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerVerifyEmail
		 * @request POST:/api/v1/auth/verify-email
		 */
		authControllerVerifyEmail: (data: TokenDto, params?: RequestParams) => Promise<AxiosResponse<void>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerResetPasswordLink
		 * @request POST:/api/v1/auth/reset-password-link
		 */
		authControllerResetPasswordLink: (
			data: ResetPasswordLinkDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<void>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerResetPassword
		 * @request POST:/api/v1/auth/reset-password
		 */
		authControllerResetPassword: (data: TokenDto, params?: RequestParams) => Promise<AxiosResponse<void>>;
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerIdentity
		 * @request GET:/api/v1/auth/identity
		 * @secure
		 */
		authControllerIdentity: (params?: RequestParams) => Promise<AxiosResponse<UserDto>>;
	};
	documents: {
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
			params?: RequestParams,
		) => Promise<AxiosResponse<PaginatedDocumentModel>>;
		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerCreateDocument
		 * @request POST:/api/v1/documents
		 * @secure
		 */
		documentsControllerCreateDocument: (
			data: CreateDocumentDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<DocumentDto>>;
		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerGetDocument
		 * @request GET:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerGetDocument: (id: string, params?: RequestParams) => Promise<AxiosResponse<DocumentDto>>;
		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerDelete
		 * @request DELETE:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerDelete: (id: string, params?: RequestParams) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Documents
		 * @name DocumentsControllerPath
		 * @request PATCH:/api/v1/documents/{id}
		 * @secure
		 */
		documentsControllerPath: (
			id: string,
			data: UpdateDocumentDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
	};
	organizations: {
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetMy
		 * @request GET:/api/v1/organizations/my
		 * @secure
		 */
		organizationsControllerGetMy: (params?: RequestParams) => Promise<AxiosResponse<OrganizationDto[]>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetCurrent
		 * @request GET:/api/v1/organizations/current
		 * @secure
		 */
		organizationsControllerGetCurrent: (params?: RequestParams) => Promise<AxiosResponse<OrganizationDto>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetOrganizationById
		 * @request GET:/api/v1/organizations/{id}
		 * @secure
		 */
		organizationsControllerGetOrganizationById: (
			id: string,
			params?: RequestParams,
		) => Promise<AxiosResponse<OrganizationDto>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerDelete
		 * @request DELETE:/api/v1/organizations/{id}
		 * @secure
		 */
		organizationsControllerDelete: (id: string, params?: RequestParams) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerToggle
		 * @request POST:/api/v1/organizations/toggle
		 * @secure
		 */
		organizationsControllerToggle: (
			data: ToggleOrganizationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerLeave
		 * @request POST:/api/v1/organizations/leave
		 * @secure
		 */
		organizationsControllerLeave: (
			data: LeaveOrganizationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerCreate
		 * @request POST:/api/v1/organizations/new
		 * @secure
		 */
		organizationsControllerCreate: (
			data: CreateOrganizationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<OrganizationDto>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerGetMembers
		 * @request GET:/api/v1/organizations/{id}/members
		 * @secure
		 */
		organizationsControllerGetMembers: (
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
			params?: RequestParams,
		) => Promise<AxiosResponse<PaginatedMembersModel>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerSendInvite
		 * @request POST:/api/v1/organizations/send-invite
		 * @secure
		 */
		organizationsControllerSendInvite: (
			data: SendOrganizationNotificationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerKickMember
		 * @request POST:/api/v1/organizations/kick
		 * @secure
		 */
		organizationsControllerKickMember: (
			data: KickMemberDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<void>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerAcceptInvite
		 * @request POST:/api/v1/organizations/accept-invite
		 * @secure
		 */
		organizationsControllerAcceptInvite: (
			data: AcceptOrganizationInvitationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
		/**
		 * No description
		 *
		 * @tags Organizations
		 * @name OrganizationsControllerRejectInvite
		 * @request POST:/api/v1/organizations/reject-invite
		 * @secure
		 */
		organizationsControllerRejectInvite: (
			data: RejectOrganizationInvitationDto,
			params?: RequestParams,
		) => Promise<AxiosResponse<any>>;
	};
	notifications: {
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
			params?: RequestParams,
		) => Promise<AxiosResponse<PaginatedNotificationModel>>;
	};
}
