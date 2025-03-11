import { Editor } from '@/components/shared/editor';
import { Navbar } from '@/components/shared/navbars/document';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/documents/$id/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='grid h-full min-h-screen grid-rows-[auto_1fr] gap-y-8'>
			<Navbar />
			<Editor />
		</div>
	);
}
