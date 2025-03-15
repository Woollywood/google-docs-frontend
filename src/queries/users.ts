import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { LazyQuery, SearchQuery } from './interface';
import { $api, ApiLayer } from '@/api';

export const useGetUsers = (
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.USERS],
		queryFn: ({ pageParam }) =>
			ApiLayer.getDataFrom($api.users.usersControllerGetUsers({ page: pageParam, search })),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};
