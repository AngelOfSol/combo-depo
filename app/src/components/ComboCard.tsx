import { Badge, Box, Button, Card, Center, Clipboard, Flex, Link, Stat, Tag, Text, Tooltip } from "@chakra-ui/react";
import { Combo } from "../App";
import { LuCheck, LuChevronRight, LuClipboard } from "react-icons/lu";
import GameStat from "./GameStat";

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
              <GameStat value={1.5} variant="grd" />

            </Flex>
          </Center>
        </Box>
        <Box flex="3">
          <Center>
            <Link href={`/combo/${combo.id}`}>{combo.combo}</Link>
          </Center>
        </Box>
        <Flex flex="1" justifyContent="flex-end">
          <Box>
            <Tooltip.Root openDelay={200} >
              <Tooltip.Trigger>
                <Clipboard.Root value={`${window.location.protocol}//${window.location.host}/combo/${combo.id}`}>
                  <Clipboard.Control>
                    <Clipboard.Trigger>
                      <Clipboard.Indicator copied={<LuCheck size="24px" />}>
                        <LuClipboard size="24px" />
                      </Clipboard.Indicator>
                    </Clipboard.Trigger>
                  </Clipboard.Control>
                </Clipboard.Root>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>
                  <Tooltip.Arrow>
                    <Tooltip.ArrowTip />
                  </Tooltip.Arrow>
                  <Text>
                    Copy a link to this combo!
                  </Text>
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip.Root>
          </Box>
        </Flex>
      </Flex>

    </Card.Body>
  </Card.Root >;
}


export default ComboCard;