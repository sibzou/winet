import {useState} from 'react';
import './formLogin.css';
import $ from "jquery";


export default function FormLogin(props) {



    // States for registration
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState("");
    const [error, setError] = useState(false);



    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            datatype: "json",
            data: JSON.stringify({username: username, password: password}),
            success: function (data) {
                alert(data);
                setError(false);
                setSubmitted(true);
                props.setTokenCallback(data);


            },
            error: function () {
                setSubmitted(false)
                setError(true);
            }
        })
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {username} successfully connected!!</h1>
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
                <h1>Wrong credentials</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>Login</h1>
            </div>
            <form
                action="http://localhost:8080/signin"
                method="post"
                onSubmit={(event) => handleSumbit(event)}
            >
                {/* Labels and inputs for form data */}
                <label className="label">Username</label>
                <input onChange={handleName} className="input"
                       value={username} type="text" id="username" name="username"/>

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                       value={password} type="password" id="password" name="password"/>

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