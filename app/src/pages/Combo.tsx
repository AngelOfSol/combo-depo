import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Card, Center, Checkbox, Flex, Heading, HStack, Link, Menu, Progress, RadioGroup, Tag, Text, VStack } from '@chakra-ui/react';
import { Combo } from '../typedefs/combo';
import GameStat from '../components/GameStat';
import CopyCombo from '../components/CopyCombo';


function ComboInner({ combo }: { combo: Combo; }) {
  return (
    <Flex flexDirection={{ base: "row", lgDown: "column" }} pt="20vh" gap={10} padding={8} flexWrap="wrap">
      <Box flex={1} >
        <Card.Root >
          <Card.Body>
            <Card.Title>
              Game Information
            </Card.Title>
            <GameStat size='lg' value={combo.damage} variant='damage' />
            <GameStat size='lg' value={combo.meter} variant='meter' />
            <GameStat size='lg' value={combo.grd} variant='grd' />
          </Card.Body>
          <Card.Footer flexDirection="column" alignItems="flex-start">
            <Heading>Tags</Heading>
            <Tag.Root size="lg"><Tag.Label>{combo.position}</Tag.Label></Tag.Root>
          </Card.Footer>
        </Card.Root>
      </Box>
      <VStack gap="8" flex={4}>
        <Box padding={8}>
          <Text textStyle="5xl">{combo.combo}</Text>
        </Box>

        <Card.Root width="100%">
          <Card.Body>
            <Card.Title>Annotations</Card.Title>
            <Card.Description>
              {combo.description}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </VStack>

      <Box flex={1}>
        <Card.Root >
          <Card.Body>
            <Card.Title>
              Metadata
            </Card.Title>
            <Card.Description>
              <Link textStyle="2xl" href={combo.video_link}>Video</Link>
            </Card.Description>
          </Card.Body>
          <Card.Footer flexDirection="column" alignItems="flex-start">
            <CopyCombo expanded comboId={combo.id} />
          </Card.Footer>
        </Card.Root>
      </Box>
    </Flex>
  );
}


function ComboPage() {
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
      {combo && <ComboInner combo={combo} />}
    </>
  );
}

export default ComboPage;
