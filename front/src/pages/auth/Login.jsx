import FormLogin from "../../components/form_login/FormLogin";
import "../../components/form_login/formLogin.css";
import FormRegister from "../../components/form_register/FormRegister";
import {useState} from "react";

export default function Login(props){
    const [registering, setRegistering] = useState(false);

    return (
        <>
            <div className="Form">
                {registering &&
                    <FormRegister/>
                } {!registering &&
                <FormLogin setTokenCallback={props.setTokenCallback} goToRegister={() => setRegistering(true)}/>
            }
            </div>
        </>
    );
}