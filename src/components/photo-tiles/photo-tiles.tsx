import {
  ActionIcon,
  AspectRatio,
  Card,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Box,
  Flex,
} from "@mantine/core";
import { Maximize } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { useMediaQuery } from "@mantine/hooks";

type PhotoTilesSlide = {
  src: string;
  alt?: string;
};

type PhotoTilesContextValue = {
  openAt: (index: number) => void;
  setSlide: (index: number, slide: PhotoTilesSlide) => void;
};

const PhotoTilesContext = createContext<PhotoTilesContextValue | null>(null);

function usePhotoTilesContext(component: string) {
  const ctx = useContext(PhotoTilesContext);

  if (!ctx) {
    throw new Error(`${component} must be used within PhotoTiles`);
  }

  return ctx;
}

type PhotoTilesProps = {
  children: ReactNode;
};

type PhotoTilesGridProps = {
  children: ReactNode;
  columns?: number;
};

type PhotoTilesTileProps = {
  index: number;
  src: string;
  title: string;
  fileName?: string;
  alt?: string;
};

const PhotoTilesRoot = ({ children }: PhotoTilesProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<PhotoTilesSlide[]>([]);

  const setSlide = useCallback((index: number, slide: PhotoTilesSlide) => {
    setSlides((prev) => {
      const next = [...prev];
      next[index] = slide;
      return next;
    });
  }, []);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const contextValue = useMemo(
    () => ({ openAt, setSlide }),
    [openAt, setSlide]
  );

  return (
    <PhotoTilesContext.Provider value={contextValue}>
      {children}
      <Lightbox
        open={open}
        index={activeIndex}
        close={() => setOpen(false)}
        slides={slides}
      />
    </PhotoTilesContext.Provider>
  );
};

const PhotoTilesGrid = ({ children, columns = 6 }: PhotoTilesGridProps) => {
  const isCompact = useMediaQuery("(max-width: 48em)");

  return (
    <SimpleGrid cols={isCompact ? 2 : columns} spacing="md">
      {children}
    </SimpleGrid>
  );
};

const PhotoTilesTile = ({
  index,
  src,
  title,
  fileName,
  alt,
}: PhotoTilesTileProps) => {
  const { openAt, setSlide } = usePhotoTilesContext("PhotoTiles.Tile");

  useEffect(() => {
    setSlide(index, { src, alt: alt ?? title });
  }, [index, src, alt, title, setSlide]);

  return (
    <Card
      withBorder
      radius={4}
      p={16}
      style={{ cursor: "pointer" }}
      onClick={() => openAt(index)}
    >
      <AspectRatio ratio={1} pos="relative">
        <Image
          src={src}
          alt={alt ?? title}
          fit="contain"
          bg={uiColors.lightGray}
          radius={4}
        />
        <Box
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          h="45%"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <Flex pos="absolute" right={8} bottom={8} w="auto" h="auto">
          <ActionIcon variant="transparent">
            <Maximize color="white" size={24} />
          </ActionIcon>
        </Flex>
      </AspectRatio>

      <Stack gap={4} mt="md">
        <Text fz={12} fw={600} c="uiColors.textStrong" lineClamp={1}>
          {title}
        </Text>
        {fileName && (
          <Text fz={10} c="gray.6" lineClamp={1}>
            {fileName}
          </Text>
        )}
      </Stack>
    </Card>
  );
};

type PhotoTilesCompound = FC<PhotoTilesProps> & {
  Grid: typeof PhotoTilesGrid;
  Tile: typeof PhotoTilesTile;
};

const PhotoTiles = Object.assign(PhotoTilesRoot, {
  Grid: PhotoTilesGrid,
  Tile: PhotoTilesTile,
}) as PhotoTilesCompound;

export { PhotoTiles };
export type { PhotoTilesProps, PhotoTilesGridProps, PhotoTilesTileProps };
