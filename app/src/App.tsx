import { BrowserRouter, Route, Routes } from 'react-router';
import Browse from './pages/Browse';
import ComboPage from './pages/Combo';
import Create from './pages/Create';
import { Box, Flex } from '@chakra-ui/react';
import AppHeader from './components/AppHeader';
import { ColorModeToggle } from './components/ColorModeToggle';


function App() {

  return (
    <>
      <Box hideBelow="md" pos="absolute" bottom="4" left="4">
        <ColorModeToggle />
      </Box>


      <BrowserRouter>
        <Flex flexDirection="column" height="100vh ">
          <AppHeader></AppHeader>
          <Box flex="1" overflow="auto">
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
                <ComboPage ></ComboPage>
              }>
              </Route>
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter >
    </>
  );
}

export default App;
