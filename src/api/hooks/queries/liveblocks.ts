import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { ApiLayer } from '@/api/layer';
import { $api } from '@/api/instance';

export const useGetRoomByDocumentId = (id: string) => {
	return useQuery({
		queryKey: [QueryKeys.ROOMS],
		queryFn: () => ApiLayer.getDataFrom($api.liveblocks.liveblocksControllerGetRoomByDocumentId(id)),
	});
};
