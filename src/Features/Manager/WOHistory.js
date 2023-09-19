import { useState, React, useEffect } from 'react'
import api from '../../App/api/api'

function WOHistory() {

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
          setRepairDesc(response.data.repairDesc);
          setQty(response.data.qty);
          setProgress(response.data.progress);
      } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
      }
    }

    const getWo = async () => {
        const response = await api.get('/wo/history');
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
                                {/*Handle details*/}
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
                        <form>
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
                                <input type='text' value={repairDesc} className='form-control' disabled />
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
        </div>
      )
}

export default WOHistory