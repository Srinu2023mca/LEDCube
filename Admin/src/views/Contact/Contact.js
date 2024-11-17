import React, { useState, useEffect } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CSpinner,
  //CInput,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './Contact.css' // Import external CSS file
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { useGetContactsQuery } from '../../app/service/ContactApiSlice'
import { useNavigate } from 'react-router-dom'

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [filtered, setFilterd] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { data: data, error, isLoading, refetch } = useGetContactsQuery()

  const navigate = useNavigate()

  useEffect(() => {
    refetch()
    if (data) {
      //console.log(data)
      //data.contacts.sort((a, b) => new Date(b.date) - new Date(a.date))
      const contacts = [...data.contacts].sort((a, b) => new Date(b.date) - new Date(a.date))
      console.log(data)
      setFilterd(contacts)

      setCurrentPage(1)
    }
  }, [data, refetch])

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }
  if (error) {
    return <div>error</div>
  }

  const onGetAll = () => {
    const contacts = [...data.contacts].sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log(data)
    setFilterd(contacts)
  }

  const contactsPerPage = 10

  const totalPages = Math.ceil(filtered.length / contactsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact = indexOfLastContact - contactsPerPage
  //let currentContacts = []
  // if (totalPages == 0) {
  // currentContacts = filtered
  // } else {
  const currentContacts = filtered.slice(indexOfFirstContact, indexOfLastContact)

  //}

  const handleSearch = () => {
    const contacts = [...data.contacts].sort((a, b) => new Date(b.date) - new Date(a.date))
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilterd(filteredContacts)
    setCurrentPage(1)
  }

  //const handleSearch = () => {}

  const convertToIST = (isoString) => {
    const date = new Date(isoString)

    const options = { timeZone: 'Asia/Kolkata' }
    const indianDate = new Date(date.toLocaleString('en-US', options))

    // Extract the individual components

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }
    const time = date.toLocaleTimeString('en-IN', timeOptions)
    const day = indianDate.getDate()
    const month = indianDate.toLocaleString('en-IN', { month: 'long', timeZone: 'Asia/Kolkata' })
    const year = indianDate.getFullYear() + ''

    return `${day}-${month.slice(0, 3)}-${year.slice(-2)} ${time}`
  }

  //   useEffect(() => {})
  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h3 className="margin">Contacts</h3>

        <CButton
          color="primary"
          className="add-contact"
          onClick={() => navigate('/contact/addnew')}
        >
          Add Contact
        </CButton>
        <CButton color="primary" className="add-contact" onClick={onGetAll}>
          Show All
        </CButton>
        <CInputGroup className="search-input-group">
          <CFormInput
            type="text"
            placeholder="Search contacts by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CInputGroupText onClick={handleSearch} className="search-icon">
            <CIcon icon={cilSearch} />
          </CInputGroupText>
        </CInputGroup>
      </div>
      <div className="table-container">
        <CTable striped className="table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email or Contact</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentContacts.map((contact) => (
              <CTableRow key={contact._id}>
                <CTableDataCell>{contact.contactId}</CTableDataCell>
                <CTableDataCell>{contact.name}</CTableDataCell>

                <CTableDataCell>{contact.email}</CTableDataCell>
                <CTableDataCell>{convertToIST(contact.date)}</CTableDataCell>
                <CTableDataCell>{contact.description}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem
          aria-label="Previous"
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          aria-label="Next"
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </div>
  )
}

export default Contacts
