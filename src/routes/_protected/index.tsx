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
			{/* {isPending ? <div>Loading...</div> : data?.data.map(({ title, id }) => <h1 key={id}>{title}</h1>)} */}
		</div>
	);
}
