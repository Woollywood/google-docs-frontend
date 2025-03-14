import { $api } from '@/api';

class _UsersService {
	async getUsers({
		page = 1,
		take = 10,
		order = 'ASC',
		search = '',
	}: { page?: number; take?: number; order?: 'ASC' | 'DESC'; search?: string } = {}) {
		const { data } = await $api.users.usersControllerGetUsers({ page, take, order, search });
		return data;
	}
}

export const UsersService = new _UsersService();
