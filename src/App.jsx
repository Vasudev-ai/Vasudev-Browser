
import { Route, Routes } from "react-router-dom"
import MainPage from "./components/pages/MainPage.jsx"
import UserPanel from "./components/pages/UserPanel.jsx"

const App = () => {
  return (
<Routes>
    <Route path="/" element={<MainPage></MainPage>}></Route>
    <Route path="/userPanel" element={<UserPanel></UserPanel>}></Route>
</Routes>
    
  )
}

export default App
