import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { container, current, dots, nav, next, page, previous } from './Pagination.module.css';
import { UrlObject } from 'url';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

declare type Url = string | UrlObject;

export type PagedList = {
  currentPage: number;
  totalPages: number;
};

const range = (start: number, end: number) => [...Array(end + 1).keys()].slice(start);

const DOTS = -1;

const usePagination = ({ currentPage, totalPages }: PagedList, siblingCount: number = 1) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

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
              <HiChevronLeft />
            </a>
          </NextLink>
        ) : (
          <span className={previous}>
            <HiChevronLeft />
          </span>
        )}
        {pagination.map((pageNumber, i) => (
          <React.Fragment key={i}>
            {pageNumber === DOTS ? (
              <NextLink href={createHref(pageNumber)}>
                <span className={dots}>...</span>
              </NextLink>
            ) : pageNumber === currentPage ? (
              <span className={current}>{pageNumber}</span>
            ) : (
              <NextLink href={createHref(pageNumber)}>
                <a className={page}>{pageNumber}</a>
              </NextLink>
            )}
          </React.Fragment>
        ))}
        {currentPage <= totalPages ? (
          <NextLink href={createHref(currentPage + 1)}>
            <a className={next}>
              <HiChevronRight />
            </a>
          </NextLink>
        ) : (
          <span className={next}>
            <HiChevronRight />
          </span>
        )}
      </nav>
    </div>
  );
};
