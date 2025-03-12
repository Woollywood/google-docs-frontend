import React, { useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

interface Props {
	fallback: React.ReactElement;
	nextPageFallback: React.ReactElement;
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: () => void;
	options?: IntersectionOptions;
}

export const InfiniteList: React.FC<React.PropsWithChildren & Props> = ({
	children,
	fallback,
	nextPageFallback,
	isLoading,
	hasNextPage,
	fetchNextPage,
	options,
}) => {
	const { ref, inView } = useInView(options);

	useEffect(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<div>
			{isLoading ? (
				fallback
			) : (
				<>
					{children}
					{hasNextPage && <Slot ref={ref}>{nextPageFallback}</Slot>}
				</>
			)}
		</div>
	);
};
