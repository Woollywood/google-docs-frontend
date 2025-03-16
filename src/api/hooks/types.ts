export interface LazyQuery {
	enabled?: boolean;
}

export interface SearchQuery {
	search?: string;
}

export interface PaginationQuery {
	order?: 'asc' | 'desc';
	take?: number;
}
