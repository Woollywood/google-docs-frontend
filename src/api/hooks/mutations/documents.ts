import { $api } from '@/api/instance';
import { ApiLayer } from '@/api/layer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';
import { CreateDocumentDto, UpdateDocumentDto } from '@/api/generatedApi';

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
