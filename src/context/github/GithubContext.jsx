import { createContext, useReducer } from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
import githubReducer from './GitHubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false
    }

    const [ state, dispatch ] = useReducer(githubReducer,initialState)

    // Get Results of Users
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
          q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
          // HEADER AUTH THROWING CORS ERROR
          // headers: {
          //   Authorization: `token ${GITHUB_TOKEN}`
          // }
        })
    
        const {items} = await response.json()
        
        dispatch({
          type: "GET_USERS",
          payload: items,
        })
      }
      
      // Get Single User
      const getUser = async (login) => {
        setLoading()
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
          // HEADER AUTH THROWING CORS ERROR
          // headers: {
            //   Authorization: `token ${GITHUB_TOKEN}`
          // }
        })

        if(response.status === 404) {
          window.location = '/notfound'
        } else {
          const data = await response.json()
          
          dispatch({
            type: "GET_USER",
            payload: data,
          })
        }
      }

      const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
          sort: 'created',
          per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
          // HEADER AUTH THROWING CORS ERROR
          // headers: {
          //   Authorization: `token ${GITHUB_TOKEN}`
          // }
        })
    
        const data = await response.json()
        
        dispatch({
          type: "GET_REPOS",
          payload: data,
        })
      }

      const clearUsers = async () => dispatch({type: "CLEAR_USERS"})
    
      const setLoading = () => dispatch({type:"SET_LOADING"})
    
      return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext