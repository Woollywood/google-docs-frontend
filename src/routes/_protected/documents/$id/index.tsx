import { useGetDocumentById } from '@/api/hooks/queries/documents';
import { Editor } from '@/components/shared/editor';
import { Navbar } from '@/components/shared/navbars/document';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected/documents/$id/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { id } = Route.useParams();
	const { error } = useGetDocumentById(id);

	useEffect(() => {
		if (error instanceof AxiosError) {
			navigate({ to: '/' });
		}
	}, [error, navigate]);

	return (
		<div className='grid h-full min-h-screen grid-rows-[auto_1fr] gap-y-8'>
			<Navbar />
			<Editor />
		</div>
	);
}
