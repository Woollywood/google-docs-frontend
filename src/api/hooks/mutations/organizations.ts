import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import {
	AcceptOrganizationInvitationDto,
	CreateOrganizationDto,
	KickMemberDto,
	LeaveOrganizationDto,
	RejectOrganizationInvitationDto,
	SendOrganizationNotificationDto,
	ToggleOrganizationDto,
} from '@/api/generatedApi';

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

export const useToggleOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: ToggleOrganizationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerToggle(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useLeaveOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: LeaveOrganizationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerLeave(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATIONS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useSendInviteOrganizationMember = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: SendOrganizationNotificationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerSendInvite(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATION_MEMBERS] });
		},
	});
};

export const useKickOrganizationMember = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: KickMemberDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerKickMember(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATION_MEMBERS] });
		},
	});
};

export const useAcceptInviteOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: AcceptOrganizationInvitationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerAcceptInvite(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATIONS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICATIONS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICATIONS_COUNT] });
		},
	});
};

export const useRejectInviteOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: RejectOrganizationInvitationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerRejectInvite(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICATIONS] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICATIONS_COUNT] });
		},
	});
};

export const useDeleteOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => ApiLayer.getDataFrom($api.organizations.organizationsControllerDelete(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATIONS] });
		},
	});
};
