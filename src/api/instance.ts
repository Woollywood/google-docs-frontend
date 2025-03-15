import { AxiosError } from 'axios';
import { AuthService } from '@/services/AuthService';
import { Api, HttpClient } from './generatedApi';

const baseURL = import.meta.env.VITE_BASE_BACKEND_URL;

const httpClient = new HttpClient({ baseURL });

let refreshPromise: ReturnType<typeof $api.auth.authControllerRefresh> | null = null;

httpClient.instance.interceptors.request.use(async (config) => {
	if (AuthService.hasAccessToken()) {
		config.headers.Authorization = `Bearer ${AuthService.getAccessToken()}`;
	}

	return config;
});

const refreshing = async () => {
	const _httpClient = new HttpClient({ baseURL });
	const _api = new Api(_httpClient);
	refreshPromise = _api.auth.authControllerRefresh({
		refreshToken: AuthService.getRefreshToken()!,
	});
	const { data: tokens } = await refreshPromise;
	AuthService.setTokens(tokens);
	refreshPromise = null;
	return tokens;
};
httpClient.instance.interceptors.response.use(
	(config) => config,
	async (error: AxiosError) => {
		const originalConfig = error.response?.config;

		if (error.response?.status === 401 && AuthService.hasRefreshToken()) {
			try {
				if (refreshPromise) {
					await refreshPromise;
				} else {
					await refreshing();
				}

				return httpClient.instance.request(originalConfig!);
			} catch (error) {
				if (error instanceof AxiosError) {
					AuthService.clearTokens();
				}
			}
		}

		const response = error.response;
		throw new AxiosError(response?.statusText, undefined, response?.config, response?.request, response);
	},
);
export const $api = new Api(httpClient);
