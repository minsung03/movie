import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();

	return (
		<header className="app-header">
			<div
				className="app-header__title cursor-pointer"
				onClick={() => navigate("/")}   // 클릭 시 홈으로 이동
			>
				🎬 My Cinema
			</div>

			<div className="app-header__subtitle">
				상영중 영화 검색 &amp; 간단 예매 준비 화면
			</div>
		</header>
	);
};
