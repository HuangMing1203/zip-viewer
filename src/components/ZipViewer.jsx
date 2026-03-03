import { useState, Suspense, lazy, useEffect } from 'react'
import { useErrorMessage } from './ErrorMessageProvider'
import { extractArchiveImages } from '../utils/extractArchiveImages'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const ListView = lazy(() => import('./ListView'))
const ReaderView = lazy(() => import('./ReaderView'))

export default function ComicViewer({ archiveBlob }) {
  const [images, setImages] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const showErrorMessage = useErrorMessage()

  // Extract images from archive on mount
  useEffect(() => {
    if (!archiveBlob) {
      return
    }
    setImages(null)
    setSelectedImageIndex(null)
    setLoading(true)
    extractArchiveImages(archiveBlob)
      .then((extractedImages) => {
        setImages(extractedImages)
      })
      .catch((err) => {
        showErrorMessage(err.message || 'Failed to extract archive')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [archiveBlob])

  // Loading state
  if (archiveBlob && loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (images) {
    return (
      <Suspense>
        <ListView images={images} onImageClick={setSelectedImageIndex} />
        <ReaderView
          images={images}
          currentIndex={selectedImageIndex}
          setCurrentIndex={setSelectedImageIndex}
        />
      </Suspense>
    )
  }

  return null
}
