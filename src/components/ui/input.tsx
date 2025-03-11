import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
	'flex w-full border border-input shadow-sm transition-colors file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-transparent file:bg-transparent file:text-foreground file:font-medium placeholder:text-muted-foreground',
			},
			size: {
				default: 'h-9 px-3 py-1 text-base rounded-md file:text-sm md:text-sm',
				sm: 'h-7 px-1 py-0.5 text-sm rounded-sm',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ variant, size, className, type, ...props }, ref) => {
	return <input type={type} className={cn(inputVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input, inputVariants };
