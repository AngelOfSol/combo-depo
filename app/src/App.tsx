import { BrowserRouter, Route, Routes } from 'react-router';
import Browse from './pages/Browse';
import ComboElement, { ColorModeToggle } from './pages/Combo';
import Create from './pages/Create';
import { Box } from '@chakra-ui/react';
import AppHeader from './components/AppHeader';

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
      <Box hideBelow="md" pos="absolute" bottom="4" right="4">
        <ColorModeToggle />
      </Box>


      <BrowserRouter>
        <AppHeader></AppHeader>
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
