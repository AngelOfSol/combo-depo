import { Box, Heading, HStack, Link } from "@chakra-ui/react";

function AppHeader() {
  return <>
    <Box>
      <Box>
        <Box layerStyle="fill.solid" padding="8px">
          <HStack>
            <Link href="/" unstyled >
              <Heading textStyle="3xl" >ComboDepot</Heading>
            </Link>

            <Link href="/create"  >
              <Heading textStyle="3xl" >Add Combo</Heading>
            </Link>

          </HStack>
        </Box>
      </Box>
    </Box>
  </>;
}

export default AppHeader;