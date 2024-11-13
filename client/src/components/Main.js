import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioPlayer from './AudioPlayer';
import CubeWindow from './CubeWindow';
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom"
import { useCreateSongCubesMutation } from '../app/service/SongCubesSlice';

function Main() {
  const [cubes, setCubes] = useState([{ id: 1 }]);
  const [cubeData, setCubeData] = useState([]); // Collect data from all CubeWindows
  const [postActive,setPostActive] =useState(false);
  const [songName,setSongName] =useState('');
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  const [selectedCubes, setSelectedCubes] = useState([]);

  const [createSongCubes] =useCreateSongCubesMutation();

  const addCube = () => {
    setPostActive(true)
    setCubes([...cubes, { id: cubes.length + 1 }]);
    setCubeData([...cubeData, null]); // Initialize new cubeData entry
    // setPostActive(false)
  };

  const handleAddEntry = (index, newData) => {
    const updatedData = [...cubeData];
    updatedData[index] = newData;  // Update data for the specific cube window
    setCubeData(updatedData);
  };

  const handleDeleteCube = (index) => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Cube!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
       
         // Remove the cube from the cubes array
    const updatedCubes = cubes.filter((cube, i) => i !== index);
    setCubes(updatedCubes);

    // Remove corresponding cube data
    const updatedCubeData = cubeData.filter((data, i) => i !== index);
    setCubeData(updatedCubeData);

        swal("Poof! Your song has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your song is safe!");
      }
    });
   
  };

  const handleApply = () => {

    if (songName==="") {
      swal("Warning", "Please add Song ", "warning");
      return;
    }

    if (!cubeData.some((data) => data !== null)) {
      swal("Warning", "Please add at least one cube", "warning");
      return;
    }

    


    const sendData = {
      songName,
      cubes: cubeData.filter((data) => data !== null) // Filter out any null entries
    }
    
    // console.log('Final Cube Data:', sendData);
    postData( sendData)
  };

  const postData = async (data) => {
    setLoading(true);

    try {
      const response = await createSongCubes(data).unwrap();
      // console.log(response)
  
      // Handle successful response (status code 201 is OK)
    if (response?.status==="success") {
      
      // Reset state upon successful response
      setCubes([{ id: 0 }]); // Reset to initial cube
      setCubeData([]);
      
      setSongName("")
      swal("Success!", "Your song has been saved!", {
        icon: "success",
      }).then(() => {
        navigate('/');
      });

    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    } catch (error) {
      console.error('Error while sending data:', error);
      swal("Error", "Failed to send song Data", "error");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }

  };

  return (
    <div className="container-main bg-white">
      <h2 className="text-center my-4">Audio Player with Color & Duration Control</h2>
      <div className='container1 mb-3'>
        <AudioPlayer songName={songName} setSongName={setSongName}/>
      </div>
      <div className='container1'>
        {cubes.map((cube, index) => (
          <CubeWindow 
            key={cube.id} 
            onAddEntry={(newData) => handleAddEntry(index, newData)} 
            cubeData={cubeData[index]} // Pass specific data for this cube
            onDelete={() => handleDeleteCube(index)} // Add delete functionality
            postActive={postActive}
            setPostActive={setPostActive}
            duplicateCubes={cubeData}
            selectedCubes={selectedCubes}
            setSelectedCubes={setSelectedCubes}
          />
        ))}
        <div className='d-flex align-items-center justify-content-center gap-3'>
          <button className="btn btn-success mt-3 w-25" onClick={addCube}>
            Add Cube
          </button>
          <button className="btn btn-primary mt-3 w-25" onClick={handleApply}>
          {loading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'Save Song'}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Main;
