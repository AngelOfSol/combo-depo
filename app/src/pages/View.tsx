import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Card, Flex, Heading, Link, Tag, Text, VStack } from '@chakra-ui/react';
import GameStat from '../components/GameStat';
import CopyCombo from '../components/CopyCombo';
import { ComboWithId } from '../__generated__/ComboWithId';


function ComboInner({ row }: { row: ComboWithId; }) {
  const combo = row.combo;
  return (
    <Flex flexDirection={{ base: "row", mdDown: "column" }} gap={10} padding={8} flexWrap="wrap">
      <Box flex={1}>
        <Card.Root>
          <Card.Body>
            <Card.Title>
              Game Information
            </Card.Title>
            <Flex flexDirection="column">
              <GameStat size='lg' value={combo.damage} variant='damage' />
              <GameStat size='lg' value={combo.meter} variant='meter' />
              <GameStat size='lg' value={combo.grd} variant='grd' />
            </Flex>
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
            <Card.Description >
              {combo.description}
            </Card.Description>
            <Link textStyle="1xl" href={combo.video_link}>Link to Video Reproduction</Link>
          </Card.Body>
          <Card.Footer flexDirection="column" alignItems="flex-start">
            <CopyCombo expanded row={row} />
          </Card.Footer>
        </Card.Root>
      </Box>
    </Flex>
  );
}


function ComboPage() {
  const [combo, setCombo] = useState<ComboWithId | null>(null);
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
      {combo && <ComboInner row={combo} />}
    </>
  );
}

export default ComboPage;
