import React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { cn } from '@/lib/utils';

export const ListSpinner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div className={cn('flex w-full items-center justify-center', className)} {...props} ref={ref}>
				<ImSpinner8 className='size-8 animate-spin' />
			</div>
		);
	},
);
