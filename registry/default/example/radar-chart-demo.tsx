import { RadarChart } from '@/components/ui/radar-chart'

const data = [
  { subject: 'Speed', player1: 80, player2: 65 },
  { subject: 'Strength', player1: 70, player2: 85 },
  { subject: 'Accuracy', player1: 90, player2: 75 },
  { subject: 'Stamina', player1: 85, player2: 70 },
  { subject: 'Agility', player1: 75, player2: 90 },
]

const config = {
  player1: { label: 'Player 1', color: 'hsl(var(--primary))' },
  player2: { label: 'Player 2', color: 'hsl(var(--secondary))' },
}

export default function Example() {
  return (
    <RadarChart
      data={data}
      dataKeys={['player1', 'player2']}
      config={config}
    />
  )
}