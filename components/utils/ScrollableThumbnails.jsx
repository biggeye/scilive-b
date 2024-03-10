import React from "react";
import { Box, Image, HStack, IconButton } from "@chakra-ui/react";
import { LeftIcon, RightIcon } from "@/components/icons/Icons";
import { userContentExamplesState } from "@/state/replicate/config-atoms";
import { useRecoilValue } from "recoil";

export const ScrollableThumbnails = () => {
  const scrollContainer = React.createRef();
  const userContentExamples = useRecoilValue(userContentExamplesState);
  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { current } = scrollContainer;
      const scrollAmount = direction === "left" ? -200 : 200; // adjust scroll amount if needed
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <Box position="relative" w={{base: "95vw", md: "65vw"}} h="200px" overflow="hidden">
      <IconButton
        aria-label="Scroll left"
        icon={<LeftIcon />}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={() => scroll("left")}
      />
      <HStack
        ref={scrollContainer}
        overflowX="auto"
        spacing="20px"
        p="10px"
        w="100%"
        h="100%"
        whiteSpace="nowrap" // Ensures items are in a single line
      >
        {userContentExamples.map((image, index) => (
          <Box key={index} boxShadow="md" borderRadius="md" overflow="hidden" minWidth="150px"> {/* Fixed width for each image container */}
            <Image src={image} alt={`Thumbnail ${index}`} boxSize="150px" objectFit="cover" /> {/* Fixed size for images */}
          </Box>
        ))}
      </HStack>
      <IconButton
        aria-label="Scroll right"
        icon={<RightIcon />}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={() => scroll("right")}
      />
    </Box>
  );
};
