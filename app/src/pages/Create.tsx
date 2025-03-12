import { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Field, Fieldset, Flex, Input, NumberInput, Textarea } from '@chakra-ui/react';
import { Position } from '../__generated__/Position';
import { useMutation } from '@tanstack/react-query';
import { Combo } from '../__generated__/Combo';
import { SubmittedCombo } from '../__generated__/SubmittedCombo';

type EditableCombo = {
  combo: string,
  description: string,
  video_link?: string,
  damage?: number,
  grd?: number,
  meter?: number,
  position?: Position,
};
type EditableComboKeys = (keyof EditableCombo);

const hasDefined = <T, K extends keyof T>(argument: T | Defined<T, K>, keys: K[]): argument is Defined<T, K> =>
  keys.every(key => argument[key] != null);

type Defined<T, K extends keyof T = keyof T> = {
  [P in K]-?: Exclude<T[P], undefined | null>
};

function useCreateCombo() {
  return useMutation({
    mutationFn: (combo: Combo) => {
      return fetch("/api/create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:
          "invalid" + JSON.stringify(combo) + "invalid json",
      }).then(response => response.json())
        .then(value => value as SubmittedCombo);
    }
  });
}


function Create() {
  const { mutate, data } = useCreateCombo();
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


  const setGrd = (grd: number | undefined) => {
    setCombo({ ...combo, grd: grd ? grd * 100 : undefined });
  };

  const setNotation = (notation: string) => {
    setCombo({ ...combo, combo: notation });
  };

  const setVideoLink = (link: string) => {
    const stripped = link.replace(/[\s]/g, "");
    setCombo({ ...combo, video_link: stripped !== '' ? stripped : undefined });
  };

  const setDescription = (desc: string) => {
    setCombo({ ...combo, description: desc });
  };
  const setPosition = (pos: Position) => {
    setCombo({ ...combo, position: pos });
  };

  const submitCombo = () => {
    const testProps: EditableComboKeys[] = ["damage", "grd", "meter", "position", "video_link"];
    if (hasDefined(combo, testProps)) {
      mutate(combo);
    } else {
      setCheckInvalid(true);
    }
  };

  const [checkInvalid, setCheckInvalid] = useState<boolean>(false);

  const validVideoLink = combo.video_link ? !!URL.parse(combo.video_link) : false;

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if ((window as any).combo) {
      setCombo((window as any).combo);
    }
  }, []);

  const positions: Position[] = ['Anywhere', 'Midscreen', 'BackToCorner', 'CloseCorner'];

  return (
    <Flex flexDirection={{ base: "row", mdDown: "column" }} padding={4} gap={4}>
      <Card.Root flex={1}>
        <Card.Header><Card.Title>Game Information</Card.Title></Card.Header>
        <Card.Body gap={4}>
          <Field.Root required >
            <Field.Label>
              Damage
              <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              min={0}
              max={13000}
              invalid={checkInvalid && !combo.damage}
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
          <Field.Root required >
            <Field.Label>
              Meter
              <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              min={-200}
              max={200}
              invalid={checkInvalid && !combo.meter}
              formatOptions={{ maximumFractionDigits: 2, useGrouping: false }}
              defaultValue={combo.meter ? (combo.meter / 100).toString() : ''}
              onValueChange={(details) => {
                // TODO: make a separate input component for numbers that handles fractionals correctly
                // right now if you type 12.349 and hit enter, with the input value rounds up which is incorrect

                if (isNaN(details.valueAsNumber)) {
                  setMeter(undefined);
                } else {
                  setMeter(details.valueAsNumber);
                }
              }}
            >
              <NumberInput.Input />
            </NumberInput.Root>
            <Field.HelperText>For combos that use meter, enter a negative number.</Field.HelperText>
          </Field.Root>
          <Field.Root required >
            <Field.Label>
              GRD
              <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              min={-12}
              max={12}
              step={0.25}
              invalid={checkInvalid && !combo.grd}
              formatOptions={{ maximumFractionDigits: 2, useGrouping: false, }}
              defaultValue={combo.grd ? (combo.grd / 100).toString() : ''}
              onValueChange={(details) => {
                // TODO: make a separate input component for numbers that handles fractionals correctly
                // right now if you type 12.349 and hit enter, with the input value rounds up which is incorrect

                if (isNaN(details.valueAsNumber)) {
                  setGrd(undefined);
                } else {
                  setGrd(details.valueAsNumber);
                }
              }}
            >
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger></NumberInput.IncrementTrigger>
                <NumberInput.DecrementTrigger></NumberInput.DecrementTrigger>
              </NumberInput.Control>
            </NumberInput.Root>
            <Field.HelperText>Measured in GRD blocks.</Field.HelperText>
          </Field.Root>
          <Fieldset.Root invalid={checkInvalid && !combo.position}>

            <Fieldset.Legend>Position</Fieldset.Legend>
            {
              positions.map(position =>
                <Checkbox.Root
                  key={position}
                  invalid={checkInvalid && !combo.position}
                  checked={combo.position === position}
                  onCheckedChange={(_) => setPosition(position)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{position}</Checkbox.Label>
                </Checkbox.Root>
              )
            }

          </Fieldset.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root flex={3}>
        <Card.Body >
          <Field.Root >
            <Field.Label>Combo Notation</Field.Label>
            <Textarea
              size="xl"
              value={combo.combo}
              onChange={(e) => setNotation(e.target.value)}
            />
            <Field.HelperText>Please use standard numpad notation.</Field.HelperText>
          </Field.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root flex={1}>
        <Card.Header><Card.Title>Metadata</Card.Title></Card.Header>
        <Card.Body>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea value={combo.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }} />
            <Field.HelperText></Field.HelperText>
          </Field.Root>
          <Field.Root required invalid={checkInvalid && !validVideoLink}>
            <Field.Label>Video Link <Field.RequiredIndicator /> </Field.Label>
            <Field.ErrorText>Invalid URL</Field.ErrorText>
            <Input
              placeholder='https://www.youtube.com/...'
              value={combo.video_link || ''}
              onChange={(e) => {
                setVideoLink(e.target.value);
              }}
            />
            <Field.HelperText>Please provide a video whenever possible.</Field.HelperText>
          </Field.Root>
        </Card.Body>
        <Card.Footer flexDirection="column" alignItems="flex-end">
          <Button onClick={(_) => submitCombo()}>Submit</Button>
        </Card.Footer>
      </Card.Root>

    </Flex >
  );
};

export default Create;
