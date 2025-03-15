import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { CreateDocumentDto } from '@/api/generatedApi';
import { useHandleError } from '@/hooks/useHandleError';
import { useCreateDocument } from '@/api/hooks/mutations/documents';

interface Template {
	id: string;
	label: string;
	imageUrl: string;
}

const templates: Template[] = [
	{ id: 'blank', label: 'Blank Document', imageUrl: '/blanks/blank-document.svg' },
	{ id: 'software-proposal', label: 'Software development proposal', imageUrl: '/blanks/software-proposal.svg' },
	{ id: 'project-proposal', label: 'Project proposal', imageUrl: '/blanks/project-proposal.svg' },
	{ id: 'business-letter', label: 'Business letter', imageUrl: '/blanks/business-letter.svg' },
	{ id: 'resume', label: 'Resume', imageUrl: '/blanks/resume.svg' },
	{ id: 'cover-letter', label: 'Cover letter', imageUrl: '/blanks/cover-letter.svg' },
	{ id: 'letter', label: 'Letter', imageUrl: '/blanks/letter.svg' },
];

export const TemplatesGallery: React.FC = () => {
	const navigate = useNavigate();
	const { handleError } = useHandleError();
	const { isPending, mutateAsync } = useCreateDocument();
	const onClick = async ({ title }: CreateDocumentDto) => {
		try {
			const { id } = await mutateAsync({ title });
			navigate({ to: '/documents/$id', params: { id: String(id) } });
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<div className='flex flex-col gap-y-4'>
			<h3 className='font-medium'>Start a new document</h3>
			<Carousel>
				<CarouselContent className='-ml-4'>
					{templates.map(({ id, label, imageUrl }) => (
						<CarouselItem
							key={id}
							className='basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]'>
							<div
								className={cn('flex aspect-[3/4] flex-col gap-y-2.5', {
									'pointer-events-none opacity-50': isPending,
								})}>
								<button
									className='relative flex size-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-sm border bg-white transition hover:border-blue-500 hover:bg-blue-50'
									onClick={() => onClick({ title: label })}>
									<img
										className='absolute top-0 left-0 size-full object-cover'
										src={imageUrl}
										alt={label}
									/>
								</button>
								<p className='truncate text-sm font-medium'>{label}</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};
