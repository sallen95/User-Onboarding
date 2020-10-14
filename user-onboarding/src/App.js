import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FormComponent from './components/Form.js';
import axios from 'axios';
import schema from './validation/formSchema.js';
import * as yup from 'yup';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
};

const initialFormErrors = {
  name: '',
  email: '',
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        console.log(res)
        setUsers([...users, res.data])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log('You have an error!!', err)
        setFormErrors(initialFormErrors)
      })
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors, [name]: "",
        })
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors, [name]: err.errors[0]
        })
      })

    setFormValues({
      ...formValues, [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser);
  };

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues]);

  return (

    <div>
      <FormComponent
        values={formValues}
        submit={formSubmit}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      />
      <div>
        <pre>{JSON.stringify(formValues)}</pre>
      </div>
    </div>
  );
};

export default App;
