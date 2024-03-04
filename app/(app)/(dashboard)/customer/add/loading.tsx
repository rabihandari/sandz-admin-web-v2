import React from 'react';
import FormLoadingComponent from '@/components/FormLoadingComponent';

const Loading = () => {
  return (
    <FormLoadingComponent numberOfInputs={4} shouldRenderImageInput={false} />
  );
};

export default Loading;
