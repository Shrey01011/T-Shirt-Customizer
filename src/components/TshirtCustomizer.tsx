import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import styled from '@emotion/styled';

const CustomizationBox = styled(Box)`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  margin: 20px;
`;

const TshirtCustomizer: React.FC = () => {
  const [height, setHeight] = useState('180');
  const [weight, setWeight] = useState('80');
  const [build, setBuild] = useState('athletic');

  const buildOptions = ['lean', 'regular', 'athletic', 'big'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CustomizationBox>
        <Typography variant="h6" gutterBottom>
          Customize Your T-shirt
        </Typography>
        
        <FormControl fullWidth margin="normal">
          <TextField
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Build</InputLabel>
          <Select
            value={build}
            label="Build"
            onChange={(e) => setBuild(e.target.value)}
          >
            {buildOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CustomizationBox>
    </Box>
  );
};

export default TshirtCustomizer; 