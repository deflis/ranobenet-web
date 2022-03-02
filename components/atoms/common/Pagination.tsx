import { useMemo } from 'react';
import NextLink from 'next/link';
import { container, current, dots, nav, next, page, previous } from './Pagination.module.css';
import { UrlObject } from 'url';

declare type Url = string | UrlObject;

export type PagedList = {
  currentPage: number;
  totalPages: number;
};

const range = (start: number, end: number) => [...Array(end + 1).keys()].slice(start);

const DOTS = -1;

const usePagination = ({ currentPage, totalPages }: PagedList, siblingCount: number = 1) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers < totalPages) {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);

        return [...leftRange, DOTS, totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }
    return range(1, totalPages);
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};
export const Pagination: React.FC<{ pagedList: PagedList; createHref: (page: number) => Url }> = ({
  pagedList,
  createHref,
}) => {
  const pagination = usePagination(pagedList);
  const { currentPage, totalPages } = pagedList;
  return (
    <div className={container}>
      <nav className={nav}>
        {currentPage > 1 ? (
          <NextLink href={createHref(currentPage - 1)}>
            <a className={previous}>
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clip-rule='evenodd'
                />
              </svg>
            </a>
          </NextLink>
        ) : (
          <span className={previous}>
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clip-rule='evenodd'
              />
            </svg>
          </span>
        )}
        {pagination.map((pageNumber, i) => (
          <>
            {pageNumber === DOTS ? (
              <NextLink href={createHref(pageNumber)} key={i}>
                <span className={dots}>...</span>
              </NextLink>
            ) : pageNumber === currentPage ? (
              <span className={current}>{pageNumber}</span>
            ) : (
              <NextLink href={createHref(pageNumber)} key={i}>
                <a className={page}>{pageNumber}</a>
              </NextLink>
            )}
          </>
        ))}
        {currentPage <= totalPages ? (
          <NextLink href={createHref(currentPage + 1)}>
            <a className={next}>
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clip-rule='evenodd'
                />
              </svg>
            </a>
          </NextLink>
        ) : (
          <span className={next}>
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clip-rule='evenodd'
              />
            </svg>
          </span>
        )}
      </nav>
    </div>
  );
};
