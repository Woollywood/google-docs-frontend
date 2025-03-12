import React from 'react';
import { RenameDialog } from '../dialogs/RenameDialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FilePenIcon } from 'lucide-react';
import { useUpdateDocument } from '@/queries/documents';
import { useForm } from 'react-hook-form';
import { renameSchema, RenameSchema } from '@/schemas/documents';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
		<RenameDialog
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
							<FormLabel />
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
		</RenameDialog>
	);
};
