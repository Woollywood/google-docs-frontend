import React, { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { getCssVariable } from '@/helpers/dom';
import { cn } from '@/lib/utils';

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
	const [leftMargin, setLeftMargin] = useState(56);
	const [rightMargin, setRightMargin] = useState(56);

	const [isDraggingLeft, setIsDraggingLeft] = useState(false);
	const [isDraggingRight, setIsDraggingRight] = useState(false);
	const rulerRef = useRef<HTMLDivElement>(null);

	const handleLeftMouseDown = () => {
		setIsDraggingLeft(true);
	};

	const handleRightMouseDown = () => {
		setIsDraggingRight(true);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
			const container = rulerRef.current.querySelector('#ruler-container');
			if (container) {
				const editorWidthPX = parseInt(getCssVariable('--editor-width')) * 16;
				const minSpaceBetween = 100;

				const containerRect = container.getBoundingClientRect();
				const relativeX = e.clientX - containerRect.left;
				const rawPosition = Math.max(0, Math.min(editorWidthPX, relativeX));

				if (isDraggingLeft) {
					const maxLeftPosition = editorWidthPX - rightMargin - minSpaceBetween;
					const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
					setLeftMargin(newLeftPosition);
				} else if (isDraggingRight) {
					const maxRightPosition = editorWidthPX - (leftMargin + minSpaceBetween);
					const newRightPosition = Math.max(editorWidthPX - rawPosition, 0);
					const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
					setRightMargin(constrainedRightPosition);
				}
			}
		}
	};

	const handleMouseUp = () => {
		setIsDraggingLeft(false);
		setIsDraggingRight(false);
	};

	const handleLeftDoubleClick = () => {
		setLeftMargin(56);
	};

	const handleRightDoubleClick = () => {
		setRightMargin(56);
	};

	return (
		<div
			className='w-editor-width relative mx-auto flex h-6 select-none items-end border-b border-gray-300 print:hidden'
			ref={rulerRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}>
			<div id='ruler-container' className='relative h-full w-full'>
				<Marker
					position={leftMargin}
					isLeft={true}
					isDragging={isDraggingLeft}
					onMouseDown={handleLeftMouseDown}
					onDoubleClick={handleLeftDoubleClick}
				/>
				<Marker
					position={rightMargin}
					isLeft={false}
					isDragging={isDraggingRight}
					onMouseDown={handleRightMouseDown}
					onDoubleClick={handleRightDoubleClick}
				/>
				<div className='absolute inset-x-0 bottom-0 h-full'>
					<div className='w-editor-width relative h-full'>
						{markers.map((marker) => {
							const position = (marker * parseInt(getCssVariable('--editor-width')) * 16) / 82;

							return (
								<div key={marker} className='absolute bottom-0' style={{ left: `${position}px` }}>
									{marker % 10 === 0 && (
										<>
											<div className='absolute bottom-0 h-2 w-[0.0625rem] bg-neutral-500'></div>
											<span className='absolute bottom-2 -translate-x-1/2 transform text-[0.625rem] text-neutral-500'>
												{marker / 10 + 1}
											</span>
										</>
									)}
									{marker % 5 === 0 && marker % 10 !== 0 && (
										<div className='absolute bottom-0 h-1.5 w-[0.0625rem] bg-neutral-500' />
									)}
									{marker % 5 !== 0 && (
										<div className='absolute bottom-0 h-1 w-[0.0625rem] bg-neutral-500' />
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

interface MarkerProps {
	position: number;
	isLeft: boolean;
	isDragging: boolean;
	onMouseDown: () => void;
	onDoubleClick: () => void;
}

const Marker: React.FC<MarkerProps> = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }) => {
	return (
		<div
			className='group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize'
			style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
			onMouseDown={onMouseDown}
			onDoubleClick={onDoubleClick}>
			<FaCaretDown className='absolute left-1/2 top-0 h-full -translate-x-1/2 transform fill-blue-500' />
			<div
				className={cn(
					'absolute left-1/2 top-4 h-[87vh] w-[0.0625rem] -translate-x-1/2 scale-x-50 transform bg-[#3b72f6]',
					isDragging ? 'block' : 'hidden',
				)}></div>
		</div>
	);
};
