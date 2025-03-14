import React, { useState } from 'react';
import {
	AlertDialog as AlertDialogRoot,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props extends React.PropsWithChildren {
	handler: () => Promise<unknown>;
	isPending?: boolean;
}

export const AlertDialog: React.FC<Props> = ({ children, isPending, handler }) => {
	const [open, setOpen] = useState(false);

	const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		await handler();
		setOpen(false);
	};

	return (
		<AlertDialogRoot open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild className='w-full'>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onClick} disabled={isPending}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialogRoot>
	);
};
