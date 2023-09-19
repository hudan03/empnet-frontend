import { useState, React, useEffect } from 'react'
import api from '../../App/api/api'

function EmployeeWO() {
    const options = [
        {label: 'Metal Spray Machine - Blasting', value: 'Metal Spray Machine - Blasting'},
        {label: 'Metal Spray Machine - Masking', value: 'Metal Spray Machine - Masking'},
        {label: 'Metal Spray Machine - Spraying', value: 'Metal Spray Machine - Spraying'},
        {label: 'Polishing', value: 'Polishing'},
        {label: 'Crankshaft Undersize - Polish Main or Pin only', value: 'Crankshaft Undersize - Polish Main or Pin only'},
        {label: 'Setting', value: 'Setting'},
        {label: 'Electro Plating Process', value: 'Electro Plating Process'},
        {label: 'Finishing Spray', value: 'Finishing Spray'},
        {label: 'Measuring', value: 'admMeasuringin'},
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
    const [repairDesc, setRepairDesc] = useState('');
    
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
          await api.patch('/wo/repair', {
            id: woId,
            repairDesc: repairDesc,
          });
        } catch (error) {
          if (error.response) {
            console.log(error);
          }
        }
    }

    const getWo = async () => {
        const response = await api.get('/wo/onprogress');
        setData(response.data);
    }
    
    useEffect(() => {
        getWo();
    }, [])


      return (
        <div className='d-flex justify-content-center'>
          <div className='m-4 p-5 w-100 bg-white rounded p-4'>
            <h2 className='pb-3 mb-3'>Work Orders</h2>
    
            <div className='asgn-container justify-content-center p-4 mt-3' id='employee'>
            <div className='row row-cols-2'>
              {data.map((wo, index) => {
                  return (
                    <>
                      <div className='col'>
                        <div key={wo._id}>
                          <div className='record-container bg-dark-subtle rounded mb-4'>
                            <div className='d-flex align-items-center justify-content-between p-3'>
                              <div className='mt-3 ps-4'>
                                <h4>{wo._id}</h4>
                                <div className='py-2 fs-4'>{wo.partName}</div>
                              </div>
                              <div className='px-3'>
                                <button className='btn btn-sm btn-primary me-3' onClick={() => showDetail(wo._id)} data-bs-toggle='modal' data-bs-target='#detail'><i className='fa-solid fa-pen-to-square pe-2'></i>Details</button>
                              </div>
                            </div>
                            <hr className='text-black' />
                            <div className='d-flex flex-column p-3'>
                              <h5 className='ps-4'>{wo.qty}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
              })}
            </div>
          </div>
        </div>

        <div className='modal fade' id='detail' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'>Work Order Details</h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <form onSubmit={() => handleUpdate(woID)}>
                      <fieldset disable>
                        <div className='modal-body'>
                            <div className='mb-2'>
                                <label htmlFor=''>Order ID</label>
                                <input type='text' value={woID} className='form-control' disabled />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Part Name</label>
                                <input type='text' value={partName} className='form-control' disabled />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Quantity</label>
                                <input type='text' value={qty} className='form-control' disabled />
                            </div> 
                            <div className='mb-2'>
                                <label htmlFor=''>Recommended Repair</label>
                                <input type='text' value={recRepair} className='form-control' disabled />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Repair Description</label>
                                <input type='text' placeholder='Enter Repair Report' className='form-control'
                                onChange={(e) => setRepairDesc(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button progress='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button progress='submit' className='btn btn-success'>Update</button>
                        </div>
                      </fieldset>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
}

export default EmployeeWO