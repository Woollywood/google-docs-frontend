import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { CreateDocumentDto, UpdateDocumentDto } from '@/api/generatedApi';
import { DocumentsService } from '@/services/DocumentsService';
import { LazyQuery, SearchQuery } from './interface';

export const useGetDocuments = (
	{ enabled = true, search = '' }: LazyQuery & SearchQuery = {} as LazyQuery & SearchQuery,
) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.DOCUMENTS],
		queryFn: ({ pageParam }) => DocumentsService.getDocuments({ page: pageParam, search }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
		enabled,
	});
};

export const useGetDocumentById = (id: string) => {
	return useQuery({
		queryKey: [QueryKeys.DOCUMENTS, id],
		queryFn: () => DocumentsService.getDocumentById(id),
	});
};

export const useCreateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateDocumentDto) => DocumentsService.createDocument(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};

export const useDeleteDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => DocumentsService.deleteDocument(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};

export const useUpdateDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: UpdateDocumentDto }) => DocumentsService.updateDocument(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.DOCUMENTS] });
		},
	});
};
