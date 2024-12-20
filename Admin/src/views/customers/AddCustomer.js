import { useState } from 'react';
import { 
  CButton, CForm, CFormLabel, CFormInput, CSpinner 
} from '@coreui/react';
import { useAddCustomerMutation } from '../../app/service/customersApiSlice';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate =useNavigate();

  const [addUser] = useAddCustomerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = { name, email};
      const res = await addUser(newUser).unwrap();
      console.log(res)
      toast.success(res?.message||"User Created")
      setName('');
      setEmail('');
      navigate("/customers")
      
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding User")
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
