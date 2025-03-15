import { $api } from '@/api';
import { CreateDocumentDto, UpdateDocumentDto } from '@/api/generatedApi';

class _DocumentsService {
	async getDocuments({
		page = 1,
		take = 10,
		order = 'asc',
		search = '',
	}: { page?: number; take?: number; order?: 'asc' | 'desc'; search?: string } = {}) {
		const { data } = await $api.documents.documentsControllerGetMyDocuments({ page, take, order, search });
		return data;
	}

	async getDocumentById(id: string) {
		const { data } = await $api.documents.documentsControllerGetDocument(id);
		return data;
	}

	async createDocument(dto: CreateDocumentDto) {
		const { data } = await $api.documents.documentsControllerCreateDocument(dto);
		return data;
	}

	deleteDocument(id: string) {
		return $api.documents.documentsControllerDelete(id);
	}

	updateDocument(id: string, dto: UpdateDocumentDto) {
		return $api.documents.documentsControllerPath(id, dto);
	}
}

export const DocumentsService = new _DocumentsService();
