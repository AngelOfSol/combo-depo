import { Button, Clipboard, Flex, Text, Tooltip } from "@chakra-ui/react";
import { LuCheck, LuClipboard } from "react-icons/lu";

type Props = { comboId: number; expanded?: boolean; };


function CopyCombo({ comboId, expanded }: Props) {
  const url = `${window.location.protocol}//${window.location.host}/combo/${comboId}`;

  if (expanded) {
    return (
      <Clipboard.Root value={url}>
        <Clipboard.Control>
          <Clipboard.Trigger asChild>
            <Button>
              <Flex flexDirection="row" gap={2}>
                {expanded && <Text>Copy a link to this combo!</Text>}
                <Clipboard.Indicator copied={<LuCheck size="24px" />}>
                  <LuClipboard size="24px" />
                </Clipboard.Indicator>
              </Flex>
            </Button>
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  } else {
    return (
      <Tooltip.Root openDelay={200} >
        <Tooltip.Trigger>
          <Clipboard.Root value={url}>
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
            Copy a link to this combo!
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    );
  }
}

export default CopyCombo;