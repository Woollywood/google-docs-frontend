import React from 'react';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	isActive?: boolean;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
	({ className, isActive, onClick, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm transition-colors hover:bg-neutral-200/80',
					{ 'bg-neutral-200/80': isActive },
					className,
				)}
				onClick={onClick}
				{...props}
			/>
		);
	},
);
