import DOMPurify from "dompurify";
import { FC } from "react";
const defaultOptions = {
  ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
  ALLOWED_ATTR: ["href"],
};

const sanitize = (dirty: string, options: DOMPurify.Config) => ({
  __html: DOMPurify.sanitize(dirty, { ...defaultOptions, ...options }),
});

export const SanitizeHTML: FC<{ html: string; options?: DOMPurify.Config }> = ({
  html,
  options = {},
}) => (
  <div
    dangerouslySetInnerHTML={{
      __html: sanitize(html, options).__html as string,
    }}
  />
);
