import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { OrganizationsService } from '@/services/OrganizationsService';
import { CreateOrganizationDto, MemberDto } from '@/api/generatedApi';
import { LazyQuery } from './interface';

export const useGetMyOrganizations = () => {
	return useQuery({
		queryKey: [QueryKeys.ORGANIZATIONS],
		queryFn: () => OrganizationsService.getMy(),
	});
};

export const useGetCurrentOrganization = ({ enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.CURRENT_ORGANIZATION],
		queryFn: () => OrganizationsService.getCurrent(),
		enabled,
	});
};

export const useCreateOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateOrganizationDto) => OrganizationsService.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.ORGANIZATIONS] });
		},
	});
};

export const useJoinOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => OrganizationsService.join(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useLeaveOrganization = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => OrganizationsService.leave(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_ORGANIZATION] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] });
		},
	});
};

export const useAddMember = () => {
	return useMutation({
		mutationFn: (dto: MemberDto) => OrganizationsService.addMember(dto),
	});
};

export const useKickMember = () => {
	return useMutation({
		mutationFn: (dto: MemberDto) => OrganizationsService.kickMember(dto),
	});
};
