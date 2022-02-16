import React, { useState } from 'react';
import Pikachu from './Pikachu';
import Bulbasaur from './Bulbasaur';
import './App.css';

function App() {
  const [view, setView] = useState<'Pikachu' | 'Bulbasaur'>('Pikachu');

  // 画面描画
  return (
    <div className="App">
      <div>
        <button onClick={() => setView('Pikachu')}>ピカチュウ</button>
        <button onClick={() => setView('Bulbasaur')}>フシギダネ</button>
      </div>
      {view === 'Pikachu' && (Pikachu())}
      {view === 'Bulbasaur' && (Bulbasaur())}
    </div>
  );
}

export default App;
