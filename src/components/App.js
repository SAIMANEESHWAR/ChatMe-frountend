import Mypage from "./mypage";
import Myhome from "./myhome";
import Login from "./login";
import Login2 from "./login2";
import Otpverify from "./otp";
import Chatsystem from "./chatsystem";
import Pagenotfound from "./pagenotfound";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
  
    
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Mypage/> }></Route> */}
        <Route path='/chatsystem' element={<Chatsystem/>}></Route>
        <Route path='/Otpverify' element={<Otpverify/>}></Route>
        <Route path='/' element={<Myhome/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/login2' element={<Login2/>}></Route>
        <Route path="/*" element={<Pagenotfound />}></Route>
      </Routes>
    </BrowserRouter>

   
   
  );
}

export default App;
