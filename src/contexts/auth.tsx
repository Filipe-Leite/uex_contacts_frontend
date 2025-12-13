import { createContext, useEffect, useState } from 'react';
import { authenticateUserFromStorage } from '../features/session/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';

export const AuthContext = createContext({});

export default function AuthProvider({ children }: any) {
    const currentUser = useSelector((state: RootState) => state.session.currentUser);
    const loggedIn = useSelector((state: RootState) => state.session.loggedIn);
    const dispatch = useDispatch<AppDispatch>();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await dispatch(authenticateUserFromStorage()).unwrap();
            } catch (error) {
                console.error("Erro na autenticação:", error);
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuthentication();
    }, [dispatch]);

    const value = {
        currentUser,
        loggedIn,
        authChecked
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}