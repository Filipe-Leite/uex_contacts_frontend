import { Link } from "react-router-dom";
import * as URL from '../../../api/requestRequirements';
import { useState } from "react";
import { signUpUser } from "../../../../features/session/sessionSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SignUp(){
    const [formData, setFormData] = useState({
                                                email: '',
                                                password: '',
                                                passwordConfirmation: ''
                                            });
    
    const dispatch = useDispatch<AppDispatch>();
    const errorsMessages = useSelector((state: RootState) => state.session.errorMessages);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const { name, value } = event.target;
                                                                                setFormData(prev => ({
                                                                                    ...prev,
                                                                                    [name]: value
                                                                                }));
                                                                            };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.email === '' || formData.password === '' || formData.passwordConfirmation === '') {
            toast.error('Fill all fields!');
            return;
        }

        const response = await dispatch(signUpUser({
                                                    email: formData.email,
                                                    password: formData.password,
                                                    passwordConfirmation: formData.passwordConfirmation
                                                    }));

        if (response.meta.requestStatus === 'fulfilled') {
            toast.success("User Created")
        } else if (response.meta.requestStatus === 'rejected' && errorsMessages ){
            errorsMessages.forEach((item: string) => {
                toast.error(item);
            });
        } else {
            toast.error('Some error has ocurred')
        }
    };

    return(
        <div id='container-sigin-page'>
            <div id='container-sigin-fields'>
                <h1>Sign Up</h1>
                <div>
                    <label>e-mail</label>

                    <input  
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>password</label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                                <div>
                    <label>password</label>

                    <input
                        id="password-confirmation"
                        name="passwordConfirmation"
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}> Confirm</button>
                    <Link to={URL.SIGNIN_ENDPOINT}> Sign in</Link>
                </div>
            </div>
        </div>
    )
}