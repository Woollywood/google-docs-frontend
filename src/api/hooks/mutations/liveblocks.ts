import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';

export const useEnterRoom = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => ApiLayer.getDataFrom($api.liveblocks.liveblocksControllerEnterRoom(id)),
		onSuccess: (data) => {
			queryClient.setQueryData([QueryKeys.ROOMS, data.id], data);
		},
	});
};
