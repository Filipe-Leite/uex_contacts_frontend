import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './searchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import * as REQUEST_REQUIREMENTS from '../../api/requestRequirements';
// import { getSearchResults } from '../sessions/sessionSearch/sliceSearch';

interface SearchBarProps{
  searchInputQuery: string;
  setSearchInputQuery: Dispatch<SetStateAction<string>>;
  setShowComponent: Dispatch<SetStateAction<boolean>>;
}

function SearchBar({ searchInputQuery, setSearchInputQuery, setShowComponent }: SearchBarProps) {
  const navigate = useNavigate();
  const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const containerComponentSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (
          containerComponentSearchRef.current &&
            !containerComponentSearchRef.current.contains(event.target as Node)
        ) {
          setShowComponent(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({
  //   ROUTE_PARAMS: {
  //       queryType: 'users',
  //       searchInputQuery: searchInputQuery
  //   }
  // });
  
  // async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === 'Enter') {
  //     const params = new URLSearchParams(location.search);
  //     const currentPath = location.pathname;
  //     const targetPath = PRIVATE_ROUTES.SEARCH_BAR_NAVIGATION.split('?')[0];

  //     if (searchInputQuery) {
  //         if (currentPath === targetPath) {
  //             fetchUsersData();
  //             navigate(PRIVATE_ROUTES.SEARCH_BAR_NAVIGATION);
  //         } else {
  //             navigate(PRIVATE_ROUTES.SEARCH_BAR_NAVIGATION);
  //         }
  //     }
  //   }
  // }

  // async function fetchUsersData(){
  //   if (authHeaders && searchInputQuery){
  //       const response =  await dispatch(getSearchResults({headers: authHeaders,
  //                                                          routeParams: {
  //                                                               queryType: 'users',
  //                                                               query: searchInputQuery,
  //                                                               page: 1
  //                                                          }
  //       }))
  //   }
  // }

  return (
    <div id='logo-seach-input-component' ref={containerComponentSearchRef}>
      <input
        id='search-input'
        type="text"
        placeholder="Search..."
        value={searchInputQuery}
        onChange={(e) => setSearchInputQuery(e.target.value)}
      />
      <button>
        search
      </button>
    </div>
  );
}

export default SearchBar;
