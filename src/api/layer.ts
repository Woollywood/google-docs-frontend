import { AxiosResponse } from 'axios';

class _Layer {
	async getDataFrom<T>(method: Promise<AxiosResponse<T>>) {
		const { data } = await method;
		return data;
	}
}

export const ApiLayer = new _Layer();
