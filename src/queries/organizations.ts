import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { CreateOrganizationDto, MemberDto } from '@/api/generatedApi';
import { LazyQuery } from './interface';
import { $api, ApiLayer } from '@/api';

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

export const useCreateOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateOrganizationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerCreate(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATIONS] });
		},
	});
};

export const useJoinOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => ApiLayer.getDataFrom($api.organizations.organizationsControllerJoin(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useLeaveOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => ApiLayer.getDataFrom($api.organizations.organizationsControllerLeave()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useAddMember = () => {
	return useMutation({
		mutationFn: (dto: MemberDto) => ApiLayer.getDataFrom($api.organizations.organizationsControllerAddMember(dto)),
	});
};

export const useKickMember = () => {
	return useMutation({
		mutationFn: (dto: MemberDto) => ApiLayer.getDataFrom($api.organizations.organizationsControllerKickMember(dto)),
	});
};
