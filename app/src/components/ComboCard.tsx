import { Badge, Box, Card, Center, Flex, Link, Text } from "@chakra-ui/react";
import { Combo } from "../App";

type Props = { combo: Combo; };

function ComboCard({ combo }: Props) {

  return <Card.Root width="500px">
    <Card.Body>
      <Flex alignItems="center">
        <Box flex="1">
          <Badge textStyle="1xl">{combo.position}</Badge>
        </Box>
        <Box flex="1">
          <Center>
            <Link href={`/combo/${combo.id}`}>{combo.combo}</Link>
          </Center>
        </Box>
        <Box flex="1">

        </Box>
      </Flex>

    </Card.Body>
  </Card.Root >;
}


export default ComboCard;