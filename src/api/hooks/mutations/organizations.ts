import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import {
	AcceptOrganizationInvitationDto,
	CreateOrganizationDto,
	KickMemberDto,
	RejectOrganizationInvitationDto,
	SendOrganizationNotificationDto,
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

export const useSendInviteOrganizationMember = () => {
	return useMutation({
		mutationFn: (dto: SendOrganizationNotificationDto) =>
			ApiLayer.getDataFrom($api.organizations.organizationsControllerSendInvite(dto)),
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
		},
	});
};
