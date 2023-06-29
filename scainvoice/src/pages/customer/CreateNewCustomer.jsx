import React from 'react';
import { useForm } from 'react-hook-form';

const CustomerForm = () => {
  const { register, handleSubmit,reset , formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleClearForm = () => {
    reset(); // Reset the form fields
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Create Customer</h2>
        <label htmlFor="custid">Customer ID</label>
        <input
          type="text"
          id="custID" placeholder='SCA-001'
          {...register("custID", { required: true })}
        />
        {errors.custID && <span>This field is required</span>}
      </div>
      
      <div>
        <label htmlFor="custName">Customer Name</label>
        <input
          type="text"
          id="custName"
          placeholder='enter customer name'
          {...register("custName", { required: true })}
        />
        {errors.custName && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="custStreet">Customer Street</label>
        <input
          type="text"
          id="custStreet"placeholder='customer street'
          {...register("custStreet", { required: false })}
        />
        {errors.custStreet && <span></span>}
      </div>

      <div>
        <label htmlFor="telephone">Telephone</label>
        <input
          type="text"
          id="telephone"placeholder='0723543332'
          {...register("telephone", { required: false, pattern:  /^[0-9]{10}$/  })}
        />
        {errors.telephone && <span></span>}
      </div>

      <div>
        <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
        <div>
        <button type="button" onClick={handleClearForm}>Clear Form</button>
      </div>
    </form>
  );
};

export default CustomerForm;
