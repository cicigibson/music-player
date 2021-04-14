import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
	libraryStatus,
	songs,
	currentSong,
	setCurrentSong,
	audioRef,
	isPlaying,
}) => {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<h2>Library</h2>
			<div className='library-songs'>
				{songs.map((song) => (
					<LibrarySong
						song={song}
						currentSong={currentSong}
						setCurrentSong={setCurrentSong}
						audioRef={audioRef}
						isPlaying={isPlaying}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
