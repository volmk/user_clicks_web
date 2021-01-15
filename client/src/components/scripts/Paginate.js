import React from 'react'
import {Link} from "react-router-dom";
import '../styles/Paginate.scss'

function* pseudoRandom(seed) {
    let value = seed;

    while (true) {
        value = value * 16807 % 2147483647
        yield value;
    }
}

const pagination = (c, m) => {
    let current = c,
        last = m,
        delta = 3,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    let generator = pseudoRandom(1);

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push({page: l + 1, key: generator.next().value});
            } else if (i - l !== 1) {
                rangeWithDots.push({page: '...', key: generator.next().value});
            }
        }
        rangeWithDots.push({page: i, key: generator.next().value});
        l = i;
    }

    return rangeWithDots;
}

const Paginate = ({page, maxPage, toLink}) => {
    const getPageClass = (itemPage) => {
        return itemPage !== page ? 'pagination__item' : 'pagination__item pagination__item--active'
    }
    return (
        maxPage > 1 && (
            <nav>
                <ul className="pagination">
                    {pagination(page, maxPage).map((item) =>
                        <li key={item.key} className={getPageClass(item.page)}>
                            {item.page !== '...' ? (
                                <Link to={`${toLink}${item.page}`}>
                                    <span>
                                        {item.page}
                                    </span>
                                </Link>
                            ) : (
                                <span>
                                    {item.page}
                                </span>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        )
    )
}

export default Paginate