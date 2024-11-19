import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CPagination, CPaginationItem, CSpinner ,CButton} from '@coreui/react';
import { ToggleButton, ToggleButtonGroup } from "@themesberg/react-bootstrap";
import { useGetCustomersMutation, useUpdateActiveMutation, useResetCustomerMutation } from '../../app/service/customersApiSlice';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  

  // Fetch users data
  const [getUsers,{isLoading}] = useGetCustomersMutation();
  const [updateActive] =useUpdateActiveMutation();
  const [resetCustomer] =useResetCustomerMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        // console.log(response)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getUsers]);

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);


  const handleResetPassword = async (id) => {
    // console.log(id);
    try {
      const response = await resetCustomer({id}).unwrap()
      // console.log(response);
      if(response.status==="success"){
        toast.success("Password Reset Successfull!..")
  }
    } catch (error) {
      console.error("Error updating ", error);
      toast.error("Error to password reset..!")
    }

  };

  const toggleStatus = async (id, isActive) => {
    // console.log(id,isActive)
    try {
      const response = 
      await updateActive({id,data:{"isActive":!isActive}}).unwrap()
      console.log(response);
      if(response.status==="success"){
        toast.success("Status Updated Successfull!..")
      
      // Update the local state to reflect the new isActive status
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, isActive:!isActive } : user
      )
    );
  }
    } catch (error) {
      console.error("Error updating isActive:", error);
      toast.error("Error to Status updated!..")
    }
  };

  if (isLoading) return <CSpinner color="primary" />;

  return (
    <>
    <div className='d-flex align-items-center justify-content-between'>
      <h2>Customers</h2>
      <button className='btn btn-success'><Link to={"/customers/addCustomer"} className='text-decoration-none text-white'> + Add</Link></button>
      
    </div>
    <div className='table-responsive'>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentUsers.map((user, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{indexOfFirstUser + index + 1}</CTableDataCell>
              <CTableDataCell>{user?.name}</CTableDataCell>
              <CTableDataCell>{user?.email}</CTableDataCell>
              <CTableDataCell>{user?.isActive ? "Active" : "Suspended" }</CTableDataCell>
              <CTableDataCell className='d-flex  align-items-center justify-content-start'>
                <Link to={`/customers/editCustomer/${user?._id}`}>
              <CButton color="primary"  className="me-2">
                  Edit
                </CButton>
                </Link>
                <ToggleButtonGroup
                        type="radio"
                        name={`statusToggle${user?._id}`}
                        value={user?.isActive}
                      >
                        <ToggleButton
                          value={true}
                          variant="success"
                          disabled={user?.isActive}
                          onClick={() => toggleStatus(user?._id, user?.isActive)}
                        >
                          Active
                        </ToggleButton>
                        <ToggleButton
                          value={false}
                          variant="warning"
                          disabled={!user.isActive}
                          onClick={() => toggleStatus(user?._id, user?.isActive)}
                        >
                          Suspended
                        </ToggleButton>
                      </ToggleButtonGroup>
                <CButton color="danger" className="ms-2 " onClick={() => handleResetPassword(user?._id)}>
                  Reset Password
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      </div>
      <CPagination align="center">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <CPaginationItem
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </CPaginationItem>
      </CPagination>
    </>
  );
};

export default UsersTable;
