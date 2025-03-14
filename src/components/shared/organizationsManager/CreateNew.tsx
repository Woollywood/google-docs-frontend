import React from 'react';
import { Dialog } from '../modals/Dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrganizationSchema, createOrganizationSchema } from '@/schemas/organizations';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateOrganization } from '@/queries/organizations';
import { FaPlus } from 'react-icons/fa';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const CreateNew: React.FC = () => {
	const { mutateAsync, isPending } = useCreateOrganization();

	const form = useForm<CreateOrganizationSchema>({
		resolver: zodResolver(createOrganizationSchema),
		defaultValues: {
			title: '',
		},
	});

	const onSubmit = form.handleSubmit(async (dto: CreateOrganizationSchema) => {
		await mutateAsync(dto);
	});

	const {
		control,
		formState: { isSubmitSuccessful },
	} = form;
	return (
		<Dialog
			title='Create organization'
			description='Create new organization'
			isSubmitSuccessful={isSubmitSuccessful}
			handler={onSubmit}
			isPending={isPending}
			triggerChild={
				<DropdownMenuItem onClick={(e) => e.stopPropagation()} className='justify-center'>
					<FaPlus className='size-3' />
					Create
				</DropdownMenuItem>
			}>
			<Form {...form}>
				<FormField
					control={control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
		</Dialog>
	);
};
