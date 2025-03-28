import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { ApiLayer } from '@/api/layer';
import { $api } from '@/api/instance';

export const useGetNotificationsCount = () => {
	return useQuery({
		queryKey: [QueryKeys.NOTIFICATIONS_COUNT],
		queryFn: () => ApiLayer.getDataFrom($api.notifications.notificationsControllerGetAll()),
		select: ({ meta: { itemCount } }) => itemCount,
	});
};

export const useGetNotifications = () => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.NOTIFICATIONS],
		queryFn: ({ pageParam }) =>
			ApiLayer.getDataFrom($api.notifications.notificationsControllerGetAll({ page: pageParam })),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
	});
};
