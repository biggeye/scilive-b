import React from 'react';
import { Grid, GridItem, Box, Flex, FormControl, FormLabel, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Checkbox, FormHelperText } from '@chakra-ui/react';

export const BecomeImageInputFormStep1 = () => {
    return (
        <Box p={4}>

            <FormControl id="image" mb={4}>
                <FormLabel>Image (URI)</FormLabel>
                <Input type="url" placeholder="Enter image URL" />
            </FormControl>
        </Box>
    )
}

export const BecomeImageInputFormStep2 = () => {
    return (
        <FormControl id="image_to_become" mb={4}>
            <FormLabel>Image To Become (URI)</FormLabel>
            <Input type="url" placeholder="Enter image URL" />
        </FormControl>
    )
}

export const BecomeImageInputFormStep3 = () => {
return(
    <Grid templateAreas={`"prompt prompt"
                      "settings img2become"
                       "checkout checkout"`}>
        <GridItem area="prompt">
            <FormControl id="prompt" mb={4}>
                <FormLabel>Prompt</FormLabel>
                <Input type="text" placeholder="Enter prompt" />
            </FormControl>
            <FormControl id="negative_prompt" mb={4}>
                <FormLabel>Negative Prompt</FormLabel>
                <Input type="text" placeholder="Enter negative prompt" />
            </FormControl>
        </GridItem>



        <GridItem area="settings">
            <FormControl id="prompt_strength" mb={4}>
                <FormLabel>Prompt Strength</FormLabel>
                <Slider defaultValue={2} min={0} max={3} step={0.1}>
                    <SliderTrack bg="blue.100">
                        <SliderFilledTrack bg="blue.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box color="blue.500" />
                    </SliderThumb>
                </Slider>
            </FormControl>
            <FormControl id="denoising_strength" mb={4}>
                <FormLabel>Denoising Strength</FormLabel>
                <Slider defaultValue={1} min={0} max={1} step={0.01}>
                    <SliderTrack bg="green.100">
                        <SliderFilledTrack bg="green.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box color="green.500" />
                    </SliderThumb>
                </Slider>
            </FormControl>
        </GridItem>

        <GridItem area="img2become">
            <FormControl id="image_to_become_noise" mb={4}>
                <FormLabel>Image To Become Noise</FormLabel>
                <Slider defaultValue={0.3} min={0} max={1} step={0.01}>
                    <SliderTrack bg="orange.100">
                        <SliderFilledTrack bg="orange.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box color="orange.500" />
                    </SliderThumb>
                </Slider>
            </FormControl>
            <FormControl id="image_to_become_strength" mb={4}>
                <FormLabel>Image To Become Strength</FormLabel>
                <Slider defaultValue={0.75} min={0} max={1} step={0.01}>
                    <SliderTrack bg="orange.50">
                        <SliderFilledTrack bg="orange.900" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box color="orange.900" />
                    </SliderThumb>
                </Slider>
            </FormControl>
        </GridItem>

        <GridItem area="checkout">
            <FormControl id="number_of_images" mb={4}>
                <FormLabel>How Many Images to Create</FormLabel>
                <Input type="number" placeholder="Enter number of images" />
            </FormControl>
            <FormControl id="disable_safety_checker" mb={4}>
                <Checkbox>Disable Safety Checker</Checkbox>
                <FormHelperText>Disable safety checker for generated images</FormHelperText>
            </FormControl>
        </GridItem>
    </Grid>

    );
};
