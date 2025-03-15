import React, { useEffect, useState } from 'react';
import {
	Dialog as DialogRoot,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';

interface Props extends React.PropsWithChildren {
	title: string;
	description: string;
	triggerChild: React.ReactNode;
	isPending: boolean;
	isSubmitSuccessful?: boolean;
	handler?: () => Promise<unknown>;
}

export const Dialog: React.FC<Props> = ({
	title,
	description,
	triggerChild,
	children,
	isPending,
	isSubmitSuccessful,
	handler,
}) => {
	const [open, setOpen] = useState(false);

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		await handler?.();
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			setOpen(false);
		}
	}, [isSubmitSuccessful]);

	return (
		<DialogRoot open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerChild}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]' onClick={(e) => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className='my-4'>{children}</div>
				<DialogFooter>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button onClick={onSubmit} disabled={isPending}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
};
