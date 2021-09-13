import React from 'react';

const NutritionistForgottenForm = () => {
  
  const [email, setEmail] = useState('');

  const handleNutritionistLogin = async (e) => {
    e.preventDefault();
    }
  
  return (
    <div className="nutritionist-forgotten-form d-flex justify-content-center">
      <div className="form-container">
        <form onSubmit={ (e) => handleNutritionistLogin(e) }>
          <label htmlFor="email" className="text-white">Email*</label>
          <input type="email" className="form-input-display" placeholder="Votre email"
          value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="submit" className="btn secondary-button mt-5 w-100" value="Envoyer" />
        </form>
      </div>
    </div>
  );
};

export default NutritionistForgottenForm;