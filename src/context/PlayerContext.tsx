import React, { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
	const audioRef = useRef(); // Reference to the audio element
	const seekBar = useRef();
	const seekBg = useRef();
	const [track, setTrack] = useState(songsData[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [time, setTime] = useState({
		currentTime: {
			second: 0,
			minute: 0,
		},
		totalTime: {
			second: 0,
			minute: 0,
		},
	});
	const play = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};

	const pause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	const previousSong = async () => {
		if (track.id > 0) {
			await setTrack(songsData[track.id - 1]);
			await audioRef.current.play();
			setIsPlaying(true);
		} else {
			seekBar.current.style.width = "0%";
			audioRef.current.currentTime = 0;
			await audioRef.current.play();
			setIsPlaying(true);
		}
	};
	const nextSong = async () => {
		if (track.id < songsData.length - 1) {
			await setTrack(songsData[track.id + 1]);
			await audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const playSongWithId = async (id) => {
		await setTrack(songsData[id]);
		await audioRef.current.play();
		setIsPlaying(true);
	};

	const seekSong = async (e) => {
		audioRef.current.currentTime =
			(e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
			audioRef.current.duration;
	};

	const contextValue = {
		audioRef,
		seekBar,
		seekBg,
		track,
		setTrack,
		time,
		setTime,
		isPlaying,
		setIsPlaying,
		play,
		pause,
		playSongWithId,
		previousSong,
		nextSong,
		seekSong,
	};

	useEffect(() => {
		setTimeout(() => {
			audioRef.current.ontimeupdate = () => {
				seekBar.current.style.width = `${Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)}%`;
				const currentTime = Math.floor(audioRef.current.currentTime);
				const currentMinute = Math.floor(currentTime / 60);
				const currentSecond = currentTime % 60;
				const totalTime = Math.floor(audioRef.current.duration);
				const totalMinute = Math.floor(totalTime / 60);
				const totalSecond = totalTime % 60;
				setTime({
					currentTime: {
						minute: currentMinute,
						second: currentSecond,
					},
					totalTime: {
						minute: totalMinute,
						second: totalSecond,
					},
				});
			};
		}, 1000);
	}, []);

	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
