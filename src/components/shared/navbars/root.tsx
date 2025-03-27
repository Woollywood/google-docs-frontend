import React from 'react';
import { Link } from '@tanstack/react-router';
import { OrganizationsManager } from '../organizationsManager';
import { Notifications } from '../Notifications';
import { UserButton } from '../userButton';
import { cn } from '@/lib/utils';

interface Props {
	logoTitle?: string;
}

export const RootNavbar: React.FC<Props & React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>> = ({
	logoTitle,
	className,
	children,
	...props
}) => {
	return (
		<div className={cn('flex w-full items-center justify-between py-4', className)} {...props}>
			<div className='flex shrink-0 items-center pr-6'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/logo.svg' alt='logo' width={36} height={36} />
					{logoTitle && <h3 className='text-xl'>{logoTitle}</h3>}
				</Link>
			</div>
			{children}
			<div className='flex items-center gap-2'>
				<OrganizationsManager />
				<Notifications />
				<UserButton />
			</div>
		</div>
	);
};
