import React from 'react';
import Wrapper from '../Wrapper';
import { planOptions } from '@/constants';
import { Icustomer, IcustomerForm } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHeader from '../formComponents/FormHeader';
import { useCatchErrors } from '@/hooks/useCatchErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { customerSchema } from '@/schemas/customerSchema';
import FormItemWrapper from '../formComponents/FormItemWrapper';
import { Alert, MenuItem, Select, TextField } from '@mui/material';

interface Iprops {
  isInPannel?: boolean;
  onReset?: () => void;
  defaultValues?: Icustomer;
  // to support both create and update
  handleSubmitForm: (
    customer: Omit<Icustomer, 'uid'>,
    uid?: string,
    updatedEmail?: string,
  ) => Promise<void>;
}

const AddCustomerForm: React.FC<Iprops> = ({
  onReset,
  defaultValues,
  handleSubmitForm,
  isInPannel = false,
}) => {
  const {
    watch,
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IcustomerForm>({
    resolver: yupResolver(customerSchema),
    defaultValues: defaultValues
      ? {
          plan: defaultValues.plan,
          displayName: defaultValues.displayName,
          emailAddress: defaultValues.emailAddress,
          mobileNumber: defaultValues.mobileNumber,
        }
      : undefined,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { errorMessage, handleCatchError, setErrorMessage } = useCatchErrors();

  const resetForm = () => {
    onReset?.();
    reset();
  };

  const onSubmit: SubmitHandler<IcustomerForm> = async ({
    plan,
    displayName,
    emailAddress,
    mobileNumber,
  }) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      await handleSubmitForm(
        {
          plan,
          displayName,
          emailAddress,
          mobileNumber,
          role: 'customer',
        },
        defaultValues?.uid,
        defaultValues?.emailAddress !== emailAddress ? emailAddress : undefined,
      );

      resetForm();
    } catch (err: any) {
      await handleCatchError(err);
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
              title='Add a new customer'
              buttonLabel='Add Customer'
            />
          )}
          {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <Wrapper isInPannel={isInPannel}>
            <h4 className='text-lg font-medium text-gray'>
              Customer information
            </h4>
            <FormItemWrapper
              label='Name'
              errorMsg={errors.displayName?.message}
            >
              <TextField
                fullWidth
                placeholder='Full name'
                {...register('displayName')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Email'
              errorMsg={errors.emailAddress?.message}
            >
              <TextField
                fullWidth
                placeholder='Email address'
                {...register('emailAddress')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Contact'
              errorMsg={errors.mobileNumber?.message}
            >
              <TextField
                fullWidth
                placeholder='Contact number'
                {...register('mobileNumber')}
              />
            </FormItemWrapper>
            <FormItemWrapper
              label='Select plan'
              errorMsg={errors.plan?.message}
            >
              <Select
                fullWidth
                placeholder='Select plan'
                defaultValue={getValues('plan')}
                {...register('plan')}
              >
                {planOptions.map((item) => (
                  <MenuItem key={item.key} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormItemWrapper>
          </Wrapper>
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

export default AddCustomerForm;
