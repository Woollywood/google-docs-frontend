import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { LazyQuery } from '../types';
import { AuthService } from '@/services/AuthService';

export const useIdentity = ({ enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.CURRENT_USER],
		queryFn: () => AuthService.identity(),
		enabled,
	});
};
