import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CPagination, CPaginationItem, CSpinner ,CButton} from '@coreui/react';
import { useGetCustomersMutation } from '../../app/service/usersApiSlice';
import { Link } from 'react-router-dom';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch users data
  const [getUsers,{isLoading}] = useGetCustomersMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        // console.log(response)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
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

  // Action handlers
  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    // Add edit logic here
  };

  const handleSuspend = (userId) => {
    console.log("Suspend user:", userId);
    // Add suspend logic here
  };

  const handleResetPassword = (userId) => {
    console.log("Reset password for user:", userId);
    // Add reset password logic here
  };

  if (loading) return <CSpinner color="primary" />;

  return (
    <>
    <div className='d-flex align-items-center justify-content-between'>
      <h2>Customers</h2>
      <button className='btn btn-success'><Link to={"/customers/addCustomer"} className='text-decoration-none text-white'> + Add</Link></button>
    </div>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentUsers.map((user, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{indexOfFirstUser + index + 1}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>
              <CButton color="primary" size="sm" className="me-1" onClick={() => handleEdit(user.id)}>
                  Edit
                </CButton>
                <CButton color="warning" size="sm" className="me-1" onClick={() => handleSuspend(user.id)}>
                  Suspend
                </CButton>
                <CButton color="danger" size="sm" onClick={() => handleResetPassword(user.id)}>
                  Reset Password
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

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
