import { useEffect, useState } from 'react';
import { Combo } from '../App';
import { Center, VStack } from '@chakra-ui/react';
import ComboCard from '../components/ComboCard';



function Browse() {
  const [comboList, setComboList] = useState<Combo[]>([]);

  useEffect(() => {
    if ((window as any).comboList) {
      setComboList((window as any).comboList);
    }
  }, []);


  return (
    <Center>
      <VStack>
        {comboList.map(combo =>
          <ComboCard combo={combo} key={combo.id}></ComboCard>
        )}
      </VStack>
    </Center>
  );
}

export default Browse;
