import { DocumentsTable } from '@/components/shared/DocumentsTable';
import { Navbar } from '@/components/shared/navbars/root';
import { TemplatesGallery } from '@/components/shared/TemplatesGallery';
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
