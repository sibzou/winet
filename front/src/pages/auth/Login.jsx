import FormLogin from "../../components/form_login/FormLogin";
import "../../components/form_login/formLogin.css";

export default function Login(props){
    return (
        <>
            <div className="Form">
                <FormLogin setTokenCallback={props.setTokenCallback}/>
            </div>
        </>
    );
}