import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Browse from './pages/Browse';
import ComboElement from './pages/Combo';
import Create from './pages/Create';

export type Combo = {
  combo: string,
  damage: number,
  meter: number,
  position: string,
  video_link: string,
  id: number,
};


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Browse></Browse>
          }>
          </Route>
          <Route path="/create" element={
            <Create></Create>
          }>
          </Route>
          <Route path="/combo/:id" element={
            <ComboElement ></ComboElement>
          }>
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
