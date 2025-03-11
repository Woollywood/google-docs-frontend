import React from 'react';
import { SearchInput } from './SearchInput';
import { Link } from '@tanstack/react-router';
import { UserButton } from '../../userButton';

export const Navbar: React.FC = () => {
	return (
		<div className='flex w-full items-center justify-between py-4'>
			<div className='flex shrink-0 items-center pr-6'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/logo.svg' alt='logo' width={36} height={36} />
					<h3 className='text-xl'>Docs</h3>
				</Link>
			</div>
			<SearchInput />
			<UserButton />
		</div>
	);
};
