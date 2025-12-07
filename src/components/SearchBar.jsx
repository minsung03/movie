import React from "react";

const SearchBar = ({ query, onChangeQuery, inputRef }) => {
	return (
		<div className="search-bar">
			<label className="search-bar__label" htmlFor="search">
				영화 검색
			</label>
			<input
				id="search"
				ref={inputRef}
				className="search-bar__input"
				type="text"
				placeholder="제목 또는 줄거리로 검색해보세요"
				value={query}
				onChange={onChangeQuery}
			/>
		</div>
	);
}

export default SearchBar;
