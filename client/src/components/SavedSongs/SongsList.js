import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import HamsterWheel from "../LoadingHamster";
import {
  useGetSongCubesMutation,
  useDeleteSongCubesByIdMutation,
} from "../../app/service/SongCubesSlice";

function SongsList() {
  const [songs, setSongs] = useState([]);

  const [getSongCubes, { isLoading }] = useGetSongCubesMutation();
  const [deleteSongCubes] = useDeleteSongCubesByIdMutation();

  // Function to fetch songs data from the server
  const fetchSongs = async () => {
    try {
      const response = await getSongCubes().unwrap(); // Adjust the endpoint as necessary
      // console.log(response)
      setSongs(response?.data); // Assuming the response contains the list of songs
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  // Fetch the songs when the component mounts
  useEffect(() => {
    fetchSongs();
  }, [getSongCubes]);

  const handlePlay = (songId) => {
    // Implement the logic for viewing song details
    console.log(`Viewing song with ID: ${songId}`);
  };

  const handleDelete = async (songId) => {
    // Display a confirmation dialog before deleting
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this song!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteSongCubes(songId).unwrap();
          // console.log(response);
          swal("Poof! Your song has been deleted!", {
            icon: "success",
          });
          fetchSongs(); // Re-fetch songs after deletion to update the UI
        } catch (error) {
          console.error("Error deleting song:", error);
          swal("Failed to delete the song", {
            icon: "error",
          });
        }
      } else {
        swal("Your song is safe!");
      }
    });
  };

  if (isLoading) {
    return (
      <>
        <HamsterWheel />
      </>
    );
  }

  return (
    <div className="songsList-main mt-5 bg-white">
      <h2 className="text-center my-4">Saved Songs</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
              <th>S NO</th>
              <th>Song Name</th>
              <th>No of Cubes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs?.length ? (
              songs?.map((song, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{song.songName}</td>
                  {/* <td>{new Date(song.createdAt).toLocaleString()}</td> */}
                  <td>{song?.cubes?.length || ""}</td>
                  <td className="">
                    <button
                      className="btn btn-success m-1 text-white btn-custom"
                      onClick={() => handlePlay(song._id)}
                    >
                      Play
                    </button>
                    <Link
                      to={`/viewSong/${song._id}`}
                      className="text-decoration-none text-white"
                    >
                      {" "}
                      <button className="btn btn-info m-1 btn-custom text-white">
                        view
                      </button>
                    </Link>

                    <Link
                      to={`/updateSong/${song._id}`}
                      className="text-decoration-none text-white"
                    >
                      <button className="btn btn-warning m-1 btn-custom text-white">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger m-1 btn-custom"
                      onClick={() => handleDelete(song._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="4" className="text-center">
                  No songs available
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SongsList;
