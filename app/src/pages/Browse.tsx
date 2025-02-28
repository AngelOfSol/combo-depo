import { useEffect, useState } from 'react';
import { Combo } from '../App';



function Browse() {
  const [comboList, setComboList] = useState<Combo[]>([]);

  useEffect(() => {
    if ((window as any).comboList) {
      setComboList((window as any).comboList);
    }
  }, []);


  return (
    <>
      <h1>My list</h1>
      {comboList.map(combo => <>
        <div key={combo.id}>
          <a href={`/combo/${combo.id}`}>{combo.combo}</a>
        </div>
      </>)}
    </>
  );
}

export default Browse;
