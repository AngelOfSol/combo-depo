import { useEffect, useState } from 'react';
import { Combo } from '../typedefs/combo';
import { Card, Field, Flex, Input, NumberInput } from '@chakra-ui/react';

type EditableCombo = {
  combo: string,
  description: string,
  damage?: number,
  grd?: number,
  meter?: number,
  position?: string,
};

function Create() {
  const [combo, setCombo] = useState<EditableCombo>({
    combo: "",
    description: "",
  });

  const setDamage = (damage: number | undefined) => {
    setCombo({ ...combo, damage });
  };


  const setMeter = (meter: number | undefined) => {
    setCombo({ ...combo, meter: meter ? meter * 100 : undefined });
  };

  console.log(combo.meter);

  useEffect(() => {
    if ((window as any).combo) {
      setCombo((window as any).combo);
    }
  }, []);


  return (
    <Flex padding={4} gap={4}>
      <Card.Root flex={1}>
        <Card.Header><Card.Title>Game Information</Card.Title></Card.Header>
        <Card.Body>
          <Field.Root required invalid>
            <Field.Label>
              Damage
              <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              min={0}
              max={13000}
              formatOptions={{ maximumFractionDigits: 0, useGrouping: false }}
              defaultValue={combo.damage?.toString()}
              onValueChange={(details) => {
                if (isNaN(details.valueAsNumber)) {
                  setDamage(undefined);
                } else {
                  setDamage(details.valueAsNumber);
                }
              }}
            >
              <NumberInput.Input />
            </NumberInput.Root>
            <Field.HelperText>Without damage bonuses such as Vorpal, Celestial, or Veil Off.</Field.HelperText>
          </Field.Root>
          <Field.Root required invalid>
            <Field.Label>
              Meter
              <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              min={-200}
              max={200}
              formatOptions={{ maximumFractionDigits: 2, useGrouping: false }}
              defaultValue={combo.meter ? (combo.meter / 100).toString() : ''}
              onValueChange={(details) => {
                // if (!/^[0-9]*(\.[0-9]{0,2})?$/.test(details.value)) {
                //   return;
                // }
                if (isNaN(details.valueAsNumber)) {
                  setMeter(undefined);
                } else {
                  setMeter(details.valueAsNumber);
                }
              }}
            >
              <NumberInput.Input />
            </NumberInput.Root>
            <Field.HelperText>Without damage bonuses such as Vorpal, Celestial, or Veil Off.</Field.HelperText>
          </Field.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root flex={1}>
        <Card.Body>
          Test
        </Card.Body>
      </Card.Root>
      <Card.Root flex={1}>
        <Card.Body>
          Test
        </Card.Body>
      </Card.Root>

    </Flex >
  );
}

export default Create;
