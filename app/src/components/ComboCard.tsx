import { Box, Card, Center, Flex, Link, Tag, Text } from "@chakra-ui/react";
import { Combo } from "../App";
import { LuChevronRight } from "react-icons/lu";

type Props = { combo: Combo; };

function ComboCard({ combo }: Props) {

  return <Card.Root width="100%">
    <Card.Body>
      <Flex flexDirection="row" alignItems="center">
        <Box flex="1">
          <Tag.Root ><Tag.Label>{combo.position}</Tag.Label></Tag.Root>
        </Box>
        <Box flex="2" >
          <Center>
            <Flex flexDirection="column">
              <Text>Damage: {combo.damage}</Text>
              <Text>Meter: {combo.meter}</Text>
            </Flex>
          </Center>
        </Box>
        <Box flex="3">
          <Center>
            <Link href={`/combo/${combo.id}`}>{combo.combo}</Link>
          </Center>
        </Box>
        <Flex flex="1" justifyContent="flex-end">
          <Link href={combo.video_link} target="_blank">Video <LuChevronRight /></Link>
        </Flex>
      </Flex>

    </Card.Body>
  </Card.Root >;
}


export default ComboCard;