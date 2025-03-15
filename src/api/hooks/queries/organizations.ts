import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { LazyQuery } from '../types';

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
