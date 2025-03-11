import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useHandleError = () => {
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		if (error) {
			if (error instanceof AxiosError) {
				toast(error.response?.data?.message ?? error.message ?? 'Something went wrong');
			} else if (error instanceof Error) {
				toast(error.message ?? 'Something went wrong');
			} else {
				toast('Something went wrong');
			}
		}
	}, [error]);

	const handleError = (error: unknown) => {
		setError(error);
	};

	return { handleError };
};
