import { useState, React, useEffect } from 'react'
import api from '../../App/api/api'

function ClientWO() {
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
    const [values, setValues] = useState({
        partName: '',
        qty: ''
      })

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

    const getWo = async () => {
        const response = await api.get('/wo');
        setData(response.data);
    }

    const handleSubmit = async () => {
        try {
            await api.post('/wo', values);
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const handleUpdate = async (woId) => {
        try {
          await api.patch('/wo', {
            id: woId,
            name: partName,
            recRepair: recRepair,
            progress: progress,
            qty: qty,
          });
        } catch (error) {
          if (error.response) {
            console.log(error);
          }
        }
    }

    useEffect(() => {
        getWo();
    }, [])

  return (
    <div className='d-flex justify-content-center'>
      <div className='m-4 p-5 w-100 bg-white rounded p-4'>
        <h2 className='pb-3 mb-3'>Work Orders</h2>

        <div className='d-flex justify-content-end'>
          <button progress='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#addItem'>
              Add Work Order
          </button>
        </div>

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
                            {/*Open details*/}
                            <button class='btn btn-sm btn-primary me-1' onClick={() => showDetail(wo._id)} data-bs-toggle='modal' data-bs-target='#editItem'><i class='fa-solid fa-pen-to-square' /> Details</button>
                        </td>
                    </tr>
                })}
          </tbody>
        </table>
      </div>
      
      {/*Modal functions to add work order*/}

      <div className='modal fade' id='addItem' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'>Adding Work Order</h1>
                        <button progress='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='modal-body'>
                            <div className='mb-2'>
                                <label htmlFor=''>Part Name</label>
                                <input progress='text' placeholder='Enter Part Name' className='form-control'
                                onChange={e => setValues({...values, partName: e.target.value})} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>QTY</label>
                                <input progress='text' placeholder='Enter Quantity' className='form-control'
                                onChange={e => setValues({...values, qty: e.target.value})} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button progress='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button progress='submit' className='btn btn-success'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        {/*Modal functions to view details*/}

        <div className='modal fade' id='editItem' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'>Editing Work Order</h1>
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
                                <label htmlFor=''>Recommended Repair</label>
                                <input progress='text' value={recRepair} className='form-control' disabled />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button progress='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button progress='submit' className='btn btn-success'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ClientWO