import { $api, ApiLayer } from '@/api';
import { IUserInfo, ResolveMentionSuggestionsArgs } from '@liveblocks/client';

export const authEndpoint = async () => {
	const {
		data: { token },
	} = await $api.liveblocks.liveblocksControllerIdentifyUser();
	return { token };
};

export const resolveUsers = async ({ userIds }: { userIds: string[] }): Promise<IUserInfo[]> => {
	const data = await ApiLayer.getDataFrom($api.liveblocks.liveblocksControllerResolveUsers({ ids: userIds }));
	return data as IUserInfo[];
};

export const resolveMentionSuggestions = async (params: ResolveMentionSuggestionsArgs) => {
	const { roomId, text } = params;
	return ApiLayer.getDataFrom($api.liveblocks.liveblocksControllerGetMentionSuggestions(roomId, { text }));
};
