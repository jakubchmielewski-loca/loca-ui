import { Box, Stack, Text, ThemeIcon } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { ScanBarcode } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { uiColors } from "../loca-ui-provider/theme-tokens";

export type CardScanZoneProps = {
  /** Controlled trapped/active state */
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  /** Called with trimmed scanned/typed code when Enter is pressed */
  onScan?: (code: string) => void;
  disabled?: boolean;
  /** Show captured code as dots in place of description (default: true) */
  showBuffer?: boolean;
  title?: ReactNode;
  activeTitle?: ReactNode;
  description?: ReactNode;
  activeDescription?: ReactNode;
  cancelOnEscape?: boolean;
  cancelOnOutsideClick?: boolean;
};

export const CardScanZone = ({
  active,
  defaultActive = false,
  onActiveChange,
  onScan,
  disabled = false,
  showBuffer = true,
  title = "Zeskanuj kartę",
  activeTitle = "Skanowanie aktywne…",
  description = "Kliknij tutaj, a następnie zeskanuj kartę czytnikiem",
  activeDescription = "Przyłóż kartę do czytnika aby zeskanować kod",
  cancelOnEscape = true,
  cancelOnOutsideClick = true,
}: CardScanZoneProps) => {
  const [isActive, setIsActive] = useUncontrolled({
    ...(active !== undefined ? { value: active } : {}),
    defaultValue: defaultActive,
    finalValue: false,
    onChange: onActiveChange,
  });

  const [buffer, setBuffer] = useState("");
  const bufferRef = useRef("");
  const zoneRef = useRef<HTMLDivElement>(null);

  const clearBuffer = () => {
    bufferRef.current = "";
    setBuffer("");
  };

  const deactivate = () => {
    clearBuffer();
    setIsActive(false);
    zoneRef.current?.blur();
  };

  const activate = () => {
    if (disabled) {
      return;
    }
    clearBuffer();
    setIsActive(true);
    zoneRef.current?.focus();
  };

  useEffect(() => {
    if (!isActive || disabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (cancelOnEscape && event.key === "Escape") {
        event.preventDefault();
        deactivate();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        const code = bufferRef.current.trim();
        if (code) {
          onScan?.(code);
          deactivate();
        } else {
          clearBuffer();
        }
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        bufferRef.current = bufferRef.current.slice(0, -1);
        setBuffer(bufferRef.current);
        return;
      }

      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        bufferRef.current += event.key;
        setBuffer(bufferRef.current);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!cancelOnOutsideClick) {
        return;
      }
      if (!zoneRef.current?.contains(event.target as Node)) {
        deactivate();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally sync to isActive/disabled flags
  }, [isActive, disabled, cancelOnEscape, cancelOnOutsideClick, onScan]);

  return (
    <Box
      ref={zoneRef}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-pressed={isActive}
      aria-disabled={disabled}
      // Pointer only — keyboard Enter synthesizes `click` on role="button"
      // and would re-activate after a successful scan.
      onPointerDown={(event) => {
        if (event.button !== 0 || disabled || isActive) {
          return;
        }
        activate();
      }}
      onKeyDown={(event) => {
        if (!isActive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          activate();
        }
      }}
      p={28}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        borderRadius: 12,
        opacity: disabled ? 0.55 : 1,
        backgroundColor: isActive
          ? "var(--mantine-color-violet-0)"
          : uiColors.surfaceElevated,
        border: isActive
          ? "2px solid var(--mantine-color-violet-5)"
          : `1px dashed ${uiColors.borderSubtle}`,
        transition: "border-color 120ms ease, background-color 120ms ease",
      }}
    >
      <Stack align="center" gap={10}>
        <ThemeIcon variant="light" color="violet" radius="xl" size={56}>
          <ScanBarcode size={28} />
        </ThemeIcon>
        <Stack gap={2} align="center">
          <Text fw={600} size="sm" c={uiColors.textPrimary}>
            {isActive ? activeTitle : title}
          </Text>
          <Box
            maw={240}
            w="100%"
            style={{
              // Reserve ~2 lines of xs text so masked dots don't shrink the zone
              minHeight:
                "calc(var(--mantine-font-size-xs) * var(--mantine-line-height) * 2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isActive && showBuffer && buffer ? (
              <Text
                fw={600}
                c={uiColors.textPrimary}
                lh={1}
                style={{ fontSize: 22, letterSpacing: 3 }}
              >
                {"•".repeat(buffer.length)}
              </Text>
            ) : (
              <Text size="xs" c="dimmed" ta="center">
                {isActive ? activeDescription : description}
              </Text>
            )}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
