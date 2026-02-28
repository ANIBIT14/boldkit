import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  TeamGrid,
  TeamList,
  TeamLargePhotos,
  TeamCompact,
} from '@/components/blocks/marketing/team-section'

const sampleMembers = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    bio: 'Leading the vision for bold design.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Mike Johnson',
    role: 'CTO',
    bio: 'Building the technical foundation.',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Emma Wilson',
    role: 'Design Lead',
    bio: 'Crafting the neubrutalism aesthetic.',
    social: { twitter: '#' },
  },
  {
    name: 'Alex Rivera',
    role: 'Developer',
    bio: 'Making components pixel-perfect.',
    social: { github: '#' },
  },
]

const variants = [
  {
    name: 'Grid',
    description: 'Team members in card grid with avatars and social links.',
    preview: (
      <TeamGrid
        title="Meet Our Team"
        subtitle="The People"
        description="The talented individuals behind BoldKit."
        members={sampleMembers}
        columns={4}
      />
    ),
    reactCode: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.Grid
  title="Meet Our Team"
  subtitle="The People"
  description="The talented individuals behind BoldKit."
  members={[
    {
      name: 'Sarah Chen',
      role: 'CEO',
      avatar: '/avatar.jpg',
      bio: 'Leading the vision.',
      social: { twitter: '#', linkedin: '#' },
    },
  ]}
  columns={4} // 2 | 3 | 4
/>`,
    vueCode: `<script setup lang="ts">
import { TeamSection } from '@/components/blocks/marketing'

const members = [
  { name: 'Sarah Chen', role: 'CEO', social: { twitter: '#' } },
]
</script>

<template>
  <TeamSection variant="grid" title="Meet Our Team" :members="members" :columns="4" />
</template>`,
  },
  {
    name: 'List',
    description: 'Compact list view of team members.',
    preview: (
      <TeamList
        title="Our Team"
        members={sampleMembers.slice(0, 3)}
      />
    ),
    reactCode: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.List
  title="Our Team"
  members={members}
/>`,
    vueCode: `<template>
  <TeamSection variant="list" title="Our Team" :members="members" />
</template>`,
  },
  {
    name: 'LargePhotos',
    description: 'Full-size photos with overlay social links.',
    preview: (
      <TeamLargePhotos
        title="Leadership Team"
        subtitle="Meet the Founders"
        members={sampleMembers.slice(0, 3)}
      />
    ),
    reactCode: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.LargePhotos
  title="Leadership Team"
  subtitle="Meet the Founders"
  members={members}
/>`,
    vueCode: `<template>
  <TeamSection variant="largePhotos" title="Leadership Team" :members="members" />
</template>`,
  },
  {
    name: 'Compact',
    description: 'Minimal avatar-based team display.',
    preview: (
      <TeamCompact
        title="Our Team"
        description="A small but mighty team building the future of UI."
        members={sampleMembers}
      />
    ),
    reactCode: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.Compact
  title="Our Team"
  description="A small but mighty team."
  members={members}
/>`,
    vueCode: `<template>
  <TeamSection variant="compact" title="Our Team" :members="members" />
</template>`,
  },
]

export function TeamSectionDoc() {
  return (
    <BlockDoc
      name="Team Section"
      description="Display team members with various layouts including card grids, compact lists, large photo galleries, and minimal avatar-based displays."
      category="marketing"
      variants={variants}
    />
  )
}

export default TeamSectionDoc
