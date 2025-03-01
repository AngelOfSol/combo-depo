import { Stat } from "@chakra-ui/react";

type Props = {
  value: number,
  variant: 'grd' | 'meter' | 'damage',
};

function GameStat({ value, variant }: Props) {
  const label = {
    grd: "GRD",
    meter: "Meter",
    damage: "Damage",
  }[variant];
  const units = {
    grd: "blocks",
    meter: null,
    damage: null,

  }[variant];

  const formattedValue = {
    grd: (value > 0 ? "+" : "-") + value.toString(),
    damage: value.toString(),
    meter: (value / 100).toFixed(2),
  }[variant];


  return <Stat.Root>
    <Stat.Label>{label}</Stat.Label>
    <Stat.ValueText alignItems="baseline">
      {formattedValue}
      {units && <Stat.ValueUnit>{units}</Stat.ValueUnit>}

    </Stat.ValueText>
  </Stat.Root>;
}

export default GameStat;