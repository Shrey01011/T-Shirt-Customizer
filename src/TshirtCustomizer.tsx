import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Button, Paper, Theme
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const buildOptions = [
  { value: 'lean', label: 'Lean' },
  { value: 'reg', label: 'Regular' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'big', label: 'Big' },
];
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/1004016/pexels-photo-1004016.jpeg?auto=compress&w=400&q=80';

interface TshirtCustomizerProps {
  theme: Theme;
}

interface FormData {
  height: string;
  weight: string;
  build: string;
  text: string;
}

const TshirtCustomizer: React.FC<TshirtCustomizerProps> = ({ theme }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string>(DEFAULT_IMAGE);
  const [imageName, setImageName] = React.useState<string>('');

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      height: '180',
      weight: '80',
      build: 'athletic',
      text: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      setImageName(e.dataTransfer.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = (data: FormData) => {
    console.log({ ...data, imageUrl });
    alert('Submitted! Check the console for output.');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lines = e.target.value.split('\n');
    if (lines.length <= 3) {
      setValue('text', e.target.value);
    } else {
      setValue('text', lines.slice(0, 3).join('\n'));
    }
  };

  const isDarkTheme = theme.palette.mode === 'dark';
  const textColor = isDarkTheme ? '#fff' : '#000';
  const borderColor = isDarkTheme ? '#888' : '#ccc';
  const bgColor = isDarkTheme ? '#23272a' : '#f5f5f5';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'stretch' },
        justifyContent: { xs: 'center', md: 'flex-start' },
        gap: 4,
        width: '100%',
        maxWidth: 1200,
        minHeight: '100%'
      }}>
        {/* Left: Large Image */}
        <Box sx={{ 
          width: '28vw', 
          minWidth: 250, 
          maxWidth: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: bgColor, 
          borderRadius: 2, 
          height: 350, 
          mr: 2 
        }}>
          <img
            src={imageUrl}
            alt="T-shirt print preview"
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
          />
        </Box>
        {/* Right: Controls and Upload */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Upload Box */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              border: `1px dashed ${borderColor}`,
              width: 350,
              height: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              mb: 2,
              alignSelf: 'flex-end',
              cursor: 'pointer',
              position: 'relative',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="preview" style={{ maxWidth: 80, maxHeight: 80, marginBottom: 8, borderRadius: 4 }} />
            ) : (
              <UploadFileIcon sx={{ fontSize: 48, color: borderColor, mb: 1 }} />
            )}
            <Typography sx={{ color: borderColor, mb: 1, fontSize: 14 }}>
              Drop an image here or
            </Typography>
            <Button
              variant="outlined"
              component="span"
              sx={{ mb: 1, color: textColor, borderColor: borderColor, fontSize: 13 }}
            >
              Select File
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Button>
            <Typography variant="caption" sx={{ color: borderColor }}>
              10 MB maximum
            </Typography>
            <Typography variant="body2" sx={{ color: borderColor, mt: 1, fontSize: 12 }}>
              {imageName || 'No image selected'}
            </Typography>
          </Paper>
          {/* Controls */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              border: `1px solid ${borderColor}`,
              width: 350,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignSelf: 'flex-end',
            }}
          >
            <Typography sx={{ fontFamily: theme.typography.fontFamily, color: textColor, mb: 1 }}>
              Height
            </Typography>
            <TextField
              {...register('height')}
              type="number"
              fullWidth
              inputProps={{ style: { color: textColor, fontFamily: theme.typography.fontFamily } }}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor } } }}
            />
            <Typography sx={{ fontFamily: theme.typography.fontFamily, color: textColor, mb: 1 }}>
              Weight
            </Typography>
            <TextField
              {...register('weight')}
              type="number"
              fullWidth
              inputProps={{ style: { color: textColor, fontFamily: theme.typography.fontFamily } }}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor } } }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: borderColor, fontFamily: theme.typography.fontFamily }}>Build</InputLabel>
              <Select
                {...register('build')}
                label="Build"
                sx={{ 
                  color: textColor, 
                  fontFamily: theme.typography.fontFamily, 
                  '& .MuiOutlinedInput-notchedOutline': { borderColor } 
                }}
              >
                {buildOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontFamily: theme.typography.fontFamily }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          {/* Text Box for T-shirt Print and Submit Button */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              border: `1px solid ${borderColor}`,
              width: 350,
              p: 2,
              mt: 2,
              alignSelf: 'flex-end',
            }}
          >
            <Typography sx={{ fontFamily: theme.typography.fontFamily, color: textColor, mb: 1 }}>
              T-shirt Text (max 3 lines)
            </Typography>
            <TextField
              {...register('text')}
              onChange={handleTextChange}
              multiline
              minRows={3}
              maxRows={3}
              fullWidth
              inputProps={{
                style: { color: textColor, fontFamily: theme.typography.fontFamily },
                maxLength: 120,
              }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor } } }}
              placeholder={"Type up to 3 lines..."}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ 
                mt: 2, 
                fontFamily: theme.typography.fontFamily,
                bgcolor: theme.palette.primary.main
              }}
              type="submit"
            >
              Submit
            </Button>
          </Paper>
        </Box>
      </Box>
    </form>
  );
};

export default TshirtCustomizer; 