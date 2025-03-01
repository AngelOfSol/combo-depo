import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Checkbox, Heading, HStack, Link, Progress, RadioGroup, VStack } from '@chakra-ui/react';
import { Combo } from '../typedefs/combo';



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

      <Box textAlign="center" fontSize="xl" pt="30vh">
        <VStack gap="8">
          <Heading size="2xl" letterSpacing="tight">
            Welcome to Chakra UI v3 + Vite
          </Heading>
          <div>
            <h1>My combo</h1>
            {combo &&
              <>
                <p>{combo.combo}</p>
                <p>Damage: {combo.damage}</p>
                <p>Meter: {(combo.meter / 100).toFixed(2)}</p>
                <p>Position: {combo.position}</p>
                <Link target='_blank' href={combo.video_link}>Test Link</Link>
                <Button>Test</Button>
                <p>id: {combo.id}</p>

              </>
            }
          </div>
          <HStack gap="10">
            <Checkbox.Root defaultChecked>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>

            <RadioGroup.Root display="inline-flex" defaultValue="1">
              <RadioGroup.Item value="1" mr="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemControl>
                  <RadioGroup.ItemIndicator />
                </RadioGroup.ItemControl>
                <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemControl>
                  <RadioGroup.ItemIndicator />
                </RadioGroup.ItemControl>
                <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </HStack>

          <Progress.Root width="300px" value={65} striped>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>

          <HStack>
            <Button>Let's go!</Button>
            <Button variant="outline">bun install @chakra-ui/react</Button>
          </HStack>
        </VStack>

      </Box>
    </>
  );
}

export default ComboElement;
