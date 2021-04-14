import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setCurrentSong,
}) => {
	//Event Handlers
	const playSongHandler = () => {
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	};
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			await setCurrentSong(songs[currentIndex + 1] || songs[0]);
		}
		if (direction === 'skip-back') {
			await setCurrentSong(
				songs[(currentIndex + songs.length - 1) % songs.length],
			);
		}
		if (isPlaying) {
			audioRef.current.play();
		}
	};
	//Styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					className='track'
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
				>
					<input
						min={0}
						max={songInfo.duration}
						value={songInfo.currentTime}
						onChange={dragHandler}
						type='range'
					/>
					<div className='animate-track' style={trackAnim}></div>
				</div>
				<p>{getTime(songInfo.duration || 0)}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className='skip-back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className='skip-forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
