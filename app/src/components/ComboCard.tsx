import { Box, Card, Center, Clipboard, Flex, Link, Tag, Text, Tooltip } from "@chakra-ui/react";
import { LuCheck, LuClipboard } from "react-icons/lu";
import GameStat from "./GameStat";
import { Combo } from "../typedefs/combo";
import CopyCombo from "./CopyCombo";

type Props = { combo: Combo; };

function ComboCard({ combo }: Props) {



  return <Card.Root width="100%">
    <Card.Body>
      <Flex flexDirection={{ base: "row", mdDown: "column" }} gap={5} alignItems="center">
        <Box flex="1">
          <Tag.Root size="lg"><Tag.Label>{combo.position}</Tag.Label></Tag.Root>
        </Box>
        <Box flex="2" >
          <Center>
            <Flex flexDirection="row" gap={4}>


              <GameStat value={combo.damage} variant="damage" />
              <GameStat value={combo.meter} variant="meter" />
              <GameStat value={combo.grd} variant="grd" />

            </Flex>
          </Center>
        </Box>
        <Box flex="3">
          <Center>
            <Link href={`/combo/${combo.id}`}>{combo.combo}</Link>
          </Center>
        </Box>
        <Flex flex="1" justifyContent="flex-end">
          <CopyCombo comboId={combo.id} />
        </Flex>
      </Flex>

    </Card.Body>
  </Card.Root >;
}


export default ComboCard;