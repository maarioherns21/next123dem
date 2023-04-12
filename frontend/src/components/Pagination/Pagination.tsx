import { FC } from "react";

interface Props {
  totalMovies: number;
  moviesPerPage: any;
  setCurrentPage: any;
}

const Pagination: FC<Props> = ({
  totalMovies,
  moviesPerPage,
  setCurrentPage,
}) => {
  const pages: any = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page: number, index: number) => (
        <button key={index} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </>
  );
};

export default Pagination;
