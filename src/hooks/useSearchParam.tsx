import { parseAsString, useQueryState } from 'nuqs';

export const useSearchParam = (key: string, defaulURL?: string) => {
	return useQueryState(key, parseAsString.withDefault(defaulURL || '').withOptions({ clearOnDefault: true }));
};
