import { useState,useEffect } from 'react';
import { 
  CButton, CForm, CFormLabel, CFormInput, CSpinner 
} from '@coreui/react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { useGetCustomerMutation,useUpdateCustomerMutation } from '../../app/service/customersApiSlice';

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const {id}=useParams();
  // console.log(id)

  const navigate=useNavigate();

  const [updateUser, {isLoading}] = useUpdateCustomerMutation();
  const [getUser] = useGetCustomerMutation()

  useEffect(() => {
    const fetchData = async () => {
      try{
      const res =await getUser(id).unwrap();
      // console.log(res)
      const user=res?.data
      setName(user?.name)
      setEmail(user?.email)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
    }

    fetchData()
  }, [id,getUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const data = { name, email};
      const res = await updateUser({id,data}).unwrap();
      // console.log(res)
      if(res.status==="success"){
        navigate("/customers")
        setName('');
        setEmail('');
      }
      
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (loading) return <CSpinner color="primary" />;

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
        {isLoading ? <CSpinner size="sm" /> : "Update"}
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

export default EditUser;
