import { useEffect, useState } from 'react';
import { Center, VStack } from '@chakra-ui/react';
import ComboCard from '../components/ComboCard';
import { Combo } from '../typedefs/combo';



function Browse() {
  const [comboList, setComboList] = useState<Combo[]>([]);

  useEffect(() => {
    if ((window as any).comboList) {
      setComboList((window as any).comboList);
    }
  }, []);


  return (
    <Center>
      <VStack width="1000px">
        {comboList.map(combo =>
          <ComboCard combo={combo} key={combo.id}></ComboCard>
        )}
      </VStack>
    </Center>
  );
}

export default Browse;
