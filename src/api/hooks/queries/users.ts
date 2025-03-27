import { useInfiniteQuery } from '@tanstack/react-query';
import { $api, ApiLayer } from '@/api';
import { LazyQuery, SearchQuery } from '../types';
import { QueryKeys } from '../queryKeys';

export const useGetUsers = (
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.USERS],
		queryFn: ({ pageParam }) =>
			ApiLayer.getDataFrom($api.users.usersControllerFindUsers({ page: pageParam, search })),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};
