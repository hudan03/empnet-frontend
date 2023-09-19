import { useState, React, useEffect } from 'react'
import api from '../../App/api/api'

function ManagerWO() {
    const options = [
        {label: 'Metal Spray Machine - Blasting', value: 'Metal Spray Machine - Blasting'},
        {label: 'Metal Spray Machine - Masking', value: 'Metal Spray Machine - Masking'},
        {label: 'Metal Spray Machine - Spraying', value: 'Metal Spray Machine - Spraying'},
        {label: 'Polishing', value: 'Polishing'},
        {label: 'Crankshaft Undersize - Polish Main or Pin only', value: 'Crankshaft Undersize - Polish Main or Pin only'},
        {label: 'Setting', value: 'Setting'},
        {label: 'Electro Plating Process', value: 'Electro Plating Process'},
        {label: 'Finishing Spray', value: 'Finishing Spray'},
        {label: 'Measuring', value: 'Measuring'},
        {label: 'Undercut / Cutting', value: 'Undercut / Cutting'},
        {label: 'Polishing Finishing', value: 'Polishing Finishing'},
        {label: 'Drilling', value: 'Drilling'},
        {label: 'Milling', value: 'Milling'},
        {label: 'Repair thread / Remove Bolt or Stud', value: 'Repair thread / Remove Bolt or Stud'},
        {label: 'Loading / Unloading', value: 'Loading / Unloading'},
        {label: 'Wrapping / Greasing', value: 'Wrapping / Greasing'},
        {label: 'Grinding Surface', value: 'Grinding Surface'}
    ]

    const [data, setData] = useState([]) 

    const [partName, setPartName] = useState('');
    const [recRepair, setRecRepair] = useState('');
    const [qty, setQty] = useState('');
    const [woID, setWoID] = useState('');
    const [progress, setProgress] = useState('');
    
    const [msg, setMsg] = useState('');
    
    const showDetail = async (woId) => {
      try {
          const response = await api.get(`/wo/${woId}`);
          setWoID(response.data._id);
          setPartName(response.data.partName);
          setRecRepair(response.data.recRepair);
          setQty(response.data.qty);
          setProgress(response.data.progress);
      } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
      }
    }

    const handleUpdate = async (woId) => {
        try {
          await api.patch('/wo/assign', {
            id: woId,
            recRepair: recRepair,
          });
        } catch (error) {
          if (error.response) {
            console.log(error);
          }
        }
    }

    const getWo = async () => {
        const response = await api.get('/wo');
        setData(response.data);
    }
    
    useEffect(() => {
        getWo();
    }, [])


      return (
        <div className='d-flex justify-content-center'>
          <div className='m-4 p-5 w-100 bg-white rounded p-4'>
            <h2 className='pb-3 mb-3'>Work Orders</h2>
    
            <table className='table table-hover align-middle'>
              <thead>
                  <tr>
                      <th>No</th>
                      <th>Order ID</th>
                      <th>Part Name</th>
                      <th>QTY</th>
                      <th>Recommended Repair</th>
                      <th>Progress</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody className='table-group-divider'>
                    {data.map((wo, index) => {
                        return <tr key={wo._id}>
                            <td>{index + 1}</td>
                            <td>{wo._id}</td>
                            <td>{wo.partName}</td>
                            <td>{wo.qty}</td>
                            <td>{wo.recRepair}</td>
                            <td>{wo.progress}</td>
                            <td>
                                {/*Handle update*/}
                                <button class='btn btn-sm btn-primary me-1' onClick={() => showDetail(wo._id)} data-bs-toggle='modal' data-bs-target='#update'><i class='fa-solid fa-pen-to-square' /> Details</button>
                            </td>
                        </tr>
                    })}
              </tbody>
            </table>
          </div>
          
          {/*Modal functions to update wo*/}
    
          <div className='modal fade' id='update' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Adding Work Order</h1>
                            <button progress='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <form onSubmit={() => handleUpdate(woID)}>
                            <div className='modal-body'>
                                <div className='mb-2'>
                                    <label htmlFor=''>Part Name</label>
                                    <input progress='text' value={partName} className='form-control' disabled />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor=''>QTY</label>
                                    <input progress='text' value={qty} className='form-control' disabled />
                                </div>
                                <div className='mb-2'>
                                  <label htmlFor=''>Repair Recommendation</label>
                                  <select className='form-select' placeholder='Repair Recommendation'
                                  onChange={(e) => setRecRepair(e.target.value)}>
                                      {options.map(option => (
                                          <option value={option.value}>{option.label}</option>
                                      ))}
                                  </select>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button progress='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                                <button progress='submit' className='btn btn-success'>Assign</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
        </div>
      )
}

export default ManagerWO