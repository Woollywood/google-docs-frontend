import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/useSearchParam';
import { cn } from '@/lib/utils';
import { SearchIcon, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

export const SearchInput: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
	const [search, setSearch] = useSearchParam('search');
	const [value, setValue] = useState(search);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClear = () => {
		setValue('');
		setSearch('');
		inputRef.current?.blur();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearch(value);
		inputRef.current?.blur();
	};

	return (
		<div className={cn('flex flex-1 items-center justify-center', className)} {...props}>
			<form className='relative w-full max-w-[45rem]' onSubmit={handleSubmit}>
				<Input
					placeholder='Search'
					className='h-[3rem] w-full rounded-full border-none bg-[#f0f4f8] px-14 placeholder:text-neutral-800 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),_0_1px_3px_1px_rgba(65,69,73,.15)] focus-visible:ring-0 md:text-base'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					ref={inputRef}
				/>
				<Button variant='ghost' className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full'>
					<SearchIcon className='size-5' />
				</Button>
				{value && (
					<Button
						type='button'
						variant='ghost'
						className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full'
						onClick={handleClear}>
						<XIcon className='size-5' />
					</Button>
				)}
			</form>
		</div>
	);
};
