import { Link } from "globalComponents/elements";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  page: number,
  limit: number,
  totalRecords: number,
  setPage: (a: number) => void
}

const NumericPagination = (
  {
    page,
    limit,
    totalRecords,
    setPage
  } : Props
) => {

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(limit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  
  const pages: any[] = [];
  for (let i = 1; i <= Math.ceil(totalRecords / limit); i++) {
    pages.push(i);
  }
  
  const handleClick = (num) => { 
    setPage(Number(num));
  };
  
  const renderPageNumbers = pages.map((number) => {    
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {      
      return (
        <li
          key={number}
        >
          <Link
            href="#"
            onClick={e => {
              e.preventDefault();              
              handleClick(number)
            }}
            className={`${page === number && "active-pagination"}`}
          >{number}</Link>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setPage(page + 1);

    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + limit);
      setminPageNumberLimit(minPageNumberLimit + limit);
    }
  };

  const handlePrevbtn = () => {
    setPage(page - 1);

    if ((page - 1) % limit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - limit);
      setminPageNumberLimit(minPageNumberLimit - limit);
    }
  };

  let pageIncrementBtn: any = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
    <li onClick={handleNextbtn}> 
      <Link
        href="#"
        onClick={e => {
          e.preventDefault();              
          if(page < pages[pages.length - 1]) handleNextbtn()
        }}
      >&hellip;</Link>
    </li>
    );
  }

  let pageDecrementBtn: any = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handleNextbtn}> 
      <Link
        href="#"
        onClick={e => {
          e.preventDefault();              
          if(page > pages[0]) handlePrevbtn()
        }}
      >&hellip;</Link>
    </li>
    );
  }

  return(
    <div className="avalable-pagination">
      <ul>
            <li>
              <Link
                href="#"
                onClick={e => {
                  e.preventDefault()
                  if(page > pages[0]) handlePrevbtn()
                }
              }
              >
                <FaAngleLeft />
              </Link>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <Link
                href="#"
                onClick={e => 
                  {
                    e.preventDefault();
                    if(page < pages[pages.length - 1]) handleNextbtn()
                  }
                }
              >
                <FaAngleRight />
              </Link>
            </li>
      </ul>
    </div>
  )
}

export default NumericPagination;