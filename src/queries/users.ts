import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { LazyQuery, SearchQuery } from './interface';
import { UsersService } from '@/services/UsersService';

export const useGetUsers = (
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.USERS],
		queryFn: ({ pageParam }) => UsersService.getUsers({ page: pageParam, search }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};
