import { CreateUserDto, TokenDto } from '@/api/generatedApi';
import { AuthService, AuthTokens } from '@/services/AuthService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { $api } from '@/api';
import { useNavigate } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useSearchParam } from '@/hooks/useSearchParam';
import { LazyQuery } from './interface';

export const useSignUp = () => {
	const [, setAccessToken] = useLocalStorage<string>(AuthTokens.ACCESS_TOKEN);
	const [, setRefreshToken] = useLocalStorage<string>(AuthTokens.REFRESH_TOKEN);
	const [, setEmailVerifyed] = useLocalStorage<boolean | undefined>(AuthTokens.EMAIL_VERIFYED);
	return useMutation({
		mutationFn: (dto: CreateUserDto) => AuthService.signUp(dto),
		onSuccess: ({ accessToken, refreshToken }) => {
			setAccessToken(accessToken);
			setRefreshToken(refreshToken);
			setEmailVerifyed(false);
		},
	});
};

export const useSignIn = () => {
	const [, setAccessToken] = useLocalStorage<string>(AuthTokens.ACCESS_TOKEN);
	const [, setRefreshToken] = useLocalStorage<string>(AuthTokens.REFRESH_TOKEN);
	const [, setEmailVerifyed] = useLocalStorage<boolean | undefined>(AuthTokens.EMAIL_VERIFYED);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [callbackURL] = useSearchParam('callbackURL', '/');

	return useMutation({
		mutationFn: (dto: CreateUserDto) => AuthService.signIn(dto),
		onSuccess: async ({ accessToken, refreshToken }) => {
			setAccessToken(accessToken);
			setRefreshToken(refreshToken);
			setEmailVerifyed(true);
			await queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
			navigate({ to: callbackURL, replace: true });
		},
	});
};

export const useSignOut = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => AuthService.signOut(),
		onSuccess: async () => {
			AuthService.clearTokens();
			queryClient.setQueryData([QueryKeys.CURRENT_USER], null);
			navigate({ to: '/auth/sign-in', replace: true });
		},
	});
};

export const useVerifyEmail = () => {
	const [, setEmailVerifyed] = useLocalStorage<boolean | undefined>(AuthTokens.EMAIL_VERIFYED);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ token }: TokenDto) => $api.auth.authControllerVerifyEmail({ token }),
		onSuccess: () => {
			setEmailVerifyed(true);
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useResetPassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ token }: TokenDto) => $api.auth.authControllerResetPassword({ token }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useGetMe = ({ enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.CURRENT_USER],
		queryFn: () => AuthService.getMe(),
		enabled,
	});
};
