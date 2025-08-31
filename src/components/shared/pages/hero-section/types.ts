export interface ButtonProps {
  text: string
  href: string
}

export interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
}
