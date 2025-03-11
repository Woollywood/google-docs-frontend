import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import { QueryClientProvider } from '@/providers/queryClientProvider';

import './assets/tailwind.css';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider>
				<Router />
			</QueryClientProvider>
		</StrictMode>,
	);
}
