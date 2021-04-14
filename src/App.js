import React, { useState, useRef } from 'react';
//Styles
import './styles/app.scss';
//Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
//Data
import data from './data';
import Nav from './components/Nav';

function App() {
	//Ref
	const audioRef = useRef(null);
	//State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	//Event Handlers
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const animationPercentage = Math.round((current / duration) * 100);
		console.log(animationPercentage);
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage,
		});
	};
	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[currentIndex + 1] || songs[0]);
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				libraryStatus={libraryStatus}
				songs={songs}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default App;
