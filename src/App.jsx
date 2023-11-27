import { useState } from 'react'
import ParticlesBg from 'particles-bg'
import Tilt from 'react-parallax-tilt';
import './App.css'

function App() {
  const [page, setPage] = useState('home');

  function changePage(newpage) {
    setPage(newpage);
  }

  function showMenu() {
    let menu = document.getElementsByClassName('menu')[0];
    menu.classList.toggle('showmenu');
  }


  if (page == 'home') {
    return (
      <div className=''>
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-[#0009] grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
            <h1 className='text-[40px]'>Cal-Muse</h1>
            <div className='w-full p-2'>
              home
            </div>
            <div className='navbar overflow-hidden'>
              <div className='menu'>
                <div onClick={showMenu} className='flex justify-end col-span-2'>
                  <div className='menubtn'>
                    <button className='bg-white p-2 rounded-[100px] mr-[20px] text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                  </button>
                  </div>
                </div>
                <div className='btn1'>
                  <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('theory')}>THEORY</button>
                </div>
                <div className='btn2'>
                  <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('application')}>APPLICATION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ParticlesBg type="square" bg={true} />
      </div>
    )
  }
  else if(page == 'theory'){
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-[#0009] grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
          <h1 className='text-[40px]'>Cal-Muse</h1>
          <div className='w-full p-2 overflow-y-auto'>
            theory
          </div>

          <div className='navbar overflow-hidden'>
            <div className='menu'>
              <div onClick={showMenu} className='flex justify-end col-span-2'>
                <div className='menubtn'>
                  <button className='bg-white p-2 rounded-[100px] mr-[20px] text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
                </div>
              </div>
              <div className='btn1'>
              <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('home')}>HOME</button>
              </div>
              <div className='btn2'>
              <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('application')}>APPLICATION</button>
              </div>
            </div>
          </div>

        </div>
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
      </div>
    )
  }
  else if(page == 'application'){
    return (
      <div className=''>
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-[#0009] grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
            <h1 className='text-[40px]'>Cal-Muse</h1>
            <div className='w-full p-2'>
              application
            </div>

            <div className='navbar overflow-hidden'>
            <div className='menu'>
              <div onClick={showMenu} className='flex justify-end col-span-2'>
                <div className='menubtn'>
                  <button className='bg-white p-2 rounded-[100px] mr-[20px] text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
                </div>
              </div>
              <div className='btn1'>
              <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('home')}>HOME</button>
              </div>
              <div className='btn2'>
              <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('theory')}>THEORY</button>
              </div>
            </div>
          </div>

          </div>
        </div>
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
      </div>
    )
  }
  else {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-[#0009] p-2 rounded-2xl w-[70vw] h-[80vh]'>
          <h1 className='text-[40px]'>Cal-Muse</h1>
          <div className='navbar'>
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('home')}>HOME</button>
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('theory')}>THEORY</button>
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={()=>changePage('application')}>APPLICATION</button>
          </div>
        </div>
        <ParticlesBg type="square" bg={true} />
      </div>
    )
  }


}

export default App
