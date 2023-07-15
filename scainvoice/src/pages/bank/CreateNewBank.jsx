import React, { useState, useEffect }from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function CreateNewBank() {


    const { register, handleSubmit,reset , formState: { errors } } = useForm();

  const [bankname, setbankname] = useState('');
  const [bbranch, setbbranch] = useState('');
  const [Kes, setKes] = useState('');
  const [usd_acc, setusd_account] = useState('');
  const [Pound_acc, setPound_acc] = useState('');
  const [b_sort, setb_sort] = useState('');
  

  const onSubmit = (data) => {

    const handleSubmit = async (event) => {
      try {
        await axios.post('http://localhost:3000/add_bank', 
       {
        bankname,
        bbranch,
        usd_acc,
        Pound_acc,
        Kes,
        b_sort,
       
          
        });
        alert('Bank added successfully!');
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };


  

    const handleClearForm = () => {
        // Reset the form fields
        setbankname("");
        setbbranch("");
        setKes("");
        setusd_account("");
        setPound_acc("");
        setb_sort("");
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <h2>New Bank</h2>
      <label htmlFor="bankname">Bank Name</label>
      <input
        type="text"
        id="bankname" 
      
      />
     
    </div>
    
    <div>
      <label htmlFor="bbranch">Branch</label>
      <input
        type="text"
        id="branch"
       
       
      />
    
    </div>

    <div>
      <label htmlFor="Kes">Kes Account</label>
      <input
        type="text"
        id="Kes"
      />
      {errors.Kes && <span></span>}
    </div>


    <div>
      <label htmlFor="usd_acc">Usd Account:</label>
      <input
        type="text"
        id="usd_acc"
      />
      {errors.usd_acc && <span></span>}
    </div>


    <div>
      <label htmlFor="Pound_acc">Pounds Account</label>
      <input
        type="text"
        id="Pound_acc"/>
      {errors.Pound_acc && <span></span>}
    </div>


    <div>
      <label htmlFor="b_sort">Swift/Sort:</label>
      <input
        type="text"
        id="b_sort"
      />
      {errors.b_sort && <span></span>}
    </div>


   

    <div>
      <button type="submit" onClick={onSubmit}>Submit</button>
      </div>
      <div>
      <button type="button" onClick={handleClearForm}>Clear Form</button>
    </div>
  </form>
  )
}
