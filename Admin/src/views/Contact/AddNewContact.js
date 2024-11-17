import React, { useState } from 'react'
import {
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './AddNewContact.css' // Import external CSS file
import { useAddContactMutation } from '../../app/service/ContactApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddNewContact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [addContact, { isLoading }] = useAddContactMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addContact({ name, email, description }).unwrap()
      toast.success('contact added successfully!.')
      navigate('/contact')
    } catch (e) {
      toast.error(e?.data?.message || e.error)
    }
  }

  return (
    <CContainer className="form-container">
      <CRow>
        <CCol md={8} lg={6}>
          <CForm onSubmit={handleSubmit} className="contact-form">
            <h2 className="form-title">Contact Form</h2>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="emailOrPhone">Email or Phone Number</CFormLabel>
              <CFormInput
                type="text"
                id="emailOrPhone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>
            <CButton type="submit" color="primary" className="submit-btn">
              Submit
            </CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddNewContact
