import { socialLinks } from '@/content/social';

type Props = {
  className?: string;
};

export function SocialLinks({
  className = 'mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm',
}: Props) {
  return (
    <ul className={className}>
      {socialLinks.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-teal"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
