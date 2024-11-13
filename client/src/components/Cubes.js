import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import HamsterWheel from './LoadingHamster/index';
import { useCreateCubesMutation,useGetCubesMutation,useUpdateCubesByIdMutation,useDeleteCubesByIdMutation } from '../app/service/CubesSlice';


function Cubes() {
  const [cubes, setCubes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [updateValue,setUpdateValue] =useState('');
  const [updateId,setUpdateId] =useState('');

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);
  const openUpdateModal = (id,name) => {
    // console.log(id,name)
    setIsUpdateModalOpen(true);
    setUpdateValue(name);
    setUpdateId(id)
  }

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue(""); // Clear input after closing
  };

  // Function to close the modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateValue(""); // Clear input after closing
    setUpdateId('');
  };

  // // Handle input field change
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

 const [createCube] = useCreateCubesMutation();
 const [getCubes,{isLoading}] =useGetCubesMutation();
 const [deleteCube] = useDeleteCubesByIdMutation();
 const [updateCube] =useUpdateCubesByIdMutation();
  // Function to handle "Add" button click
  const handleAddClick = async () => {
    if (inputValue) {
      // console.log(inputValue)
      try {
        // Perform a POST request with the input data
        // const response =
         await createCube({name:inputValue}).unwrap();
        // console.log("Data submitted:", response.data);

        // Close the modal after submitting
        closeModal();
      } catch (error) {
        console.error("Error posting data:", error);
        swal("Failed to Add the cube", {
          icon: "error",
        });
      }
    } else {
      swal("Warning","Please Add Cube Name", {
        icon: "warning",
      });
    }
  };



  // Function to fetch songs data from the server
  const fetchCubes = async () => {
    try {
      const response = await getCubes().unwrap()
      // console.log(response)
      setCubes(response?.data); // Assuming the response contains the list of songs
    } catch (error) {
      console.error('Error fetching songs data:', error);
    }
  };

  // Fetch the songs when the component mounts
  useEffect(() => {
    fetchCubes();
  }, [isModalOpen,isUpdateModalOpen]);

  const handleUpdate = async () => {
    // console.log(updateId);
    if (updateValue) {
      // console.log(updateValue)
      try {
        // const response =
         await updateCube({id:updateId,data:{name:updateValue}}).unwrap();
        // console.log("Data submitted:", response);

        // Close the modal after submitting
        closeUpdateModal();
      } catch (error) {
        console.error("Error Updateing Cube Name:", error);
        swal("Failed to Update the cube Name", {
          icon: "error",
        });
      }
    } else {
      swal("Warning","Please Add Cube Name", {
        icon: "warning",
      });;
    }
    
  };

  const handleDelete = async (id) => {
    // Display a confirmation dialog before deleting
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Cube!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          // const response =
           await deleteCube(id);
          // console.log(response);
          swal("Poof! Your Cube has been deleted!", {
            icon: "success",
          });
          fetchCubes(); // Re-fetch songs after deletion to update the UI
        } catch (error) {
          console.error('Error deleting song:', error);
          swal("Failed to delete the song", {
            icon: "error",
          });
        }
      } else {
        swal("Your Cube is safe!");
      }
    });
  };

  if(isLoading){
    return <>
    <HamsterWheel/>
    </>
  }

  

  return (
    <div className="songsList-main mt-5 bg-white">
      <div className='d-flex align-items-center justify-content-between'>
      <h2 className="text-center my-4">Cubes List</h2>
      <button onClick={openModal} className='btn btn-success'>
        Add Cube
      </button>
      </div>
      
      <div className='table-responsive'>
      
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
                <th>Id</th>
              <th>Cube Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cubes?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No songs available</td>
              </tr>
            ) : (
              cubes?.map((cube,index) => (
                <tr key={index}>
                    <td>{cube._id}</td>
                  <td>{cube.name}</td>
                  <td>{new Date(cube.createdAt).toLocaleString()}</td>
                  
                  <td className=''>
                    <button 
                      className="btn btn-warning m-1 btn-custom text-white" 
                      onClick={() => openUpdateModal(cube._id, cube.name)}
                    >
                     Edit
                    </button>
                    <button 
                      className="btn btn-danger m-1 btn-custom" 
                      onClick={() => handleDelete(cube._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
      
       {/* Modal */}
       {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className='p-3 rounded popup'
          >
            <div className='d-flex align-items-center justify-content-between'>
            <h4>Cube Name</h4>
            <button
            className='btn fs-3'
              onClick={closeModal}
              style={{
                cursor: "pointer",
                border:"none",
                outline:'none'
              }}
            >
              ×
            </button>
            </div>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Enter Cube Name"
              className='form-control mb-2'
            />
            <button onClick={handleAddClick} className='btn btn-primary'>
              Add
            </button>
            
          </div>

          
        </div>
      )}

       {/*update Modal */}
       {isUpdateModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className='bg-white p-3 rounded popup'
          >
            <div className='d-flex align-items-center justify-content-between'>
            <h4>Cube Name</h4>
            <button
            className='btn fs-3'
              onClick={closeUpdateModal}
              style={{
                cursor: "pointer",
                border:"none",
                outline:'none'
              }}
            >
              ×
            </button>
            </div>
            
            <input
              type="text"
              value={updateValue}
              onChange={(e)=>setUpdateValue(e.target.value)}
              placeholder="Enter Cube Name"
              className='form-control mb-2'
            />
            <button onClick={()=>handleUpdate(updateId)} className='btn btn-primary'>
              Update
            </button>
            
          </div>

          
        </div>
      )}

    </div>
  );
}

export default Cubes;
