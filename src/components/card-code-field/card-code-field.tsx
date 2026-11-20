import {
  ActionIcon,
  TextInput,
  type TextInputProps,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { ScanBarcode } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

const CARD_CODE_MAX_LENGTH = 10;

const DEFAULT_PLACEHOLDER = "Naciśnij, aby rozpocząć skanowanie";
const DEFAULT_ACTIVE_PLACEHOLDER = "Skanowanie aktywne…";

const monoFontFamily =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

export type CardCodeFieldProps = Omit<
  TextInputProps,
  "maxLength" | "rightSection" | "type"
> & {
  /** Called with trimmed code when Enter is pressed (card reader or keyboard) */
  onScan?: (code: string) => void;
  /** Placeholder shown while scan mode is active */
  activePlaceholder?: string;
};

export const CardCodeField = ({
  onScan,
  disabled,
  readOnly,
  onBlur,
  onFocus,
  onKeyDown,
  onChange,
  value,
  defaultValue,
  placeholder = DEFAULT_PLACEHOLDER,
  activePlaceholder = DEFAULT_ACTIVE_PLACEHOLDER,
  styles,
  ...props
}: CardCodeFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listeningRef = useRef(false);
  const [listening, setListening] = useState(false);
  const [buffer, setBuffer] = useState("");

  const [committed, setCommitted] = useUncontrolled({
    ...(value !== undefined ? { value: String(value) } : {}),
    defaultValue:
      defaultValue !== undefined ? String(defaultValue) : "",
    finalValue: "",
    onChange: (next) => {
      onChange?.({
        currentTarget: { value: next },
        target: { value: next },
      } as ChangeEvent<HTMLInputElement>);
    },
  });

  const deactivateListening = () => {
    listeningRef.current = false;
    setListening(false);
    setBuffer("");
  };

  const activateListening = () => {
    if (disabled || readOnly || listeningRef.current) {
      return;
    }
    listeningRef.current = true;
    setBuffer("");
    setListening(true);
    inputRef.current?.focus();
  };

  return (
    <TextInput
      {...props}
      ref={inputRef}
      type="password"
      autoComplete="off"
      disabled={disabled}
      readOnly={readOnly}
      maxLength={CARD_CODE_MAX_LENGTH}
      value={listening ? buffer : committed}
      placeholder={listening ? activePlaceholder : placeholder}
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
            cursor: disabled || readOnly ? undefined : "pointer",
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
      onChange={(event) => {
        if (!listeningRef.current) {
          return;
        }
        setBuffer(event.currentTarget.value.slice(0, CARD_CODE_MAX_LENGTH));
      }}
      onFocus={(event) => {
        activateListening();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (listeningRef.current) {
          // Cancel in-progress scan — keep previously committed code
          deactivateListening();
        }
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && listeningRef.current) {
          event.preventDefault();
          deactivateListening();
          event.currentTarget.blur();
          onKeyDown?.(event);
          return;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          const code = (
            listeningRef.current ? buffer : event.currentTarget.value
          ).trim();
          if (code) {
            setCommitted(code);
            onScan?.(code);
            deactivateListening();
            event.currentTarget.blur();
          }
        }

        onKeyDown?.(event);
      }}
    />
  );
};
