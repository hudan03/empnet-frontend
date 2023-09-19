import React from 'react'

function AdminDashboard() {
  return (
    <div className='m-4 p-5 bg-white'>
      <h2 className='pb-3 mb-3'>Dashboard</h2>

      <div className='row mb-4'>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-success text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Registered Account</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-people fs-1 pe-5'></i></div>
          </div>
        </div>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-info text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Client</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-people fs-1 pe-5'></i></div>
          </div>
        </div>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-warning text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Manager</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-people fs-1 pe-5'></i></div>
          </div>
        </div>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-danger text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Employee</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-people fs-1 pe-5'></i></div>
          </div>
        </div>

      </div>

      <div className='row mb-4'>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-primary text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Total Work Order</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-clipboard-check fs-1 pe-5'></i></div>
          </div>
        </div>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-primary text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Active Work Order</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-clipboard-check fs-1 pe-5'></i></div>
          </div>
        </div>

        <div className='col'>
          <div className='d-flex align-items-center justify-content-between p-3 bg-primary text-white rounded h-100' id=''>
            <div className='ps-4'>
              <h4>Completed Work Order</h4>
              <div className='fs-4'>1</div>
            </div>
            <div><i className='bi bi-clipboard-check fs-1 pe-5'></i></div>
          </div>
        </div>
        
      </div>

      <div className='row'>

        <div className='col'>
          <div class="card">
            <div class="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>

        <div className='col'>
          <div class="card">
            <div class="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default AdminDashboard
