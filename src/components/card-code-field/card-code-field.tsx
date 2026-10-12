import {
  ActionIcon,
  TextInput,
  type TextInputProps,
} from "@mantine/core";
import { ScanBarcode } from "lucide-react";
import { useRef, useState } from "react";

const CARD_CODE_MAX_LENGTH = 10;

const monoFontFamily =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

export type CardCodeFieldProps = Omit<
  TextInputProps,
  "maxLength" | "rightSection"
> & {
  /** Called with trimmed code when Enter is pressed (card reader or keyboard) */
  onScan?: (code: string) => void;
};

export const CardCodeField = ({
  onScan,
  disabled,
  readOnly,
  onBlur,
  onKeyDown,
  styles,
  ...props
}: CardCodeFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [listening, setListening] = useState(false);

  const deactivateListening = () => {
    setListening(false);
  };

  const activateListening = () => {
    if (disabled || readOnly) {
      return;
    }
    setListening(true);
    inputRef.current?.focus();
  };

  return (
    <TextInput
      {...props}
      ref={inputRef}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={CARD_CODE_MAX_LENGTH}
      rightSectionPointerEvents="all"
      rightSection={
        <ActionIcon
          type="button"
          variant="subtle"
          color="violet"
          size="sm"
          aria-label="Zeskanuj kartę"
          aria-pressed={listening}
          disabled={disabled || readOnly}
          onClick={(event) => {
            event.preventDefault();
            activateListening();
          }}
        >
          <ScanBarcode size={16} />
        </ActionIcon>
      }
      styles={[
        {
          input: {
            fontFamily: monoFontFamily,
            letterSpacing: 0.5,
            ...(listening
              ? {
                  borderWidth: 2,
                  borderColor: "var(--mantine-color-violet-5)",
                  backgroundColor: "var(--mantine-color-violet-0)",
                }
              : {}),
          },
          section: {
            color: listening
              ? "var(--mantine-color-violet-6)"
              : undefined,
          },
        },
        ...(Array.isArray(styles) ? styles : styles ? [styles] : []),
      ]}
      onBlur={(event) => {
        deactivateListening();
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && listening) {
          event.preventDefault();
          deactivateListening();
          event.currentTarget.blur();
          onKeyDown?.(event);
          return;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          const code = event.currentTarget.value.trim();
          if (code) {
            onScan?.(code);
            deactivateListening();
          }
        }

        onKeyDown?.(event);
      }}
    />
  );
};
