import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'

export interface TeamMember {
  name: string
  role: string
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
}

// ============================================================================
// TEAM VARIANT 1: Grid with Cards
// ============================================================================
export interface TeamGridProps {
  title?: string
  subtitle?: string
  description?: string
  members: TeamMember[]
  columns?: 2 | 3 | 4
  className?: string
}

export function TeamGrid({
  title,
  subtitle,
  description,
  members,
  columns = 4,
  className,
}: TeamGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle || description) && (
          <div className="text-center mb-12 space-y-4">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-6', gridCols[columns])}>
          {members.map((member, index) => (
            <Card
              key={index}
              className="group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
            >
              <CardContent className="p-6 text-center space-y-4">
                <Avatar className="h-24 w-24 mx-auto border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-black uppercase text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {member.role}
                  </p>
                </div>

                {member.bio && (
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                )}

                {member.social && (
                  <div className="flex justify-center gap-2">
                    {member.social.twitter && (
                      <SocialLink href={member.social.twitter} icon={<Twitter className="h-4 w-4" />} />
                    )}
                    {member.social.linkedin && (
                      <SocialLink href={member.social.linkedin} icon={<Linkedin className="h-4 w-4" />} />
                    )}
                    {member.social.github && (
                      <SocialLink href={member.social.github} icon={<Github className="h-4 w-4" />} />
                    )}
                    {member.social.email && (
                      <SocialLink href={`mailto:${member.social.email}`} icon={<Mail className="h-4 w-4" />} />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEAM VARIANT 2: Simple List
// ============================================================================
export interface TeamListProps {
  title?: string
  members: TeamMember[]
  className?: string
}

export function TeamList({
  title,
  members,
  className,
}: TeamListProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center mb-12">
            {title}
          </h2>
        )}

        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
            >
              <Avatar className="h-16 w-16 border-2 border-foreground">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-black uppercase">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>

              {member.social && (
                <div className="flex gap-2">
                  {member.social.twitter && (
                    <SocialLink href={member.social.twitter} icon={<Twitter className="h-4 w-4" />} />
                  )}
                  {member.social.linkedin && (
                    <SocialLink href={member.social.linkedin} icon={<Linkedin className="h-4 w-4" />} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEAM VARIANT 3: With Large Photos
// ============================================================================
export interface TeamLargePhotosProps {
  title?: string
  subtitle?: string
  members: TeamMember[]
  className?: string
}

export function TeamLargePhotos({
  title,
  subtitle,
  members,
  className,
}: TeamLargePhotosProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-2">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="group">
              <div className="relative border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden mb-4 group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-muted flex items-center justify-center">
                    <span className="text-6xl font-black text-muted-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}

                {member.social && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-center gap-2">
                      {member.social.twitter && (
                        <SocialLink href={member.social.twitter} icon={<Twitter className="h-4 w-4" />} light />
                      )}
                      {member.social.linkedin && (
                        <SocialLink href={member.social.linkedin} icon={<Linkedin className="h-4 w-4" />} light />
                      )}
                      {member.social.github && (
                        <SocialLink href={member.social.github} icon={<Github className="h-4 w-4" />} light />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <h3 className="font-black uppercase text-xl">{member.name}</h3>
              <p className="text-muted-foreground font-medium">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEAM VARIANT 4: Compact Avatars
// ============================================================================
export interface TeamCompactProps {
  title?: string
  description?: string
  members: TeamMember[]
  className?: string
}

export function TeamCompact({
  title,
  description,
  members,
  className,
}: TeamCompactProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {(title || description) && (
          <div className="space-y-4">
            {title && (
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground font-medium">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-2 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="font-bold text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="font-bold text-sm">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Helper Components
// ============================================================================
function SocialLink({
  href,
  icon,
  light = false,
}: {
  href: string
  icon: React.ReactNode
  light?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'w-8 h-8 flex items-center justify-center border-2 border-foreground transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        light ? 'bg-background text-foreground' : 'bg-muted hover:bg-primary hover:text-primary-foreground'
      )}
    >
      {icon}
    </a>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const TeamSection = {
  Grid: TeamGrid,
  List: TeamList,
  LargePhotos: TeamLargePhotos,
  Compact: TeamCompact,
}
