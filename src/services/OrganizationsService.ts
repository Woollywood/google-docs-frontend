import { $api } from '@/api';
import { CreateOrganizationDto, MemberDto } from '@/api/generatedApi';

class _OrganizationsService {
	async getMy() {
		const { data } = await $api.organizations.organizationsControllerGetMy();
		return data;
	}

	async getCurrent() {
		const { data } = await $api.organizations.organizationsControllerGetCurrent();
		return data;
	}

	async create(dto: CreateOrganizationDto) {
		const { data } = await $api.organizations.organizationsControllerCreate(dto);
		return data;
	}

	async join(id: string) {
		const { data } = await $api.organizations.organizationsControllerJoin(id);
		return data;
	}

	async leave() {
		const { data } = await $api.organizations.organizationsControllerLeave();
		return data;
	}

	async addMember(dto: MemberDto) {
		const { data } = await $api.organizations.organizationsControllerAddMember(dto);
		return data;
	}

	async kickMember(dto: MemberDto) {
		const { data } = await $api.organizations.organizationsControllerKickMember(dto);
		return data;
	}
}

export const OrganizationsService = new _OrganizationsService();
