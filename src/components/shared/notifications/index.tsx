import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NotificationButton } from './NotificationButton';
import { NotificationContent } from './NotificationContent';

export const Notifications: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<NotificationButton />
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<NotificationContent />
			</PopoverContent>
		</Popover>
	);
};
