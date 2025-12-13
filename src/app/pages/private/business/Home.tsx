import { useEffect, useState } from 'react'
import './home.css'
import { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisteredContacts } from '../../../../features/session/navigationSlice';
import { signOutUser } from '../../../../features/session/sessionSlice';
import MapWithMarker from '../../../components/MapWithMarker';
import { Contact } from '../../../#interfaces/interfaces';
import { CircularProgress } from '@mui/material';

export default function Home(){
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const contacts = useSelector((state: RootState) => state.sessionNavigation.contacts);
    const loadingContacts = useSelector((state: RootState) => state.sessionNavigation.loadingContacts);
    const [selectContact, setSelectContact] = useState<Contact>()

    console.log("selectContact >>> ", selectContact)

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
                <div id='container-search-fields'>
                    <div className='container-search-fields-first-line'>
                        <label>
                            Contact Type:
                        </label>
                        <input/>
                    </div>

                    <div className='container-search-fields-second-line'>
                        <label>
                            Search:
                        </label>
                        <div className='container-search-fields-second-line-buttons'>
                            <input/>
                            <button className='button-search-contact'>

                            </button>
                            <button className='button-clear-field'>

                            </button>
                        </div>
                    </div>
                </div>
                <ul className='ul-contacts'>
                    {contacts ? contacts.length > 0 && contacts.map((contact: Contact, index) => (
                        <li key={index}
                         onClick={()=>{setSelectContact(contact)}}>
                            <a>{contact.name}</a>
                        </li>
                    )): null }
                
                    {loadingContacts ? 
                        <div>
                            <CircularProgress color='secondary' sx={{ color: 'rgba(50,50,50)' }}/>
                        </div>
                        :
                        null
                    }
                </ul>
            </div>
            <div id='container-home-right-side'>
                <MapWithMarker
                    lat={selectContact?.latitude ? Number(selectContact.latitude) : undefined}
                    lng={selectContact?.longitude ? Number(selectContact.longitude) : undefined}
                    contactName={selectContact?.name || "Localização do Contato"}
                    contactDetails={{
                    address: `${selectContact?.street || ''} ${selectContact?.number || ''}, ${selectContact?.neighborhood || ''}`,
                    cep: selectContact?.cep
                    }}
                    zoom={12}
                    height="100%"
                    width="100%"
                />
            </div>
        </div>
    )
}
