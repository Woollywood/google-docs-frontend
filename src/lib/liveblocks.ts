import { $api } from '@/api';

export const authEndpoint = async () => {
	const {
		data: { token },
	} = await $api.liveblocks.liveblocksControllerIdentifyUser();
	return { token };
};
