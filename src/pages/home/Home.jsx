import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "/src/util/movieUtil.jsx";
import Movie from "/src/components/Movie.jsx";
import MovieDetailModal from "/src/components/MovieDetailModal.jsx";

export default function Home() {
	const { selectedMovie, setSelectedMovie, boxOffices, GENRES } = useContext(MovieContext);

	const handleOpenDetail = useCallback((movie) => {
		setSelectedMovie(movie);
	}, []);

	const handleCloseDetail = useCallback(() => {
		setSelectedMovie(null);
	}, []);

	if(!boxOffices || boxOffices.length === 0) {
		return (
			<div className="app app--loading">
				<div className="app__loading-text">Now Loading...</div>
			</div>
		);
	}

	return (
		<div className="m-auto pt-10">
			<div className="grid grid-cols-3 w-full items-center px-4 py-2 min-w-[1088px]">
				<div></div>
				<p className="text-center select-none" style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.2)" }}>박스오피스</p>
				<p className="text-right">
					<span className="cursor-pointer">
						<Link to="/list">더 많은 영화보기</Link>
					</span>
				</p>
			</div>
			<div>
				<div className="overflow-x-auto whitespace-nowrap flex gap-4 hide-scrollbar justify-between mt-[10px] pt-[5px]">
					{
						boxOffices.map(movie =>
							<Movie
								key={movie.id}
								movie={movie}
								genres={GENRES}
								onOpenDetail={handleOpenDetail}
							/>
						)
					}
				</div>
			</div>

			{selectedMovie && (
				<MovieDetailModal
					movie={selectedMovie}
					genres={GENRES}
					onClose={handleCloseDetail}
				/>
			)}
		</div>
	);
}