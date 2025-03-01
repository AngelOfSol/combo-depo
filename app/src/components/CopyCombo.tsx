import { Box, Button, Clipboard, Flex, HStack, Text, Tooltip } from "@chakra-ui/react";
import { LuCheck, LuClipboard, LuLink } from "react-icons/lu";
import { Combo } from "../typedefs/combo";

type Props = { combo: Combo; expanded?: boolean; };


function CopyCombo({ combo, expanded }: Props) {
  const url = `${window.location.protocol}//${window.location.host}/combo/${combo.id}`;

  if (expanded) {
    return (
      <Flex flexDirection="column" gap={4}>
        <Clipboard.Root value={url}>
          <Clipboard.Control>
            <Clipboard.Trigger asChild>
              <Button width="100%">
                <Flex flexDirection="row" gap={2}>
                  <Text>Copy a link to this combo!</Text>
                  <Clipboard.Indicator copied={<LuCheck size="24px" />}>
                    <LuLink size="24px" />
                  </Clipboard.Indicator>
                </Flex>
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>

        <Clipboard.Root value={url}>
          <Clipboard.Control>
            <Clipboard.Trigger asChild>
              <Button>
                <Flex flexDirection="row" gap={2}>
                  <Text>Copy the notation for this combo!</Text>
                  <Clipboard.Indicator copied={<LuCheck size="24px" />}>
                    <LuClipboard size="24px" />
                  </Clipboard.Indicator>
                </Flex>
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>

      </Flex>
    );
  } else {
    return (
      <Flex flexDirection="row" gap={4}>
        <Box >
          <Tooltip.Root openDelay={200} >
            <Tooltip.Trigger>
              <Clipboard.Root value={url}>
                <Clipboard.Control>
                  <Clipboard.Trigger asChild>
                    <Clipboard.Indicator copied={<LuCheck size="24px" />}>
                      <LuLink size="24px" />
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
                Copy the notation for this combo!
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>

        </Box >
        <Box >
          <Tooltip.Root openDelay={200} >
            <Tooltip.Trigger>
              <Clipboard.Root value={combo.combo}>
                <Clipboard.Control>
                  <Clipboard.Trigger asChild>
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
                Copy the notation for this combo!
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>

        </Box>
      </Flex>
    );
  }
}

export default CopyCombo;;