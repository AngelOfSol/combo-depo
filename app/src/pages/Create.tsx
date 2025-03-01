import { useEffect, useState } from 'react';
import { Combo } from '../typedefs/combo';



function Create() {
  const [combo, setCombo] = useState<Combo>();

  useEffect(() => {
    if ((window as any).combo) {
      setCombo((window as any).combo);
    }
  }, []);


  return (
    <>
      <h1>My create</h1>
      {combo && <><p>Test</p></>}
    </>
  );
}

export default Create;
