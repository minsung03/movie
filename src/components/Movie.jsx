import React from "react";
import { useNavigate } from "react-router-dom";

const getGenreNames = (genreIds = [], genreMap = {}) =>
	genreIds
		.map((id) => genreMap[id])
		.filter(Boolean)
		.slice(0, 3); // 최대 3개만 표시

export default function Movie({ movie, genres, onOpenDetail }) {
	const navigate = useNavigate();
	const { title, poster_path, vote_average, release_date, genre_ids } = movie;
	const imagePath = poster_path
		? `https://image.tmdb.org/t/p/original${poster_path}`
		: "https://via.placeholder.com/300x450?text=No+Image";

	const displayGenres = getGenreNames(genre_ids, genres);
	const handleClickDetail = () => onOpenDetail(movie);
	const handleClickBook = () => {
		navigate("/booking", { state: { movie } });
	};

	return (
		<li className="movie-card">
			<div className="movie-card__poster-wrapper">
				<img
					className="movie-card__poster cursor-pointer"  
					src={imagePath}
					alt={title}
					loading="lazy"

					// ⭐ 이미지를 클릭하면 상세 보기 열기
					onClick={handleClickDetail}
				/>
				<span className="movie-card__rating-badge">
				  ⭐ {vote_average?.toFixed(1) ?? "0.0"}
				</span>
			</div>

			<div className="movie-card__info">
				<h3 className="movie-card__title">{title}</h3>
				<p className="movie-card__meta">{release_date || "개봉일 정보 없음"}</p>
				<div className="movie-card__genres">
					{displayGenres.map((g) => (
						<span key={g} className="tag">
					  		{g}
						</span>
					))}
				</div>
			</div>

			<div className="movie-card__actions">
				<button
					type="button"
					className="btn btn--secondary"
					onClick={handleClickDetail}
				>
					상세 보기
				</button>
				<button
					type="button"
					className="btn btn--primary"
					onClick={handleClickBook}
				>
					예매하기
				</button>
			</div>
		</li>
	);
}
