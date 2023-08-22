import Link from "next/link";
import React, { FC } from "react";

interface MarkdownLiteProps {
  text: string;
}

// this component is only to make sure the link of the markdown looks good
const MarkdownLite: FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;

    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    lastIndex = matchEnd;

    parts.push(
      <Link
        key={linkUrl}
        target="_blank"
        href={linkUrl}
        rel="noopener noreferrer"
        className="break-words underline underline-offset-2 text-blue-500"
      >
        {linkText}
      </Link>
    );
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => (
        <p key={index} className="break-words whitespace-break-spaces">
          {part}
        </p>
      ))}
    </>
  );
};

export default MarkdownLite;
