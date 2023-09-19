import { useState, React, useEffect } from 'react'
import api from '../../App/api/api'

function AdminAccounts() {

    const [data, setData] = useState([]) 
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        roles: '',
        type: ''
      })

    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPassword, setStaffPassword] = useState('');
    const [staffType, setStaffType] = useState('');
    const [staffRoles, setStaffRoles] = useState('');
    const [staffID, setStaffID] = useState('');
    
    const [msg, setMsg] = useState('');

    const typeOptions = [
      {label: 'Admin', value: 'admin'},
      {label: 'Manager', value: 'manager'},
      {label: 'Employee', value: 'employee'},
      {label: 'Client', value: 'client'}
    ]

    const rolesOptions = [
        {label: 'Admin', value: 'Admin'},
        {label: 'Client', value: 'Client'},
        {label: 'Manager', value: 'Manager'},
        {label: 'Inspector', value: 'Inspector'},
        {label: 'Blasting', value: 'Blasting'},
        {label: 'CONROD', value: 'CONROD'},
        {label: 'Crankshaft', value: 'Crankshaft'},
        {label: 'Electro Plating', value: 'Electro Plating'},
        {label: 'Lathe 1', value: 'Lathe 1'},
        {label: 'Lathe 2', value: 'Lathe 2'},
        {label: 'Lathe 3', value: 'Lathe 3'},
        {label: 'Milling', value: 'Milling'},
        {label: 'Polish Camshaft', value: 'Polish Camshaft'},
        {label: 'Surface Grinding 1', value: 'Surface Grinding 1'},
        {label: 'Surface Grinding 2', value: 'Surface Grinding 2'}
    ]

    const showDetail = async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            setStaffID(response.data._id);
            setStaffName(response.data.name);
            setStaffEmail(response.data.email);
            setStaffRoles(response.data.roles);
            setStaffType(response.data.type);
        } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
        }
      }

    const getUsers = async () => {
        const response = await api.get('/users');
        setData(response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', values);
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const handleUpdate = async (userId) => {
        try {
          await api.patch('/users', {
            id: userId,
            name: staffName,
            email: staffEmail,
            password: staffPassword,
            type: staffType,
            roles: staffRoles,
          });
        } catch (error) {
          if (error.response) {
            console.log(error);
          }
        }
    }

    const handleDelete = async (userId) => {
        await api.delete('/users', {
            data: {
                id: userId,
            }
        });
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
      <div className='d-flex justify-content-center'>
        <div className='m-4 p-5 w-100 bg-white rounded p-4'>
          <h2 className='pb-3 mb-3'>Active Accounts</h2>

          <div className='d-flex justify-content-end'>
            <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#addItem'>
                Add Account
            </button>
          </div>

          <table className='table table-hover align-middle'>
            <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Account Type</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                {data.map((staff, index) => {
                    return <tr key={staff._id}>
                        <td>{index + 1}</td>
                        <td>{staff.name}</td>
                        <td>{staff.email}</td>
                        <td>{staff.type}</td>
                        <td>{staff.roles}</td>
                        <td>{staff.status}</td>
                        <td>
                            {/*Handle edit*/}
                            <button class='btn btn-sm btn-primary me-1' onClick={() => showDetail(staff._id)} data-bs-toggle='modal' data-bs-target='#editItem'><i class='fa-solid fa-pen-to-square'></i></button>
                            {/*Handle delete*/}
                            <button class='btn btn-sm btn-danger me-1' onClick={() => handleDelete(staff._id)}><i class='fa-solid fa-trash'></i></button>
                        </td>
                    </tr>
                })}
            </tbody>
          </table>
        </div>

        {/*Modal functions to add accounts*/}

        <div className='modal fade' id='addItem' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <div className='modal-header'>
                          <h1 className='modal-title fs-5' id='staticBackdropLabel'>Adding Accounts</h1>
                          <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                          <div className='modal-body'>
                              <div className='mb-2'>
                                  <label htmlFor=''>Name</label>
                                  <input type='text' placeholder='Enter Name' className='form-control' 
                                  onChange={e => setValues({...values, name: e.target.value})} />
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Email</label>
                                  <input type='email' placeholder='Enter Email' className='form-control'
                                  onChange={e => setValues({...values, email: e.target.value})} />
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Position</label>
                                  <select className='form-select' onChange={e => setValues({...values, roles: e.target.value})}>
                                      {rolesOptions.map(option => (
                                          <option value={option.value}>{option.label}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Password</label>
                                  <input type='text' placeholder='Enter Password' className='form-control'
                                  onChange={e => setValues({...values, password: e.target.value})} />
                              </div> 
                              <div className='mb-2'>
                                  <label htmlFor=''>Account Role</label>
                                  <select className='form-select' onChange={e => setValues({...values, type: e.target.value})}>
                                      {typeOptions.map(option => (
                                          <option value={option.value}>{option.label}</option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className='modal-footer'>
                              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                              <button type='submit' className='btn btn-success'>Create</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>


          {/*Modal functions to edit accounts*/}

          <div className='modal fade' id='editItem' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <div className='modal-header'>
                          <h1 className='modal-title fs-5' id='staticBackdropLabel'>Editing Accounts</h1>
                          <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                      </div>
                      <form onSubmit={() => handleUpdate(staffID)}>
                          <div className='modal-body'>
                              <div className='mb-2'>
                                  <label htmlFor=''>Name</label>
                                  <input type='text' value={staffName} className='form-control' 
                                  onChange={(e) => setStaffName(e.target.value)} />
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Email</label>
                                  <input type='email' value={staffEmail} className='form-control' 
                                  onChange={(e) => setStaffEmail(e.target.value)} />
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Position</label>
                                  <select className='form-select' value={staffRoles}
                                    onChange={(e) => setStaffRoles(e.target.value)}>
                                      {rolesOptions.map(option => (
                                          <option value={option.value}>{option.label}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className='mb-2'>
                                  <label htmlFor=''>Password</label>
                                  <input type='text' placeholder='************' className='form-control' 
                                  onChange={(e) => setStaffPassword(e.target.value)} />
                              </div> 
                              <div className='mb-2'>
                                  <label htmlFor=''>Account Type</label>
                                  <select className='form-select' value={staffType}
                                    onChange={(e) => setStaffType(e.target.value)}>
                                      {typeOptions.map(option => (
                                          <option value={option.value}>{option.label}</option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className='modal-footer'>
                              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                              <button type='submit' className='btn btn-success'>Update</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>

      </div>
    )
}   

export default AdminAccounts