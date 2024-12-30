import { useMemo, useRef, useState } from 'react';
import styles from './pre.module.css';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, CopyCheck } from 'lucide-react';

interface PreProps {
  stringCode: string;
  lang: string;
}

function cleanCode(str: string) {
  return str.trim();
}

export const Pre = ({ stringCode, lang }: PreProps) => {
  const code = useMemo(() => cleanCode(stringCode), [stringCode]);
  const content = useRef<HTMLPreElement>();
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!content.current) return;

    try {
      await navigator.clipboard.writeText(content.current.textContent || "");
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar en el portapapeles:', err);
    }
  };

  return (
    <Highlight code={code} theme={themes.oneDark} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.custom_pre} ref={content as any}>
          <span className={styles.icon} onClick={copyCode}>
            {copied ? (
              <CopyCheck width={16} height={16} className={styles.copied} />
            ) : (
              <Copy className="cursor-pointer" width={16} height={16} />
            )}
          </span>
          {tokens.map((line, lineIndex) => (
            <code {...getLineProps({ line })} key={lineIndex + 1}>
              <span className={styles.line_number} key={lineIndex}>
                {lineIndex}
              </span>
              {line.map((token, tokenIndex) => (
                <span
                  key={tokenIndex}
                  {...getTokenProps({ token })}
                  className={styles.line_content}
                />
              ))}
            </code>
          ))}
        </pre>
      )}
    </Highlight>
  );
};