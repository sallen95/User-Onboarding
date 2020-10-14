import React from 'react'

function FormComponent (props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add a User</h2>

                <label>Name
                    <input
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={onChange}
                    />
                </label><br/>

                <label>Email
                    <input
                        type='text'
                        name='email'
                        value={values.email}
                        onChange={onChange}
                    />
                </label><br/>

                <label>Password
                    <input
                        type='text'
                        name='password'
                        value={values.password}
                        onChange={onChange}
                    />
                </label><br/>

                <label>Terms of Service
                    <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={onChange}
                    />
                </label><br/>
            </div>
            <div className='form-submit'>
                <button disabled={disabled}>submit</button>
            </div>
            <div className='errors'>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
            </div>
        </form>
    )
}

export default FormComponent;