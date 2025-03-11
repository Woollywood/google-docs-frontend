class _LocalStorageService {
	get(key: string) {
		const value = localStorage.getItem(key);

		if (value !== null) {
			try {
				return JSON.parse(value);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				/* empty */
			}
		}

		return value;
	}

	set(key: string, value: unknown) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	has(key: string) {
		return this.get(key) !== null;
	}
}

export const LocalStorageService = new _LocalStorageService();
