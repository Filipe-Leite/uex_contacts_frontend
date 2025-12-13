import { useEffect } from 'react'
import './home.css'
import { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisteredContacts } from '../../../../features/session/navigationSlice';
import { signOutUser } from '../../../../features/session/sessionSlice';

export default function Home(){
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);

    useEffect(()=>{
        async function fetchData(){

            if (authHeaders){
                const response = await dispatch(getRegisteredContacts({authHeaders:authHeaders}))

                console.log("response getRegisteredContacts>> ", response)
            }
        }

        fetchData();
    },[])

    async function handleLoggout(){

        const response = await dispatch(signOutUser());

    }

    return(
        <div id='home-page'>
            <div id='container-home-top'>
                <button onClick={()=> {handleLoggout()}}>
                    Logout
                </button>
            </div>
            <div id='container-home-left-side'>
                <h1>adfafadfd</h1>
            </div>
            <div id='container-home-left-side'>

            </div>
        </div>
    )
}
