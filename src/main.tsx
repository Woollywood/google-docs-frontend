import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';

import './assets/tailwind.css';
import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Router />
		</StrictMode>,
	);
}
