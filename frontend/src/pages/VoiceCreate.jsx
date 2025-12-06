import { useState } from 'react';
import { createTask } from '../api/tasks';
import AppLayout from '../components/AppLayout';
import TaskForm from '../components/TaskForm';

function VoiceCreate() {
  const [transcript, setTranscript] = useState('');
  const [parsed, setParsed] = useState(null);
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  async function startListening() {
    if (!SpeechRecognition) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    setListening(true);

    recognition.onresult = async e => {
      const text = e.results[0][0].transcript;
      setTranscript(text);

      const res = await fetch('http://localhost:8000/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      }).then(r => r.json());

      setParsed(res.data);
      setListening(false);
    };

    recognition.onerror = e => {
      console.error('Speech recognition error', e);
      setListening(false);
    };

    recognition.start();
  }

  async function handleSubmit(data) {
    await createTask(data);
    window.location.href = '/';
  }

  return (
    <AppLayout>
      <h2 className="text-xl font-semibold mb-4">Voice Input</h2>

      <button
        onClick={startListening}
        className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        disabled={listening}
      >
        {listening ? 'Listening...' : '🎤 Start Speaking'}
      </button>

      {transcript && (
        <p className="mt-4 p-2 bg-gray-200 rounded">
          <strong>Transcript:</strong> {transcript}
        </p>
      )}

      {parsed && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Parsed Task</h3>
          <TaskForm
            key={JSON.stringify(parsed)}
            defaultValues={parsed}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </AppLayout>
  );
}

export default VoiceCreate;
