
import React, { useState, useEffect } from 'react';
import { useGetCubesMutation } from '../../app/service/CubesSlice';
import swal from 'sweetalert';

function CubeWindow({ onAddEntry, onDelete, cubeData,duplicateCubes}) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('');
  const [topColor, setTopColor] = useState('#ff00ff'); // Default magenta
  const [sidesColor, setSidesColor] = useState('#ffff00'); // Default yellow
  const [bottomColor, setBottomColor] = useState('#00ffff'); // Default cyan
  const [effectType, setEffectType] = useState('');
  const [dataEntries, setDataEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [cubes,setCubes] = useState([] || '')
  // const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionDuplicate, setSelectedOptionDuplicate] = useState('');
  

  const [getCubes] =useGetCubesMutation();

  const GetCubesData = async () =>{
    try {
      const response = await getCubes().unwrap()
      // console.log(response)
      setCubes(response?.data); // Assuming the response contains the list of songs
    } catch (error) {
      console.error('Error fetching songs data:', error);
    } 

  }

  // Sync cubeData when cubeData prop is updated
  useEffect(() => {
    if (cubeData) {
      setDataEntries(cubeData.entries || []);
      setTitle(cubeData.title || '');
    } 
    GetCubesData()   
  }, [cubeData]);


  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  // const hexToRgbObj = (hex) => {
  //   const bigint = parseInt(hex.slice(1), 16);
  //   const r = (bigint >> 16) & 255;
  //   const g = (bigint >> 8) & 255;
  //   const b = bigint & 255;
  //   return { red: r, green: g, blue: b };
  // };

  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
  };

  // const calculateDuration = (start, end) => {
  //   const [startHour, startMinute] = start.split(':').map(Number);
  //   const [endHour, endMinute] = end.split(':').map(Number);
  //   const startInMinutes = startHour * 60 + startMinute;
  //   const endInMinutes = endHour * 60 + endMinute;
  //   const durationInMinutes = endInMinutes - startInMinutes;
  //   const hours = Math.floor(durationInMinutes / 60);
  //   const minutes = durationInMinutes % 60;
  //   return `${hours}h ${minutes}m`;
  // };
  const calculateDuration1 = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;
    const durationInMinutes = endInMinutes - startInMinutes;
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}m ${minutes}s`;
  };

  // const calculateDuration2 = (start, end) => {
  //   const [startHour, startMinute] = start.split(':').map(Number);
  //   const [endHour, endMinute] = end.split(':').map(Number);
  //   const startInMinutes = startHour * 60 + startMinute;
  //   const endInMinutes = endHour * 60 + endMinute;
  //   const durationInMinutes = endInMinutes - startInMinutes;
  //   return durationInMinutes*1000;
  // };

  const handleAddData = async (e) => {

    e.preventDefault();
    if (startTime && endTime && topColor && sidesColor && bottomColor && effectType) {
      const newData = {
        startTime,
        endTime,
        topColor: hexToRgb(topColor),
        sidesColor: hexToRgb(sidesColor),
        bottomColor: hexToRgb(bottomColor),
        effectType,
        duration: calculateDuration1(startTime, endTime),
      };


      const updatedEntries = [...dataEntries];
      if (editIndex !== null) {
        updatedEntries[editIndex] = newData;
        setEditIndex(null);
      } else {
        updatedEntries.push(newData);
      }

      setDataEntries(updatedEntries);
      // console.log(selectedOption)
      onAddEntry({ title, entries: updatedEntries }); // Pass updated data to parent
      
      // Reset form
      setStartTime('');
      setEndTime('');
      setTopColor('#ff00ff');
      setSidesColor('#ffff00');
      setBottomColor('#00ffff');
      setEffectType('');
    }
  };

  const handleEditData = (index) => {
    const entry = dataEntries[index];
    // console.log(entry)
    setStartTime(entry.startTime);
    setEndTime(entry.endTime);
    setTopColor(rgbToHex(entry.topColor));
    setSidesColor(rgbToHex(entry.sidesColor));
    setBottomColor(rgbToHex(entry.bottomColor));
    setEffectType(entry.effectType);
    setEditIndex(index);
  };

  const handleDeleteCube = () => {
    onDelete(title);
    setTitle('');
    // setSelectedOption('')
    setDataEntries([]);
    setStartTime('');
    setEndTime('');
    setTopColor('#ff00ff');
    setSidesColor('#ffff00');
    setBottomColor('#00ffff');
    setEffectType('');
    setEditIndex(null);
  };

  const handleSelectData =(e) =>{
    // console.log(selectedOption)
    if(title===""){
      swal("Warning","Please select a Cube ", {
        icon: "warning",
      });
    }else{
    setSelectedOptionDuplicate(e.target.value)
    const getValue = e.target.value
    const data = duplicateCubes.filter(cube => cube?.title === getValue) 
    // console.log(data)
    onAddEntry({title,entries:data[0].entries})

    }
  }

  // console.log(cubes)

  return (
    <div className="w-100 mt-4 bg-white shadow p-2 rounded">
      <form onSubmit={handleAddData}>
        <div className='d-flex flex-column  align-items-center justify-content-center gap-2 mb-2 flex-md-row'>
<div className="d-flex align-items-center justify-content-center gap-2 " style={{width:"100%"}}>
              <label className='w-25'>Cube:</label>
              
              <select className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}>
                <option value=''>Choose</option>
                {cubes?.filter((data) => data !== null).map((option, index) => (
                  <option key={index} value={option?.name}>{option?.name}</option>
                ))}
              </select>
            </div>
        
        {/* Render Options Dynamically Based on cubeData */}
        
            <div className="d-flex align-items-center justify-content-center gap-2 " style={{width:"100%"}}>
              <label className='w-25'>Duplicate:</label>
              
              <select className="form-control" value={selectedOptionDuplicate} onChange={(e) => handleSelectData(e)}>
                <option value="">Choose</option>
                {duplicateCubes?.filter((data) => data !== null).map((option, index) => (
                  <option key={index} value={option?.title}>{option?.title}</option>
                ))}
              </select>
            </div>
            <div className='text-center' style={{width:"100%"}}>
            <button className='btn btn-danger w-50' type="button" onClick={handleDeleteCube}>Delete</button>
            </div>
        
          
          
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Start Time</label>
            <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="col  w-100">
            <label className="form-label">End Time</label>
            <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div className="col w-100">
            <label className="form-label">Top</label>
            <input type="color" className="form-control h-50" value={topColor} onChange={(e) => setTopColor(e.target.value)} required />
          </div>
          <div className="col w-100">
            <label className="form-label">Sides</label>
            <input type="color" className="form-control h-50" value={sidesColor} onChange={(e) => setSidesColor(e.target.value)} required />
          </div>
          <div className="col w-100">
            <label className="form-label">Bottom</label>
            <input type="color" className="form-control h-50" value={bottomColor} onChange={(e) => setBottomColor(e.target.value)} required />
          </div>
          <div className="col w-100 d-flex flex-column align-items-center justify-content-center">
            <label className="form-label">Effect Type</label>
            <div className='d-flex align-items-center justify-content-center'>
              <input type="radio" value="Blink" name="effectType" onChange={(e) => setEffectType(e.target.value)} checked={effectType === 'Blink'} required /> Blink
              <input type="radio" value="Glow" name="effectType" onChange={(e) => setEffectType(e.target.value)} checked={effectType === 'Glow'} required className="ms-2" /> Glow
            </div>
          </div>
          <div className="col w-100">
            <button type="submit" className={`btn w-100 mt-4 ${editIndex !== null ? 'btn-info text-white' : 'btn-primary'}`}>
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 table-responsive">
        {dataEntries.length > 0 && (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.startTime}</td>
                  <td>{entry.endTime}</td>
                  <td style={{ color: entry.topColor }}>{entry.topColor}</td>
                  <td style={{ color: entry.sidesColor }}>{entry.sidesColor}</td>
                  <td style={{ color: entry.bottomColor }}>{entry.bottomColor}</td>
                  <td>{entry.effectType}</td>
                  <td>{entry.duration}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEditData(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CubeWindow;
