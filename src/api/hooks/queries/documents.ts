import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { LazyQuery, SearchQuery } from '../types';
import { ApiLayer } from '@/api/layer';
import { $api } from '@/api/instance';
import { QueryKeys } from '../queryKeys';

export const useGetDocuments = (
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.DOCUMENTS],
		queryFn: ({ pageParam }) =>
			ApiLayer.getDataFrom($api.documents.documentsControllerGetMyDocuments({ page: pageParam, search })),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};

export const useGetDocumentById = (id: string, { enabled = true }: LazyQuery = {} as LazyQuery) => {
	return useQuery({
		queryKey: [QueryKeys.DOCUMENTS, id],
		queryFn: () => ApiLayer.getDataFrom($api.documents.documentsControllerGetDocument(id)),
		enabled,
	});
};
