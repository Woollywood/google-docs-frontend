import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from './queryKeys';
import { CreateDocumentDto } from '@/api/generatedApi';
import { DocumentsService } from '@/services/DocumentsService';

export const useGetDocuments = () => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.DOCUMENTS],
		queryFn: ({ pageParam }) => DocumentsService.getDocuments({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined),
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
