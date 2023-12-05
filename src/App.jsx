import { useState, useEffect } from 'react'
import ParticlesBg from 'particles-bg'
import MidiWriter from 'midi-writer-js';
import MidiPlayer from 'react-midi-player';
import Tilt from 'react-parallax-tilt';
import calculusPDF from "../calculusPDF.pdf";
import './App.css'

function App() {
  const [page, setPage] = useState('home');
  const [dlink, setDlink] = useState('');
  const [plink, setPlink] = useState('');
  const [ranNum, setranNum] = useState("problem");

  const [x, setx] = useState(2);
  const [y, sety] = useState(3);
  const [z, setz] = useState(4);

  function changePage(newpage) {
    setPage(newpage);
  }

  function showMenu() {
    let menu = document.getElementsByClassName('menu')[0];
    menu.classList.toggle('showmenu');
  }

  function inputall() {
    let inputx = document.getElementById('inputx').value;
    let inputy = document.getElementById('inputy').value;
    let inputz = document.getElementById('inputz').value;

    setx(inputx);
    sety(inputy);
    setz(inputz);

  }

  useEffect(() => {
    fetch('https://cal-muse-api.onrender.com/plot', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x: x,
        y: y,
        z: z,
      })
    }).then(res => res.json())
      .then(data => {
        if (data == "problem")
          console.log(data);
        else {
          let pianoNotes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"];
          let uno = [];
          let dos = [];
          // Generate a random number of notes between 4 and 6 for chosenNotes vector
          let numChosenNotes = data[0] % 3 + 4;
          let chosenNotes = new Array(numChosenNotes);
          for (let i = 0; i < numChosenNotes; i++) {
            let num = (data[i] + data[i + 1]) % pianoNotes.length;
            chosenNotes[i] = pianoNotes[num];
            pianoNotes.splice(num, 1);
          }
          let rules = {};
          // Generate rules map randomly
          for (let i = 0; i < numChosenNotes; i++) {
            let numAssociatedNotes = (data[i] + data[i + 5]) % 3 + 2; // Ensure at least two associated notes
            rules[chosenNotes[i]] = [];
            for (let j = 0; j < numAssociatedNotes; j++) {
              rules[chosenNotes[i]].push(chosenNotes[(data[j + i] + data[i + 5]) % numChosenNotes]);
            }
          }
          uno.push(chosenNotes[0]);
          for (let i = 0; i < 5; i++) {
            dos = []; // Clear dos array before updating it
            for (let j = 0; j < uno.length; j++) {
              dos = dos.concat(rules[uno[j]]);
            }
            uno = dos.slice();
          }
          let actualArray = uno.slice(0, 8);
          console.log(actualArray);

          // Uncommented section
          /*
          let frequencies = ["261.63", "277.18", "293.66", "311.13", "329.63", "349.23", "369.99", "392.00", "415.30", "440.00", "466.16", "493.88"];
          let notesToFrequencies = {};
          for (let i = 0; i < numChosenNotes; i++) {
              notesToFrequencies[chosenNotes[i]] = frequencies[i];
          }
          let maxDifferenceIndex = -1;
          let maxDifference = 0.0;
          for (let i = 1; i < uno.length; i++) {
              let frequency1 = parseFloat(notesToFrequencies[uno[i - 1]]);
              let frequency2 = parseFloat(notesToFrequencies[uno[i]]);
              let difference = Math.abs(frequency2 - frequency1);
          
              if (difference > maxDifference) {
                  maxDifference = difference;
                  maxDifferenceIndex = i;
              }
          }
          */
          const track = new MidiWriter.Track();
          track.addEvent([
            new MidiWriter.NoteEvent({ wait: '8', pitch: actualArray, duration: '8' }),
          ], function (event, index) {
            return { sequential: true };
          }
          );
          const write = new MidiWriter.Writer(track);
          var _data = atob(write.base64());
          setPlink(_data);
          setDlink(write.dataUri());
        }
      })
  }, [])




  function generate() {

    setPlink('new');
    fetch('https://cal-muse-api.onrender.com/plot', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x: x,
        y: y,
        z: z,
      })
    }).then(res => res.json())
      .then(data => {
        setranNum(data);
        console.log(data);
        if (data == "problem")
        {
          setPlink(data);
          console.log(data);
        }
        else {
          console.log(data);
          let pianoNotes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"];
          let uno = [];
          let dos = [];
          // Generate a random number of notes between 4 and 6 for chosenNotes vector
          let numChosenNotes = data[0] % 3 + 4;
          let chosenNotes = new Array(numChosenNotes);
          for (let i = 0; i < numChosenNotes; i++) {
            let num = (data[i] + data[i + 1]) % pianoNotes.length;
            chosenNotes[i] = pianoNotes[num];
            pianoNotes.splice(num, 1);
          }
          let rules = {};
          // Generate rules map randomly
          for (let i = 0; i < numChosenNotes; i++) {
            let numAssociatedNotes = (data[i] + data[i + 5]) % 3 + 2; // Ensure at least two associated notes
            rules[chosenNotes[i]] = [];
            for (let j = 0; j < numAssociatedNotes; j++) {
              rules[chosenNotes[i]].push(chosenNotes[(data[j + i] + data[i + 5]) % numChosenNotes]);
            }
          }
          uno.push(chosenNotes[0]);
          for (let i = 0; i < 5; i++) {
            dos = []; // Clear dos array before updating it
            for (let j = 0; j < uno.length; j++) {
              dos = dos.concat(rules[uno[j]]);
            }
            uno = dos.slice();
          }
          let actualArray = uno.slice(0, 8);
          console.log(actualArray);

          // Uncommented section
          /*
          let frequencies = ["261.63", "277.18", "293.66", "311.13", "329.63", "349.23", "369.99", "392.00", "415.30", "440.00", "466.16", "493.88"];
          let notesToFrequencies = {};
          for (let i = 0; i < numChosenNotes; i++) {
              notesToFrequencies[chosenNotes[i]] = frequencies[i];
          }
          let maxDifferenceIndex = -1;
          let maxDifference = 0.0;
          for (let i = 1; i < uno.length; i++) {
              let frequency1 = parseFloat(notesToFrequencies[uno[i - 1]]);
              let frequency2 = parseFloat(notesToFrequencies[uno[i]]);
              let difference = Math.abs(frequency2 - frequency1);
          
              if (difference > maxDifference) {
                  maxDifference = difference;
                  maxDifferenceIndex = i;
              }
          }
          */
          const track = new MidiWriter.Track();
          track.addEvent([
            new MidiWriter.NoteEvent({ pitch: actualArray, duration: '8' }),
            new MidiWriter.NoteEvent({ pitch: actualArray, duration: '8' }),
            new MidiWriter.NoteEvent({ pitch: actualArray, duration: '8' }),
            new MidiWriter.NoteEvent({ pitch: actualArray, duration: '8' }),
          ], function (event, index) {
            return { sequential: true };
          } 
          );
          const write = new MidiWriter.Writer(track);
          var _data = atob(write.base64());
          setPlink(_data);
          setDlink(write.dataUri());
        }
      })
  }



  if (page == 'home') {
    return (
      <div className=''>
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-[#0009] grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
            <h1 className='text-[3rem]'>Cal-Muse</h1>
            <div className='w-full p-2 overflow-y-auto'>
              <div className='details'>
                <h1 className='text-[2rem]'>The Beauty in Chaos</h1>
                <div class="hor">
                  <div class="horm2"></div>
                </div>
                  <p className=''>We would like to thank Prof. Manish Gupta, for guiding us throughout our project journey and Prof. Mukesh Tiwari for introducing us to Chaotic
                  Systems.</p>
                <h1 className='pt-4 text-[2rem]'>GROUP MEMBERS</h1>
                <div class="hor">
                  <div class="horm2"></div>
                </div>
                <ul>
                  <li>Dhruv Jain - 202301272</li>
                  <li>Guru Vyas - 202301196</li>
                  <li>Jas Mehta - 202301432</li>
                  <li>Parshv Joshi - 202301039</li>
                  <li>Siddharth Rambhia - 202301072</li>
                  <li>Yug Savalia - 202301263</li>
                  <li>Yug Tejani - 202301487</li>
                </ul>
              </div>
            </div>
            <div className='navbar overflow-hidden'>
              <div className='menu'>
                <div onClick={showMenu} className='flex justify-end col-span-2'>
                  <div className='menubtn rounded-2xl'>
                    <button className='bg-white custom-box-shadow p-2 rounded-[100px] mr-[20px] text-black'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                  </div>
                </div>
                <div className='btn1'>
                  <button className='bg-blue-500 custom-box-shadow p-1 m-2 rounded-md' onClick={() => changePage('theory')}>THEORY</button>
                </div>
                <div className='btn2'>
                  <button className='bg-blue-500 custom-box-shadow p-1 m-2 rounded-md' onClick={() => changePage('application')}>APPLICATION</button>
                </div>
              </div>
            </div>
          </div>
      </div>
        <ParticlesBg type="square" bg={true} />
      </div>
    )
  }
  else if (page == 'theory') {
    return (
      <div className='flex justify-center items-center h-screen'>a
        <div className='bg-[#0009] grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
          <h1 className='text-[3rem]'>Cal-Muse</h1>
          <div className='w-full p-2 overflow-y-auto details'>
            <h1 className='text-[2rem]'>The Beauty in Chaos</h1>
            <div class="hor">
              <div class="horm2"></div>
            </div>
            <p>
              In this project report, we first explain chaotic systems and chaotic attractors, and
              explain how chaotic systems can be used as entropy seeds to Physical Unclonable
              Functions (PUFs) to act as True Random Number Generators (TRNG). We then
              implement a random number generator in Python, using Lorenz Attractor
              and XOR-Arbiter PUFs and use it, coupled with our understanding of Music
              Theory, to generate a musical note.
            </p>
            <div className='pt-6'>
              <a className='text-blue-500 underline' href="https://drive.google.com/file/d/1KTkvWgphuLwyVB9uZLm6VYQB0sVyft22/view?usp=drive_link">Explanation video - The Beauty in Choas</a>
              <br></br>
              <a className='text-blue-500 underline' download href={calculusPDF}>PDF</a>            
            </div>
          </div>

          <div className='navbar overflow-hidden'>
            <div className='menu'>
              <div onClick={showMenu} className='flex justify-end col-span-2'>
                <div className='menubtn'>
                  <button className='bg-white custom-box-shadow p-2 rounded-[100px] mr-[20px] text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                  </button>
                </div>
              </div>
              <div className='btn1'>
                <button className='bg-blue-500 custom-box-shadow p-1 m-2 rounded-md' onClick={() => changePage('home')}>HOME</button>
              </div>
              <div className='btn2'>
                <button className='bg-blue-500 custom-box-shadow p-1 m-2 rounded-md' onClick={() => changePage('application')}>APPLICATION</button>
              </div>
            </div>
          </div>

        </div>
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
      </div>
    )
  }
  else if (page == 'application') {
    return (
      <div className=''>
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-[#0009] overflow-y-auto overflow-x-hidden grider grid p-2 rounded-2xl w-[70vw] h-[80vh]'>
            <h1 className=' text-[3rem]'>Cal-Muse</h1>
            <div className='w-full p-2 overflow-y-auto'>
              <div className='details'>Enter initial (x,y,z) values of Lorenz Attractor</div>
              <div className='details'>First time it might take a bit long please wait</div>
              <div className='w-full p-2'>
                <input onChange={inputall} id='inputx' className='p-1 text-center rounded-2xl' type="number" placeholder="Enter x"></input>
              </div>
              <div className='w-full p-2'>
                <input onChange={inputall} id='inputy' className='p-1 text-center rounded-2xl' type="number" placeholder="Enter y"></input>
              </div>
              <div className='w-full p-2'>
                <input onChange={inputall} id='inputz' className='p-1 text-center rounded-2xl' type="number" placeholder="Enter z"></input>
              </div>
              {/* <div className='w-full p-2'>
                <input onChange={inputall} id='inputk' className='p-1 text-center rounded-2xl' type="number" placeholder="Enter k"></input>
              </div> */}

              <button className=' bg-blue-500 custom-box-shadow p-1 m-3 rounded-md' onClick={generate}>GENERATE</button>
              <div class="hor">
                <div class="horm"></div>
              </div>
              <div className='m-4 mb-0 flex flex-wrap justify-center'>
                <div className='text-[1.5rem] details mr-8'>MIDI Song :</div>
                {
                  (plink == '' || plink == 'problem')
                    ? <div>
                      {
                        (plink == 'problem')
                          ? <div className='text-[1.2rem] details m-2'>Regenerate after a minute or two please</div>
                          : <div className='text-[1.2rem] details m-2'>Wait for few seconds before Regenerating please</div>
                      }
                    </div>
                    : <MidiPlayer data={plink} />
                }
              </div >
              <div>
                {
                  (plink == "new") 
                    ? <div className='flex p-2 justify-center'>
                        <div className='loader'></div>
                      </div>
                    : <div></div>
                }
              </div>
              <div class="hor">
                <div class="horm"></div>
              </div>
              <div className='m-6'>
                {
                  (dlink == '') ? <div></div> : <a className=' bg-blue-500 custom-box-shadow p-1 m-2 rounded-md' href={dlink}>DOWNLOAD</a>
                }
              </div>
            </div>

            <div className='navbar overflow-hidden'>
              <div className='menu'>
                <div onClick={showMenu} className='flex justify-end col-span-2'>
                  <div className='menubtn'>
                    <button className='bg-white custom-box-shadow p-2 rounded-[100px] mr-[20px] text-black'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                  </div>
                </div>
                <div className='btn1'>
                  <button className='text-white custom-box-shadow bg-blue-500 p-1 m-2 rounded-md' onClick={() => changePage('home')}>HOME</button>
                </div>
                <div className='btn2'>
                  <button className='text-white custom-box-shadow bg-blue-500 p-1 m-2 rounded-md' onClick={() => changePage('theory')}>THEORY</button>
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
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={() => changePage('home')}>HOME</button>
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={() => changePage('theory')}>THEORY</button>
            <button className='bg-blue-500 p-1 m-2 rounded-md' onClick={() => changePage('application')}>APPLICATION</button>
          </div>
        </div>
        <ParticlesBg type="square" bg={true} />
      </div>
    )
  }
}

export default App
