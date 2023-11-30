import React from 'react';
import { Box, Typography, Button } from '@mui/material';


const AdvertisementSection = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f0f0f0',
                padding: '20px',
                textAlign: 'center',
                position: 'relative', // Set position to relative for containing the wrapping paper design
            }}
        >
            {/* Wrapping paper design */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50px',
                    height: '50px',
                    backgroundImage: 'url("https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/")',
                    backgroundRepeat: 'repeat',
                    zIndex: 0,
                }}
            />

            <Typography variant="h5" gutterBottom>
                Special Offer!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Limited time offer - Get 20% off on all products.
            </Typography>
            <Button variant="contained" color="primary">
                Shop Now
            </Button>
        </Box>
    );
};


export default AdvertisementSection;
