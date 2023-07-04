import React, { memo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  onPaginateClick: (type: string) => void;
  isDisablePrev: boolean;
  isDisableNext: boolean;
}

export const Paginate = memo(({ onPaginateClick, isDisablePrev, isDisableNext }: Props) => {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => {
          onPaginateClick('prev');
        }}
        disabled={isDisablePrev}
      />
      <Pagination.Next onClick={() => onPaginateClick('next')} disabled={isDisableNext} />
    </Pagination>
  );
});
