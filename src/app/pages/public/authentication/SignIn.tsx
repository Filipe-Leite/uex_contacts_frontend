import { Link, useNavigate } from "react-router-dom";
import * as URL from '../../../api/requestRequirements';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInUser } from "../../../../features/session/sessionSlice";
import * as ROUTES from '../../../api/requestRequirements';

export default function SignIn(){
    const [formData, setFormData] = useState({
                                                email: '',
                                                password: ''
                                            });
    const dispatch = useDispatch<AppDispatch>();
    const errorsMessages = useSelector((state: RootState) => state.session.errorMessages);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                                                                            const { name, value } = event.target;
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                [name]: value
                                                                            }));
                                                                        };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.email === '' || formData.password === '') {
            toast.error('Fill all fields!');
            return;
        }

        const response = await dispatch(signInUser({
                                                    email: formData.email,
                                                    password: formData.password
                                                    }));

        if (response.meta.requestStatus === 'fulfilled') {
      
            navigate(ROUTES.HOME)
            
        } else if (response.meta.requestStatus === 'rejected' && errorsMessages ) {
            errorsMessages.forEach((item: string) => {
                toast.error(item);
            });
        } else {
            toast.error('Some error has occurred');
        }
    };

    return(
        <div id='container-sigin-page'>
            <div id='container-sigin-fields'>
                <h1>Login</h1>
                <div>
                    <label>e-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required/>
                </div>
                <div>
                    <label>password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required/>
                </div>
                <div>
                    <button onClick={handleSubmit}> Login</button>
                    <Link to={URL.SIGNUP_ENDPOINT}> Sign Up</Link>
                </div>
            </div>
        </div>
    )
}