import { $api } from '@/api/instance';
import { AuthTokensDto, CreateUserDto } from '@/api/generatedApi';
import { isNil } from 'lodash-es';
import { LocalStorageService } from './LocalStorageService';

export enum AuthTokens {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
	EMAIL_VERIFYED = 'email_verifyed',
}

class _AuthService {
	getAccessToken() {
		return LocalStorageService.get(AuthTokens.ACCESS_TOKEN);
	}
	hasAccessToken() {
		return !isNil(LocalStorageService.get(AuthTokens.REFRESH_TOKEN));
	}

	getRefreshToken() {
		return LocalStorageService.get(AuthTokens.REFRESH_TOKEN);
	}
	hasRefreshToken() {
		return !isNil(LocalStorageService.get(AuthTokens.REFRESH_TOKEN));
	}

	emailVerifyed() {
		return LocalStorageService.get(AuthTokens.EMAIL_VERIFYED);
	}

	async signIn(dto: CreateUserDto) {
		const { data } = await $api.auth.authControllerSignIn(dto);
		return data;
	}

	async signUp(dto: CreateUserDto) {
		const { data } = await $api.auth.authControllerSignUp(dto);
		return data;
	}

	async identity() {
		const { data } = await $api.auth.authControllerIdentity();
		return data;
	}

	async signOut() {
		await $api.auth.authControllerSignOut();
	}

	setTokens({ accessToken, refreshToken }: AuthTokensDto) {
		LocalStorageService.set(AuthTokens.ACCESS_TOKEN, accessToken);
		LocalStorageService.set(AuthTokens.REFRESH_TOKEN, refreshToken);
	}

	clearTokens() {
		LocalStorageService.remove(AuthTokens.ACCESS_TOKEN);
		LocalStorageService.remove(AuthTokens.REFRESH_TOKEN);
	}

	checkTokens() {
		if (this.hasAccessToken() || this.hasRefreshToken()) {
			return true;
		}

		return false;
	}
}

export const AuthService = new _AuthService();
