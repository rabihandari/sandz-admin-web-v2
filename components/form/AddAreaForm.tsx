import React from 'react';
import Wrapper from '../Wrapper';
import { Iarea, IareaForm } from '@/types';
import { AREAS_COLLECTION } from '@/constants';
import { uploadImage } from '@/firebase/client';
import { Alert, TextField } from '@mui/material';
import { areaSchema } from '@/schemas/areaSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHeader from '../formComponents/FormHeader';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormItemWrapper from '../formComponents/FormItemWrapper';
import UploadImageFormItem from '../formComponents/UploadImageFormItem';

interface Iprops {
  isInPannel?: boolean;
  onReset?: () => void;
  defaultValues?: Iarea;
  // to support both create and update
  handleSubmitForm: (area: Omit<Iarea, 'id'>, id?: string) => Promise<void>;
}

const AddAreaForm: React.FC<Iprops> = ({
  onReset,
  defaultValues,
  handleSubmitForm,
  isInPannel = false,
}) => {
  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IareaForm>({
    resolver: yupResolver(areaSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          image: defaultValues.imageUrl,
        }
      : undefined,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { errorMessage, handleCatchError, setErrorMessage } = useCatchErrors();

  const resetForm = () => {
    onReset?.();
    reset();
  };

  const onSubmit: SubmitHandler<IareaForm> = async ({ image, name }) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      let imageUrl = '';

      // in case of update if the image is not updated it will be the URL
      if (typeof image !== 'string') {
        imageUrl = await uploadImage(AREAS_COLLECTION, image);
      } else {
        imageUrl = image;
      }

      await handleSubmitForm(
        {
          name: name.trim(),
          imageUrl,
        },
        defaultValues?.id,
      );

      resetForm();
    } catch (err: any) {
      await handleCatchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-grow'>
      <div
        className={
          isInPannel ? 'flex flex-col justify-between h-full gap-5' : ''
        }
      >
        <div className='flex flex-col gap-5'>
          {!isInPannel && (
            <FormHeader
              reset={resetForm}
              isLoading={isLoading}
              title='Add a new area'
              buttonLabel='Publish Area'
            />
          )}
          {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <Wrapper isInPannel={isInPannel}>
            <h4 className='text-lg font-medium text-gray'>Area information</h4>
            <FormItemWrapper label='Area' errorMsg={errors.name?.message}>
              <TextField
                fullWidth
                placeholder='Area Name'
                {...register('name')}
              />
            </FormItemWrapper>
          </Wrapper>
          <UploadImageFormItem
            label='Image'
            isInPannel={isInPannel}
            error={errors.image?.message}
            getValues={() => getValues('image')}
            setValue={(file) => setValue('image', file)}
          />
        </div>
        {isInPannel && (
          <FormHeader
            reset={resetForm}
            isLoading={isLoading}
            buttonLabel='Apply Changes'
          />
        )}
      </div>
    </form>
  );
};

export default AddAreaForm;
