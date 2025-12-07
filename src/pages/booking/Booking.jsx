import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
	const location = useLocation();
	const navigate = useNavigate();
	const movie = location.state?.movie;

	if (!movie) {
		return (
			<div className="app-main flex flex-col items-center justify-center min-h-screen px-4">
				<p className="mb-4 text-gray-300">선택된 영화 정보가 없습니다.</p>
				<button
					type="button"
					className="btn btn--primary"
					onClick={() => navigate(-1)}
				>
					뒤로 가기
				</button>
			</div>
		);
	}

	const { title, poster_path, release_date } = movie;
	const imagePath = poster_path
		? `https://image.tmdb.org/t/p/original${poster_path}`
		: "https://via.placeholder.com/300x450?text=No+Image";

	const rows = ["A", "B", "C", "D", "E"];
	const cols = Array.from({ length: 8 }, (_, i) => i + 1);
	const [selectedSeats, setSelectedSeats] = useState([]);

	const toggleSeat = (seat) => {
		setSelectedSeats((prev) =>
			prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
		);
	};
	// 예매한 좌석이 1개 이상이 아닐때
	const handleConfirm = () => {
		if (selectedSeats.length === 0) {
			alert("좌석을 한 개 이상 선택해주세요.");
			return;
		}

		const seatText = [...selectedSeats].sort().join(", ");
		// 좌석을 선택하고 예매하기 버튼을 눌렀을때 뜨는 창
		const ok = window.confirm(
			`${title}\n선택한 좌석: ${seatText}\n\n이 좌석으로 예매하시겠습니까?`
		);
		// 예매가 완료되면 처음 탭으로 넘어감
		if (ok) {
			alert("예매가 완료되었다고 가정하는 화면입니다. (실제 결제/서버 연동은 구현되지 않았어요)");
			navigate("/list");
		}
	};

	return (
		<div className="app-main max-w-4xl mx-auto py-10 px-4">
			<div className="flex gap-6 mb-8">
				<img
					className="w-40 h-56 rounded-lg shadow-lg object-cover"
					src={imagePath}
					alt={title}
				/>
				<div className="flex-1">
					<h1 className="text-2xl font-semibold mb-2">{title}</h1>
					<p className="text-sm text-gray-400 mb-4">
						{release_date || "개봉일 정보 없음"}
					</p>
					<p className="text-sm text-gray-300">
						아래에서 좌석을 선택한 뒤 &quot;예매 확정&quot; 버튼을 눌러주세요.
					</p>
				</div>
			</div>

			<div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
				<p className="text-center text-sm text-gray-400 mb-4">SCREEN</p>
				<div className="h-1 w-full bg-slate-500/60 rounded-full mb-6" />
				<div className="flex flex-col gap-3 items-center">
					{rows.map((row) => (
						<div key={row} className="flex items-center gap-2">
							<span className="w-5 text-xs text-gray-400">{row}</span>
							<div className="grid grid-cols-8 gap-2">
								{cols.map((col) => {
									const seat = `${row}${col}`;
									const isSelected = selectedSeats.includes(seat);
									return (
										<button
											key={seat}
											type="button"
											onClick={() => toggleSeat(seat)}
											className={[
												"w-8 h-8 text-xs rounded-md border transition",
												isSelected
													? "bg-emerald-500 border-emerald-400 text-slate-900"
													: "bg-slate-800 border-slate-600 text-gray-200 hover:bg-slate-700",
											].join(" ")}
										>
											{col}
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="text-sm text-gray-300">
					선택된 좌석:{" "}
					{selectedSeats.length === 0 ? "없음" : [...selectedSeats].sort().join(", ")}
				</div>
				<div className="flex gap-3">
					<button
						type="button"
						className="btn btn--secondary"
						onClick={() => navigate(-1)}
					>
						돌아가기
					</button>
					<button
						type="button"
						className="btn btn--primary"
						onClick={handleConfirm}
					>
						예매 확정
					</button>
				</div>
			</div>
		</div>
	);
}
