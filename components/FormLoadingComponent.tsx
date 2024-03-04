import Wrapper from './Wrapper';
import { Skeleton } from '@mui/material';

interface Iprops {
  numberOfInputs: number;
  shouldRenderImageInput: boolean;
}

const FormLoadingComponent: React.FC<Iprops> = ({
  numberOfInputs,
  shouldRenderImageInput,
}) => {
  const columns = Array.from({ length: numberOfInputs }, (_, i) => i + 1);

  return (
    <div className='p-10'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <Skeleton width={200} height={60} />
          <div className='flex gap-4'>
            <Skeleton width={100} height={60} />
            <Skeleton width={150} height={60} />
          </div>
        </div>
        <Wrapper>
          <Skeleton width={200} height={60} />
          {columns.map((item) => (
            <div key={item}>
              <Skeleton width={180} height={40} />
              <Skeleton width={500} height={80} />
            </div>
          ))}
        </Wrapper>
        {shouldRenderImageInput && (
          <Wrapper>
            <Skeleton width={200} height={60} />
            <Skeleton width={180} height={40} />
            <Skeleton width={500} height={300} className='p-0' />
          </Wrapper>
        )}
      </div>
    </div>
  );
};

export default FormLoadingComponent;
