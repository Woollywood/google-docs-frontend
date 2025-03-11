import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { AuthService } from '@/services/AuthService';
import { LazyQuery } from './interface';

export const useGetMe = ({ enabled }: LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.CURRENT_USER],
		queryFn: () => AuthService.getMe(),
		enabled,
	});
};
