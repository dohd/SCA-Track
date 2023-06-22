import React from 'react'
import { useState } from 'react';

export default function CreateNewCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [suite, setSuite] = useState('');
  const [building, setBuilding] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4>Add Customer</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-4">
                        <label>Customer Name</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fas fa-user"></i>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control phone-number"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        {/* Display error message if name validation fails */}
                        {/* Replace `@error('name')` with appropriate logic */}
                        {/* <span className="error text-danger">{errorMessage}</span> */}
                      </div>
                      {/* Render other form fields similarly */}
                    </div>
                    <div className="card-footer text-right">
                      <button type="submit" className="btn btn-primary">
                        Save Customer
                      </button>
                    </div>
                  </div>
                </form>
                   </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

  
