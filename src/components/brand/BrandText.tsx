import { Children, Fragment, cloneElement, isValidElement, type ReactNode } from "react";

// Only explicitly opted-in rendered copy passes through this component. Content
// files, attributes, metadata, exports and outgoing messages remain plain text.
const COMPANY_NAME = new RegExp("\\bvictor[\\s\\p{P}]*mobility[\\s\\p{P}]*p\\.?v\\.?t[\\s\\p{P}]*l\\.?t\\.?d\\b\\.?", "giu");
const BRAND_WORD = new RegExp("(?<![\\p{L}\\p{N}_])victor(?![\\p{L}\\p{N}_])", "giu");
const ADDRESS = /(?:https?:\/\/|www\.)\S+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b[\w-]+\.(?:com|in|ae|org|net|png|svg|jpg|pdf|txt)\b/gi;
const INLINE_TAGS = new Set(["span", "strong", "em", "b", "i", "small", "mark", "u", "s", "sub", "sup", "a"]);

type TextProps = { children?: ReactNode; className?: string; "aria-hidden"?: boolean | "true" | "false" };

function isCopyElement(node: ReactNode) {
  return isValidElement<TextProps>(node) &&
    (node.type === Fragment || (typeof node.type === "string" && INLINE_TAGS.has(node.type))) &&
    node.props["aria-hidden"] !== true && node.props["aria-hidden"] !== "true" &&
    !/(?:^|\s)sr-only(?:\s|$)/.test(node.props.className || "");
}

/** The supplied asset, unchanged, viewed without its empty exterior margins. */
export function VictorWordmark() {
  return (
    <span className="victor-wordmark">
      <span className="sr-only">Victor</span>
      <svg viewBox="88 50 1992 617" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
        <image href="/brand/victor-simple.png" width="2172" height="724" />
      </svg>
    </span>
  );
}

/** Protect complete legal names across inline elements before replacing words. */
export default function BrandText({ children }: { children: ReactNode }) {
  function read(nodes: ReactNode): string {
    return Children.toArray(nodes).map(node => {
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (isValidElement(node) && (node.type === "br" || node.type === "wbr")) return "\n";
      if (isCopyElement(node) && isValidElement<TextProps>(node)) return read(node.props.children);
      return "\uFFFC"; // Opaque components/images are boundaries, never invoked here.
    }).join("");
  }

  const text = read(children);
  const protectedRanges = [COMPANY_NAME, ADDRESS].flatMap(pattern =>
    Array.from(text.matchAll(pattern), match => [match.index!, match.index! + match[0].length])
  );
  const matches = Array.from(text.matchAll(BRAND_WORD)).filter(match =>
    !protectedRanges.some(([start, end]) => match.index! >= start && match.index! < end)
  );
  if (!matches.length) return <>{children}</>;

  let offset = 0;
  function replace(nodes: ReactNode): ReactNode {
    return Children.map(nodes, node => {
      if (node == null || typeof node === "boolean") return node;
      if (typeof node === "string" || typeof node === "number") {
        const value = String(node);
        const start = offset;
        offset += value.length;
        const localMatches = matches.filter(match => match.index! >= start && match.index! < offset);
        if (!localMatches.length) return node;
        const parts: ReactNode[] = [];
        let cursor = 0;
        for (const match of localMatches) {
          const index = match.index! - start;
          parts.push(value.slice(cursor, index), <VictorWordmark key={match.index} />);
          cursor = index + match[0].length;
        }
        parts.push(value.slice(cursor));
        return parts;
      }
      if (isCopyElement(node) && isValidElement<TextProps>(node)) {
        return cloneElement(node, undefined, replace(node.props.children));
      }
      offset += 1;
      return node;
    });
  }

  return <span className="brand-text">{replace(children)}</span>;
}
