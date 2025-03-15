import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { CreateOrganizationDto, MemberDto } from '@/api/generatedApi';

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
