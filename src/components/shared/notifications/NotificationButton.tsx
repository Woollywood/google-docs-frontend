import React from 'react';
import { Button } from '@/components/ui/button';
import { ImNotification } from 'react-icons/im';
import { useGetNotificationsCount } from '@/api/hooks/queries/notifications';
import { cn } from '@/lib/utils';

export const NotificationButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { data, isPending } = useGetNotificationsCount();
		const hasNotifications = data || 0 > 0;

		return (
			<div className={cn('relative', className)} ref={ref} {...props}>
				<Button size='sm' variant='outline'>
					<ImNotification />
				</Button>
				{hasNotifications && (
					<div className='border-background bg-foreground text-background absolute -top-1 -right-1 z-10 flex size-4 items-center justify-center rounded-full border text-[0.6rem] font-medium'>
						{!isPending && data}
					</div>
				)}
			</div>
		);
	},
);
