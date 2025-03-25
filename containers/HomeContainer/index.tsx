import { Button } from '@mui/material';
import React from 'react';
import { toast } from '~/utils/toast';

function HomeContainer() {
  return (
    <div>
      <Button
        onClick={() => {
          toast.success('Hello');
        }}
      >
        hello
      </Button>
      <Button
        onClick={() => {
          toast.success('Hello', undefined, {
            position: 'top-right',
          });
        }}
      >
        hello
      </Button>
    </div>
  );
}

export default HomeContainer;
