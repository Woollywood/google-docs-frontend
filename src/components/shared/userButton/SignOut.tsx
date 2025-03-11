import React, { useTransition } from 'react';
import { DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Loader2Icon, LogOut } from 'lucide-react';
import { useSignOut } from '@/queries/auth';

export const SignOut: React.FC = () => {
	const { mutateAsync } = useSignOut();
	const [isPending, startTransition] = useTransition();
	const handleSignOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		startTransition(async () => {
			await mutateAsync();
		});
	};

	return (
		<DropdownMenuItem onClick={handleSignOut}>
			<LogOut />
			<span>Log out</span>
			{isPending && <Loader2Icon className='animate-spin' />}
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		</DropdownMenuItem>
	);
};
