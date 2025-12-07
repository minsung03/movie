import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const accessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQ1MmRhZGFlZmUxZGFjNzc4MjhlMDgwZDVkMTA3MSIsIm5iZiI6MTc2NDUwNzMzNC42ODUsInN1YiI6IjY5MmMzZWM2OWM3OTZiNGM1NzE3Y2ZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8uMLZLFHzVmGHtuvGdSz7ri14V02QiSiuRdVwhF-WMY";
export const MovieContext = createContext(null);

export default function MovieProvider({ children }) {
	const [boxOffices, setBoxOffices] = useState([]);
	const [movies, setMovies] = useState([]);
	const [GENRES, setGENRES] = useState({});
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		(async () => {
			await axios(`https://api.themoviedb.org/3/movie/now_playing?region=KR&language=ko-KR&include_adult=false&include_video=false&page=1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessKey}`
				}
			})
				.then(({ data: { results } }) => {
					setBoxOffices(results.slice(0, 4));
				});

			const options = "" +
				"include_adult=false&" +
				"include_video=false&" +
				"language=ko&" +
				"release_date.gte=2025-01-01&" +
				"region=KR&" +
				"page=1&" +
				"sort_by=popularity.desc";
			await axios(`https://api.themoviedb.org/3/discover/movie?${options}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessKey}`
				}
			})
				.then(async ({ data: { results } }) => {
					const movies = results;
					setMovies(movies);

					// await axios(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&region=KR&language=ko-KR&page=2&sort_by=popularity.desc`, {
					// 	method: "GET",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 		"Authorization": `Bearer ${accessKey}`
					// 	}
					// })
					// 	.then(({ data: { results } }) => {
					// 		setMovies([...movies, ...results]);
					// 	});
				});
		})();

		setGENRES({
			12: "모험",
			14: "판타지",
			16: "애니메이션",
			18: "드라마",
			27: "공포",
			28: "액션",
			35: "코미디",
			36: "역사",
			37: "서부",
			53: "스릴러",
			80: "범죄",
			99: "다큐멘터리",
			878: "SF",
			9648: "미스터리",
			10402: "음악",
			10749: "로맨스",
			10751: "가족",
			10770: "TV 영화",
			10752: "전쟁",
		})
	}, []);

	return (
		<MovieContext.Provider value={{ boxOffices, movies, GENRES, selectedMovie, setSelectedMovie }}>
			{ children }
		</MovieContext.Provider>
	);
}