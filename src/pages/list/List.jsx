import {useCallback, useEffect, useRef, useState, useMemo, useContext} from "react";
import FilterBar from "/src/components/FilterBar.jsx";
import SearchBar from "/src/components/SearchBar.jsx";
import { MovieContext } from "../../util/movieUtil.jsx";
import Movie from "../../components/Movie.jsx";
import MovieDetailModal from "../../components/MovieDetailModal.jsx";

export default function List() {
	// 검색/필터 상태
	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, []);

	const { selectedMovie, setSelectedMovie, movies, GENRES } = useContext(MovieContext);
	const [query, setQuery] = useState("");
	const [selectedGenre, setSelectedGenre] = useState("all");
	const [selectedRating, setSelectedRating] = useState("all");
	const searchInputRef = useRef(null);

	const handleChangeQuery = useCallback((e) => {
		setQuery(e.target.value);
	}, []);

	const handleChangeGenre = useCallback((e) => {
		setSelectedGenre(e.target.value);
	}, []);

	const handleChangeRating = useCallback((e) => {
		setSelectedRating(e.target.value);
	}, []);

	const filteredMovies = useMemo(() => {
		if (!movies || movies.length === 0) return [];

		const lowerQuery = query.trim().toLowerCase();

		return movies
			.filter((movie) => {
				// 검색어 필터 (제목)
				if (lowerQuery) {
					const inTitle = movie.title?.toLowerCase().includes(lowerQuery);
					if (!inTitle) return false;
				}

				// 장르 필터
				if (selectedGenre !== "all") {
					const genreIds = movie.genre_ids || [];
					const hasGenre = genreIds.includes(Number(selectedGenre));
					if (!hasGenre) return false;
				}

				// 평점 필터
				if (selectedRating !== "all") {
					const vote = movie.vote_average || 0;
					if (selectedRating === "7up" && vote < 7) return false;
					if (selectedRating === "8up" && vote < 8) return false;
				}

				return true;
			})
			.sort((a, b) => b.popularity - a.popularity); // 인기순 정렬
	}, [movies, query, selectedGenre, selectedRating]);

	const handleOpenDetail = useCallback((movie) => {
		setSelectedMovie(movie);
	}, []);

	const handleCloseDetail = useCallback(() => {
		setSelectedMovie(null);
	}, []);

	return (
		<>
			<section className="app-main__controls">
				<SearchBar
					query={query}
					onChangeQuery={handleChangeQuery}
					inputRef={searchInputRef}
				/>
				<FilterBar
					genres={GENRES}
					selectedGenre={selectedGenre}
					selectedRating={selectedRating}
					onChangeGenre={handleChangeGenre}
					onChangeRating={handleChangeRating}
				/>
			</section>

			<section className="app-main__content">
				{filteredMovies.length === 0 ? (
					<div className="empty-state">
						<p>조건에 맞는 영화가 없어요.</p>
						<p>검색어 또는 필터를 다시 조정해보세요.</p>
					</div>
				) : (
					<div className="move-list-cover hide-scrollbar">
						<ul className="movie-list">
							{filteredMovies.map((movie) => (
								<Movie
									key={movie.id}
									movie={movie}
									genres={GENRES}
									onOpenDetail={handleOpenDetail}
								/>
							))}
						</ul>
					</div>
				)}
			</section>

			{selectedMovie && (
				<MovieDetailModal
					movie={selectedMovie}
					genres={GENRES}
					onClose={handleCloseDetail}
				/>
			)}
		</>
	)
}