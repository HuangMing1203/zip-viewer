import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Paper from '@mui/material/Paper'

export default function ListView({ images, onImageClick }) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'))
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const cols = isXl ? 6 : isLg ? 5 : isMd ? 4 : isSm ? 3 : isXs ? 2 : 1

  return (
    <ImageList cols={cols} gap={16}>
      {images.map((img, i) => (
        <Paper
          component={ImageListItem}
          square
          variant="outlined"
          sx={{
            cursor: 'pointer',
            '& .MuiImageListItem-img': {
              objectFit: 'contain',
            },
          }}
          key={img.name}
          onClick={() => onImageClick && onImageClick(i)}
        >
          <img src={img.url} alt={`Page ${i + 1}`} loading="lazy" />
        </Paper>
      ))}
    </ImageList>
  )
}
