import * as Lucide from 'lucide-react';

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: string;
  className?: string;
  size?: number | string;
}

export function Icon({ name, className, size = 24, ...props }: IconProps) {
  const LucideIcon = (Lucide as any)[name];
  if (!LucideIcon) {
    // Return HelpCircle as a fallback if the icon is not found
    const Fallback = (Lucide as any)['HelpCircle'] || Lucide.HelpCircle;
    return <Fallback className={className} size={size} {...props} />;
  }
  return <LucideIcon className={className} size={size} {...props} />;
}
