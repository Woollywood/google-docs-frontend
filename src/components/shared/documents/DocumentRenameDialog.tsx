import React from 'react';
import { Dialog } from '../modals/Dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FilePenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { renameSchema, RenameSchema } from '@/schemas/documents';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateDocument } from '@/api/hooks/mutations/documents';

interface Props {
	id: string;
	title?: string;
}

export const DocumentRenameDialog: React.FC<Props> = ({ id, title = '' }) => {
	const { mutateAsync, isPending } = useUpdateDocument();
	const form = useForm<RenameSchema>({
		resolver: zodResolver(renameSchema),
		defaultValues: {
			title,
		},
	});

	const { control } = form;
	const onSubmit = form.handleSubmit(async ({ title }: RenameSchema) => {
		await mutateAsync({ id, dto: { title } });
	});

	const {
		formState: { isSubmitSuccessful },
	} = form;
	return (
		<Dialog
			title='Rename Document'
			description='Enter new title'
			isPending={isPending}
			handler={onSubmit}
			isSubmitSuccessful={isSubmitSuccessful}
			triggerChild={
				<DropdownMenuItem
					className='w-full'
					onSelect={(e) => e.preventDefault()}
					onClick={(e) => e.stopPropagation()}>
					<FilePenIcon className='mr-2 size-4' />
					Rename
				</DropdownMenuItem>
			}>
			<Form {...form}>
				<FormField
					control={control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
		</Dialog>
	);
};
