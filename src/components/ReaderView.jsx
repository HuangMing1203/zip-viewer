import { useEffect, useRef } from 'react'
import { useErrorMessage } from './ErrorMessageProvider'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

export default function ReaderView({ images, currentIndex, setCurrentIndex }) {
  const touchStartX = useRef(0)

  const currentImage = images[currentIndex]

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      useErrorMessage('This is the first page')
    }
  }

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      useErrorMessage('This is the last page')
    }
  }

  const goToList = () => setCurrentIndex(null)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') goToList()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  // Swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (diff > 50) goToNext()
    if (diff < -50) goToPrevious()
  }

  // Click zones navigation
  const handleZoneClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const oneThird = width / 3

    if (x < oneThird) {
      goToPrevious()
    } else if (x > oneThird * 2) {
      goToNext()
    } else {
      goToList()
    }
  }

  return (
    <Dialog
      open={images && currentIndex !== null}
      fullScreen
      onClose={goToList}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={goToList} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Page ${currentIndex + 1} of ${images.length}`}
          </Typography>
          <Typography variant="body2" component="div">
            {currentImage?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <img
        src={currentImage?.url}
        alt={`Page ${currentIndex + 1}`}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          userSelect: 'none',
          objectFit: 'contain',
        }}
        onClick={handleZoneClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </Dialog>
  )
}
