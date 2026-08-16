import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';

const token = /\[([^\]]+)\]\(([^)]+)\)/g;

type Props = {
  text: string;
};

export function RichText({ text }: Props) {
  const nodes = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(token);
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith('/')) {
      nodes.push(
        <Link key={`${href}-${match.index}`} href={href} className="text-teal">
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          className="text-teal"
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
}
