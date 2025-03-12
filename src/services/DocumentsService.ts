import { $api } from '@/api';
import { CreateDocumentDto } from '@/api/generatedApi';

class _DocumentsService {
	async getDocuments({
		page = 1,
		take = 10,
		order = 'ASC',
	}: { page?: number; take?: number; order?: 'ASC' | 'DESC' } = {}) {
		const { data } = await $api.documents.documentsControllerGetMyDocument({ page, take, order });
		return data;
	}

	async createDocument(dto: CreateDocumentDto) {
		const { data } = await $api.documents.documentsControllerCreateDocument(dto);
		return data;
	}
}

export const DocumentsService = new _DocumentsService();
