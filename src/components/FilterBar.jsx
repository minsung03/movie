import React from "react";

const FilterBar = ({
	genres,
	selectedGenre,
	selectedRating,
	onChangeGenre,
	onChangeRating,
}) => {
	return (
		<div className="filter-bar">
			<div className="filter-bar__group">
				<label htmlFor="genre">장르</label>
				<select id="genre" value={selectedGenre} onChange={onChangeGenre}>
					<option value="all">전체</option>
					{Object.entries(genres).map(([id, name]) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</div>

			<div className="filter-bar__group">
				<label htmlFor="rating">평점</label>
				<select id="rating" value={selectedRating} onChange={onChangeRating}>
					<option value="all">전체</option>
					<option value="7up">7점 이상</option>
					<option value="8up">8점 이상</option>
				</select>
			</div>
		</div>
	);
}

export default FilterBar;