import React from 'react';
import { RootNavbar } from './root';
import { BsCloudCheck } from 'react-icons/bs';
import { Menu } from './components/Menu';

export const DocumentNavbar: React.FC = () => {
	return (
		<RootNavbar>
			<div className='flex flex-auto flex-col'>
				<div className='flex items-center gap-x-2'>
					<span className='cursor-pointer truncate px-1.5 text-lg'>Untitled Document</span>
					<BsCloudCheck />
				</div>
				<div className='flex'>
					<Menu />
				</div>
			</div>
		</RootNavbar>
	);
};
