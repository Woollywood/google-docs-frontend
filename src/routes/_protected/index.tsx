import { DocumentsTable } from '@/components/shared/documents/DocumentsTable';
import { TemplatesGallery } from '@/components/shared/documents/TemplatesGallery';
import { Navbar } from '@/components/shared/navbars/root';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/')({
	component: Index,
});

function Index() {
	return (
		<div className='grid h-full grid-rows-[auto_1fr] gap-6'>
			<Navbar />
			<TemplatesGallery />
			<DocumentsTable />
		</div>
	);
}
