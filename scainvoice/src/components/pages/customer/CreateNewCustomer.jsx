import React from 'react'

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
                
                   </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

  
