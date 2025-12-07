import React, {useEffect} from "react";

const getGenreNames = (genreIds = [], genreMap = {}) =>
	genreIds.map((id) => genreMap[id]).filter(Boolean);

const MovieDetailModal = ({movie, genres, onClose}) => {
	const {
		title,
		poster_path,
		overview,
		vote_average,
		vote_count,
		release_date,
		genre_ids,
		original_title,
	} = movie;

	const imagePath = poster_path
		? `https://image.tmdb.org/t/p/original${poster_path}`
		: "https://via.placeholder.com/300x450?text=No+Image";

	const displayGenres = getGenreNames(genre_ids, genres);

	// ESC 키로 모달 닫기
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button
					type="button"
					className="modal__close"
					onClick={onClose}
					aria-label="닫기"
				>
					✕
				</button>
				<div className="modal__content">
					<div className="modal__poster-wrapper">
						<img className="modal__poster" src={imagePath} alt={title}/>
					</div>
					<div className="modal__info">
						<h2 className="modal__title">{title}</h2>
						{original_title && original_title !== title && (
							<p className="modal__original-title">({original_title})</p>
						)}
						<p className="modal__meta">개봉일: {release_date || "정보 없음"}</p>
						<p className="modal__meta">
							평점: ⭐ {vote_average?.toFixed(1) ?? "0.0"} ({vote_count}명)
						</p>
						<div className="modal__genres">
							{displayGenres.map((g) => (
								<span key={g} className="tag">
                  {g}
                </span>
							))}
						</div>
						<p className="modal__overview">
							{overview || "줄거리 정보가 없습니다."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetailModal;
