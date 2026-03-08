import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

const ClientPagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  // Compute pages to display
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) =>
      p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <Pagination className="">
      <PaginationContent className="flex-nowrap items-center">

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Pages */}
        {pages.map((p, index) => {
          const prev = pages[index - 1];

          return (
            <PaginationItem key={`page-${p}`} className="flex items-center">
              {/* Ellipsis */}
              {prev && p - prev > 1 && (
                <div className="flex items-center mx-1">
                  <PaginationEllipsis />
                </div>
              )}

              {/* Page Link */}
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
                className={`flex items-center justify-center w-9 h-9 rounded-md ${
                  page === p ? " hover:border-0 text-primary border border-primary transition" : ""
                }`}
                aria-current={page === p ? "page" : undefined}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};

export default ClientPagination;

