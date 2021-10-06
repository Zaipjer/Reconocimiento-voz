import { useEffect, useState } from 'react';
import mic from './assets/images/mic.svg';
import micMute from './assets/images/mic-mute.svg';
import { IconButton, Typography } from '@mui/material';
import { NeonButton } from './components/StyledComponents';
import DisplayNotes from './components/DisplayNotes';

import "./App.css";

// Inicializacion del reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const micro = new SpeechRecognition();

// Configuración
micro.continuous = true;
micro.interimResults = true;
micro.lang = "es-MX";

function App() {

  const [isListening, setListening] = useState(false);
  const [note, setNote] = useState(null);

  const [savedNotestodo, setSavedNotestodo] = useState([]);
  const [savedNotesinprocess, setSavedNotesinprocess] = useState([]);
  const [savedNotesdone, setSavedNotesdone] = useState([]);

  const savedNotes = [
    {
      group: "todo",
      name: savedNotestodo
    }, {
      group: "inprocess",
      name: savedNotesinprocess
    }, {
      group: "done",
      name: savedNotesdone
    }
  ]

  useEffect(() => {
    handleListen();
    // eslint-disable-next-line
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      micro.start();
      micro.onend = () => {
        console.log("Continue ...");
        micro.start();
      }
    } else {
      micro.stop();
      micro.onend = () => {
        console.log("Stopped the microphone on Click");
      }
    }
    micro.onstart = () => {
      console.log("Mic is on");
    }
    micro.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript).join("");
      //console.log(transcript);
      setNote(transcript);
      micro.onerror = (event) => console.log(event.error);
    }
  }

  return (
    <>
      <div className="notes">
        <h1>Notas de voz</h1>
        <div className="microphone">
          <IconButton onClick={() => setListening((prevState => !prevState))}>
            <img className="mic-icon" src={isListening ? mic : micMute} alt="microfono" />
          </IconButton>
        </div>
        <NeonButton status="todo" disabled={!note} onClick={() => {
          setSavedNotestodo([...savedNotestodo, note]);
          setNote("");
          setListening(false);
        }}>
          To do
        </NeonButton>
        <NeonButton status="inprocess" disabled={!note} onClick={() => {
          setSavedNotesinprocess([...savedNotesinprocess, note]);
          setNote("");
          setListening(false);
        }}>
          In process
        </NeonButton>
        <NeonButton status="done" disabled={!note} onClick={() => {
          setSavedNotesdone([...savedNotesdone, note]);
          setNote("");
          setListening(false);
        }}>
          Done
        </NeonButton>
        <Typography variant="h4" component="h2" gutterBottom>
          {note}
        </Typography>
        <DisplayNotes data={savedNotes} />
      </div>
    </>
  );
}

export default App;
