import { useEffect, useState } from 'react';
import { Combo } from '../App';
import { useParams } from 'react-router';



function ComboElement() {
  const [combo, setCombo] = useState<Combo | null>(null);
  const id_param = useParams().id;

  useEffect(() => {
    if ((window as any).combo) {
      setCombo((window as any).combo);
    } else {
      console.log(`TODO: query ${id_param} as a combo id`);
    }
  }, []);


  return (
    <>
      <h1>My combo</h1>
      {combo &&
        <>
          <p>{combo.combo}</p>
          <p>Damage: {combo.damage}</p>
          <p>Meter: {combo.meter}</p>
          <p>Position: {combo.position}</p>
          <a href={combo.video_link} target="_blank">Video Link</a>
          <p>id: {combo.id}</p>
        </>
      }
    </>
  );
}

export default ComboElement;
