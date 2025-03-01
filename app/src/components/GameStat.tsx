import { Stat } from "@chakra-ui/react";

type Props = {
  value: number,
  variant: 'grd' | 'meter' | 'damage',
  size?: 'sm' | 'md' | 'lg',
};

function GameStat({ value, variant, size }: Props) {
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
    grd: (value >= 0 ? value <= 0 ? "" : "+" : "-") + Math.abs(value / 100).toString(),
    damage: value.toString(),
    meter: (value / 100).toFixed(2),
  }[variant];


  return <Stat.Root size={size || 'md'}>
    <Stat.Label>{label}</Stat.Label>
    <Stat.ValueText alignItems="baseline">
      {formattedValue}
      {units && <Stat.ValueUnit>{units}</Stat.ValueUnit>}

    </Stat.ValueText>
  </Stat.Root>;
}

export default GameStat;