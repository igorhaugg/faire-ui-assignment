import React from 'react'
import { css } from 'emotion'

const Pagination = ({ page, products, handlePagination }) => {
	const numberOfPages = products.length > 9 ? Math.ceil(products.length / 9) : 1
	const numberOfPagesArray = Array(numberOfPages).fill(1)

	return (
		numberOfPages > 1 && (
			<section className={pagination}>
				{page === 1 ? (
					<span
						className={`${pagination__item} ${pagination__inactive}`}
						key={'first'}>
						First
					</span>
				) : (
					<span
						className={pagination__item}
						onClick={() => handlePagination(1)}
						key={'first'}>
						First
					</span>
				)}

				{numberOfPagesArray.map((item, index) => {
					const itemStyle =
						page === index + 1
							? `${pagination__item} ${pagination__active}`
							: `${pagination__item}`

					const first = page === 1 && index === 2
					const last =
						page === numberOfPagesArray.length &&
						index + 1 === numberOfPagesArray.length - 2
					if (
						index + 1 === page - 1 ||
						index + 1 === page ||
						index + 1 === page + 1 ||
						first ||
						last
					) {
						return (
							<span
								className={itemStyle}
								onClick={() => handlePagination(index + 1)}
								key={index}>
								{index + 1}
							</span>
						)
					} else {
						return undefined
					}
				})}
				{page === numberOfPagesArray.length ? (
					<span
						className={`${pagination__item} ${pagination__inactive}`}
						key={'last'}>
						Last
					</span>
				) : (
					<span
						className={pagination__item}
						onClick={() => handlePagination(numberOfPagesArray.length)}
						key={'last'}>
						Last
					</span>
				)}
			</section>
		)
	)
}

const pagination = css`
	align-items: center;
	display: flex;
	justify-content: center;
`
const pagination__item = css`
	background-color: #000000;
	border: 1px solid transparent;
	border-radius: 5px;
	color: #ffffff;
	cursor: pointer;
	padding: 10px 25px;
	margin: 10px 5px;
`

const pagination__active = css`
	background-color: #cccccc;
	font-weight: bold;
`

const pagination__inactive = css`
	background-color: #ffffff;
	border: 1px solid #cccccc;
	color: #000000;
	cursor: not-allowed;
`

export default Pagination
