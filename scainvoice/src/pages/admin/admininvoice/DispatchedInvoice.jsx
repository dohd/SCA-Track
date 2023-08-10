import React from 'react';

const DispatchedInvoice = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="invoice-title">
                <h4 className="float-end font-size-15">
                  Invoice Number:SCA-040<span className="badge bg-success font-size-12 ms-2">Dispatched</span>
                </h4>
                <div className="mb-4">
                  <h2 className="mb-1 text-muted">info@spartec.com</h2>
                </div>
                
              </div>
              <hr className="my-4" />
              <div className="row">
                <div className="col-sm-6">
                  <div className="text-muted">
                    <h5 className="font-size-16 mb-3">Billed To:</h5>
                    <h5 className="font-size-15 mb-2">Sidian Bank</h5>
                    <p className="mb-1">Moi Avenue </p>
                    <p className="mb-1">PrestonMiller@armyspy.com</p>
                    <p>P.O.Box -12345,Nairobi</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-muted text-sm-end">
                    <div>
                      <h5 className="font-size-15 mb-1">Invoice No:</h5>
                      <p>#DZ0112</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                      <p>12 Oct, 2020</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1">Order No:</h5>
                      <p>#1123456</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <h5 className="font-size-15">Order Summary</h5>
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-centered mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: '70px' }}>No.</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className="text-end" style={{ width: '120px' }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">01</th>
                        <td>
                          <div>
                            <h5 className="text-truncate font-size-14 mb-1">Black Strap A012</h5>
                            <p className="text-muted mb-0">Watch, Black</p>
                          </div>
                        </td>
                        <td>$ 245.50</td>
                        <td>1</td>
                        <td className="text-end">$ 245.50</td>
                      </tr>
                      <tr>
                        <th scope="row">02</th>
                        <td>
                          <div>
                            <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                            <p className="text-muted mb-0">Watch, Gold</p>
                          </div>
                        </td>
                        <td>$ 245.50</td>
                        <td>2</td>
                        <td className="text-end">$ 491.00</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="4" className="text-end">
                          Sub Total
                        </th>
                        <td className="text-end">$ 732.50</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="4" className="border-0 text-end">
                          Discount :
                        </th>
                        <td className="border-0 text-end">- $25.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-end">
                <button className="btn btn-success">Mark as Delivered</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchedInvoice;
