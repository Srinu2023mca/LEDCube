import React, { useState } from 'react';
import { 
  CButton, CForm, CFormLabel, CFormInput, CSpinner 
} from '@coreui/react';
import { useRegisterMutation } from '../../app/service/usersApiSlice';
import { Link } from 'react-router-dom';

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const [addUser] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = { name, email};
      await addUser(newUser);
    //   onUserAdded(newUser); // Callback to refresh user list or notify success
      setName('');
      setEmail('');
      
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='rounded shadow p-3 m-5 ' style={{width:"350px"}}>
    <CForm onSubmit={handleSubmit}>
      <div className='d-flex align-items-center justify-content-center mb-3'>
        <CFormLabel htmlFor="name" className='w-25'>Name:</CFormLabel>
        <CFormInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>
      <div className='d-flex align-items-center justify-content-center mb-3'>
        <CFormLabel htmlFor="email" className='w-25'>Email:</CFormLabel>
        <CFormInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>
      <div className='d-flex align-items-center justify-content-between gap-3'>
      <CButton type="submit" color="primary" disabled={loading} className='w-50'>
        {loading ? <CSpinner size="sm" /> : "Add User"}
      </CButton>
      <Link to={"/customers"} className='text-decoration-none text-white w-50 '>
      <CButton type="submit" color="danger" disabled={loading} className='w-100'>
        Cancel
      </CButton>
      </Link>
      </div>
      
      
    </CForm>
    </div>
  );
};

export default AddUser;
