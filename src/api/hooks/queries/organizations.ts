import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { LazyQuery, SearchQuery } from '../types';

export const useGetMyOrganizations = () => {
	return useQuery({
		queryKey: [QueryKeys.ORGANIZATIONS],
		queryFn: () => ApiLayer.getDataFrom($api.organizations.organizationsControllerGetMy()),
	});
};

export const useGetCurrentOrganization = ({ enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.CURRENT_ORGANIZATION],
		queryFn: () => ApiLayer.getDataFrom($api.organizations.organizationsControllerGetCurrent()),
		enabled,
	});
};

export const useGetOrganizationById = (id: string, { enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.ORGANIZATIONS, id],
		queryFn: () => ApiLayer.getDataFrom($api.organizations.organizationsControllerGetOrganizationById(id)),
		enabled,
	});
};

export const useGetOrganizationMembers = (
	id: string,
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.ORGANIZATION_MEMBERS, id],
		queryFn: ({ pageParam }) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerGetMembers(id, { page: pageParam, search })),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};
