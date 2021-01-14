import React from 'react'
import {Link} from "react-router-dom";

const Paginate = ({maxPage, page, toLink}) => {
    return (
        maxPage > 1 && (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(maxPage).keys()].map((x) =>
                        <li key={x + 1} className={`page-item ${x + 1 === page ? 'active' : ''}`}>
                            <Link to={`${toLink}${x + 1}`}>
                                <span className="page-link">
                                    {x + 1}
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        )
    )
}

export default Paginate