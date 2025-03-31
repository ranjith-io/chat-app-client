import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const AddContacts = () => {
  const [email, setEmail] = React.useState('');
  const {addContact} = useAuthStore();
  const handleAddContact =async(e)=>
  {
    e.preventDefault();
    await addContact(email);
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Add Contact</h2>
      <input 
        type='email' 
        placeholder='Enter Email' 
        className='input input-bordered w-full mb-3' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='btn btn-primary w-full' onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default AddContacts;