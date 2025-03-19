import React from 'react';
import ReactPaginate from 'react-paginate';
import './paginated.css'

export function PaginatedItems({ itemsPerPage ,data ,setPage,total}) {
    
  return (
    <>
      <ReactPaginate
        nextLabel=" >>"
        onPageChange={(e)=>setPage(e.selected+1)}
        pageRangeDisplayed={3}
        pageCount={total/itemsPerPage}
        previousLabel="<<"
        previousLinkClassName="previousLinkClassName"
        nextLinkClassName="nextLinkClassName"
        renderOnZeroPageCount={undefined}
        className='pagination-cus d-flex align-items-center justify-content-end list-unstyled'
        pageLinkClassName="a_links"
        activeLinkClassName="active-links"
      />
    </>
  );
}