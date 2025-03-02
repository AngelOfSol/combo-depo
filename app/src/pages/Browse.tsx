import { useEffect, useState } from 'react';
import { Center, VStack } from '@chakra-ui/react';
import ComboCard from '../components/ComboCard';
import { ComboWithId } from '../__generated__/ComboWithId';



function Browse() {
  const [comboList, setComboList] = useState<ComboWithId[]>([]);

  useEffect(() => {
    if ((window as any).comboList) {
      setComboList((window as any).comboList);
    }
  }, []);


  return (
    <Center padding="10px">
      <VStack width="1000px">
        {comboList.map(combo =>
          <ComboCard row={combo} key={combo.id}></ComboCard>
        )}
      </VStack>
    </Center>
  );
}

export default Browse;
