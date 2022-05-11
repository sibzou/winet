import {useState} from 'react';
import './formRegister.css';
import $ from "jquery";


export default function FormRegister() {

    // States for registration
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState("");


    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        if (name === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        });
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>
            <form
                action="http://localhost:8080/signup"
                method="post"
                onSubmit={(event) => handleSumbit(event)}
            >
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                       value={name} type="text"/>

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                       value={password} type="password"/>

                <button className="btn" type="submit">
                    Submit
                </button>
            </form>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <h1>{result}</h1>
        </div>
    );
}