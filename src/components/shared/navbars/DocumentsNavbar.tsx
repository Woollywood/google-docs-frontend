import React from 'react';
import { RootNavbar } from './root';
import { SearchInput } from './components/SearchInput';

export const DocumentsNavbar: React.FC = () => {
	return (
		<RootNavbar logoTitle='Docs'>
			<SearchInput className='justify-start' />
		</RootNavbar>
	);
};
