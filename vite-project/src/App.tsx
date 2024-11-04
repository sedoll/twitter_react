import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout";
import Profile from "./routes/profile";
import Home from "./routes/home";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

// 기능
const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "profile",
        element: <Profile/>
      }
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/create-account",
    element: <CreateAccount/>
  }
])

// 스타일
const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  }
`

function App() {
  //#region  firebase
  const [isLoading, setIsLoading] = useState(true)
  const init = async() => {
    setTimeout(()=> {
      setIsLoading(false)
    }, 1000)
  }
  useEffect(()=> {
    init()
  }, [])
  //#endregion
  return (
    <>
      <GlobalStyles/>
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/> }
    </>
  )
}

export default App
