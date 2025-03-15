import { $api } from '@/api';

class _UsersService {
	async getUsers({
		page = 1,
		take = 10,
		order = 'asc',
		search = '',
	}: { page?: number; take?: number; order?: 'asc' | 'desc'; search?: string } = {}) {
		const { data } = await $api.users.usersControllerGetUsers({ page, take, order, search });
		return data;
	}
}

export const UsersService = new _UsersService();
