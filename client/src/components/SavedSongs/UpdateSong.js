import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioPlayer from '../AudioPlayer';
import CubeWindow from '../CubeWindow';
import axios from '../../axios';
import swal from 'sweetalert';
import { useParams,useNavigate } from 'react-router-dom';


function UpdateSong() {
  const [cubes, setCubes] = useState([{ id: 1 }]);
  const [cubeData, setCubeData] = useState([]); // Collect data from all CubeWindows
  const [cubePostData, setCubePostData] = useState([]); // Collect data from all CubeWindows for post
  const [postActive,setPostActive] =useState(false);
  const [songName,setSongName] =useState('');
  const [loading, setLoading] = useState(false);
  const [Spinner, setSpinner] = useState(false);

  const { id } = useParams();
  // console.log(id)

  const navigate =useNavigate();

  const addCube = () => {
    setCubes([...cubes, { id: cubes.length + 1 }]);
    setCubeData([...cubeData, null]); // Initialize new cubeData entry
    setCubePostData([...cubePostData, null]); // Initialize new cubePostData entry
  };

  const handleAddEntry = (index, newData) => {
    const updatedData = [...cubeData];
    updatedData[index] = newData;  // Update data for the specific cube window
    setCubeData(updatedData);
  };

  const handleAddPostEntry = (index, newPostData) => {
    const updatedPostData = [...cubePostData];
    updatedPostData[index] = newPostData; // Update post data for the specific cube window
    setCubePostData(updatedPostData);
  };

  const handleDeleteCube = (index) => {
    // Remove the cube from the cubes array
    const updatedCubes = cubes.filter((cube, i) => i !== index);
    setCubes(updatedCubes);

    // Remove corresponding cube data
    const updatedCubeData = cubeData.filter((data, i) => i !== index);
    setCubeData(updatedCubeData);

    const updatedCubePostData = cubePostData.filter((data, i) => i !== index);
    setCubePostData(updatedCubePostData);
  };

  useEffect(()=>{
    setSpinner(true)
    const getSong = async()=>{

    try{
      
        const response =await axios.get(`api/songData/${id}`);
        const data = await response.data;
        console.log(data)
        setSpinner(false)
        setSongName(data?.songName)
        setCubeData(data.cubes || []);
        setCubes(data.cubes.map((_, idx) => ({ id: idx + 1 })));
      }catch(error){
        console.log("Error",error)
        setSpinner(false);
        swal("Error", "Failed to fetch song data", "error");
        
      }

    }
    

    getSong()
  },[id])

  const handleApply = () => {
    if (!cubeData.some((data) => data !== null)) {
      swal("Warning", "Please add at least one cube", "warning");
      return;
    }
    const sendData = {
      songName,
      cubes: cubeData.filter((data) => data !== null) // Filter out any null entries
    }
    
    console.log('Final Cube Data:', sendData);
    postData( sendData)
  };

  const postData = async (data) => {
    // setPostActive(true)
    setLoading(true);

    try {
      const response = await axios.put(`api/songData/${id}`, data)
  
      // Handle successful response (status code 201 is OK)
    if (response.status >= 200 && response.status < 300) {
      console.log('Response from API:', response.data);

      
      
      swal("Success!", "Your song has been Updated!", {
        icon: "success",
      }).then(() => {
        navigate('/');
      });

      // Reset state upon successful response
      setCubes([{ id: 0 }]); // Reset to initial cube
      setCubeData([]);
      setCubePostData([]);
      
      setSongName("")
      

    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    } catch (error) {
      console.error('Error while updating data:', error);
      swal("Error", "Failed to update song", "error");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }

  };

  if(Spinner){
    return <h6>loading</h6>
  }

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
            onAddPostEntry={(newPostData) => handleAddPostEntry(index, newPostData)} 
            cubeData={cubeData[index]} // Pass specific data for this cube
            cubePostData ={cubePostData[index]}
            onDelete={() => handleDeleteCube(index)} // Add delete functionality
            postActive={postActive}
            setPostActive={setPostActive}
            cubes={cubeData}
          />
        ))}
        <div className='d-flex align-items-center justify-content-around'>
          <button className="btn btn-success mt-3 w-25" onClick={addCube}>
            Add Cube
          </button>
          <button className="btn btn-primary mt-3 w-25" onClick={handleApply}>
          {loading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'Update Song'}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default UpdateSong;
