import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GlobalSpinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
	return (
		<div className={cn('flex size-full min-h-screen items-center justify-center', className)} {...props}>
			<Loader2Icon className='size-16 animate-spin' />
		</div>
	);
};
