import React, {useState,useEffect} from 'react'
import axios from '../../axios';
import swal from 'sweetalert';
import { useParams} from 'react-router-dom';
import HamsterWheel from '../LoadingHamster';
import { useGetSongCubesByIdMutation } from '../../app/service/SongCubesSlice';

const ViewSong = () => {

  const [Spinner, setSpinner] = useState(false);
  const [songName,setSongName]=useState('')
  const [cubes,setcubes] =useState([] ||"");

  const { id } = useParams();
  // console.log(id)

 const [getSongCubes, isLoading] = useGetSongCubesByIdMutation()

  useEffect(()=>{
    setSpinner(true)
    const getSong = async()=>{

    try{
      
        const response =await getSongCubes(id).unwrap();
        const data = await response?.data;
        // console.log(response)
        setSpinner(false)
        setSongName(data?.songName)
        setcubes(data?.cubes||[])
       
      }catch(error){
        console.log("Error",error)
        setSpinner(false);
        swal("Error", "Failed to fetch song data", "error");
        
      }

    }
    

    getSong()
  },[id])

  if(Spinner){
    return <>
    <HamsterWheel/>
    </>
  }

  // console.log(cubes)

  return (
    <div className='container2 bg-white mt-5'>
      <div className='d-flex align-items-center justify-content-around shadow rounded pe-2 w-100'>
        <label className='fs-5 ms-3' style={{width:'150px'}}>Song Name:</label>
        <h4 className='form-control fs-5  mt-2'>{songName}</h4>
      </div>
      {cubes.length> 0 && cubes.map((cube, index) => (
        <div className='mt-2 rounded p-2 shadow'key={index}>
          <div className='d-flex align-items-center justify-content-around'>
            <label className='me-3 'style={{width:'140px'}}>Cube Name: </label>
          <div className='form-control'>{cube.title}</div>

          </div>
        
      <div className="mt-4 table-responsive">
        {cube.entries.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Top Color (RGB)</th>
                <th>Sides Color (RGB)</th>
                <th>Bottom Color (RGB)</th>
                <th>Effect Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {cube.entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.startTime}</td>
                  <td>{entry.endTime}</td>
                  <td style={{ color: entry.topColor }}>{entry.topColor}</td>
                  <td style={{ color: entry.sidesColor }}>{entry.sidesColor}</td>
                  <td style={{ color: entry.bottomColor }}>{entry.bottomColor}</td>
                  <td>{entry.effectType}</td>
                  <td>{entry.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      </div>
        
      ))}
      
    </div>
  )
}

export default ViewSong