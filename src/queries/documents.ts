import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { CreateDocumentDto, UpdateDocumentDto } from '@/api/generatedApi';
import { LazyQuery, SearchQuery } from './interface';
import { $api, ApiLayer } from '@/api';

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

export const useGetDocumentById = (id: string) => {
	return useQuery({
		queryKey: [QueryKeys.DOCUMENTS, id],
		queryFn: () => ApiLayer.getDataFrom($api.documents.documentsControllerGetDocument(id)),
	});
};

export const useCreateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateDocumentDto) =>
			ApiLayer.getDataFrom($api.documents.documentsControllerCreateDocument(dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};

export const useDeleteDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => ApiLayer.getDataFrom($api.documents.documentsControllerDelete(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};

export const useUpdateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: UpdateDocumentDto }) =>
			ApiLayer.getDataFrom($api.documents.documentsControllerPath(id, dto)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};
