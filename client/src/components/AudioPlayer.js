import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

function AudioPlayer({songName ,setSongName}) {
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSongName(file.name)
      setAudioSrc(URL.createObjectURL(file));

      
    }
  };

  const playAudio = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
    setIsPlaying(true);
  };
  

  return (
    <div className="mt-2 shadow p-2 rounded">
      <div className='d-flex align-items-center justify-content-between'>
      <h5 className=''>{songName || 'Please select Song'}</h5>
      {/* <button className='btn btn-success'><Link to="/songsList" className='text-decoration-none text-white'> Songs List</Link></button> */}
      </div>
      
      <div className='d-flex align-items-center justify-content-center  gap-3 my-3'>
        <div className='bg-white border d-flex align-items-center rounded w-75'>

        <input type="file" accept="audio/*" onChange={handleFileChange} className="form-control" style={{width:"100px"}}  id="fileInput" />
      <label htmlFor="fileInput" className="form-label ms-3 mt-1">
          {songName ||"No File Chosen"} {/* Display file name or default text */}
        </label>

        </div>
      
      <button onClick={playAudio} className="btn btn-primary px-3 w-25" disabled={!audioSrc}>
        Play
      </button>
      </div>
      <div className='text-center'>
      {audioSrc  &&  songName!=="" && (
        <audio id="audioPlayer" src={audioSrc} controls hidden={!isPlaying}></audio>
      )}
      </div>
    </div>
  );
}

export default AudioPlayer;
