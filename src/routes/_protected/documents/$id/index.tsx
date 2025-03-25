import { useGetDocumentById } from '@/api/hooks/queries/documents';
import { Editor } from '@/components/shared/editor';
import { Navbar } from '@/components/shared/navbars/document';
import { createFileRoute } from '@tanstack/react-router';
import { GlobalSpinner } from '@/components/shared/spinners/GlobalSpinner';
import { useGetRoomByDocumentId } from '@/api/hooks/queries/liveblocks';
import { useEffect } from 'react';
import { useEnterRoom } from '@/api/hooks/mutations/liveblocks';

export const Route = createFileRoute('/_protected/documents/$id/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: room, isSuccess: isSuccessGetRoom, isError } = useGetRoomByDocumentId(id);
	const { mutateAsync: enterRoom, isSuccess } = useEnterRoom();

	useEffect(() => {
		if (isSuccessGetRoom) {
			enterRoom(room.id);
		}
	}, [enterRoom, isSuccessGetRoom, room]);

	const { isPending } = useGetDocumentById(id, { enabled: isSuccess });

	function renderError() {
		return (
			<div className='flex items-center justify-center'>
				<h1>Access denied</h1>
			</div>
		);
	}

	function renderContent() {
		return isPending ? <GlobalSpinner className='min-h-auto' /> : <Editor id={id} />;
	}

	return (
		<div className='grid h-full min-h-screen grid-rows-[auto_1fr] gap-y-8'>
			<Navbar />
			{isError ? renderError() : renderContent()}
		</div>
	);
}
