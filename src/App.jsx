import { lazy, Suspense, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import FileSelector from './components/FileSelector'
import ErrorMessageProvider from './components/ErrorMessageProvider'

const ZipViewer = lazy(() => import('./components/ZipViewer'))

export default function App() {
  const [archiveBlob, setArchiveBlob] = useState(null)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zip Viewer
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{ my: 4, display: 'flex', flexFlow: 'column nowrap', gap: 3 }}
      >
        <ErrorMessageProvider>
          <FileSelector
            placeholder="Zip archive URL or upload"
            accept=".zip,application/zip,application/x-zip-compressed"
            onSubmit={(blob) => setArchiveBlob(blob)}
          />

          <Suspense>
            <ZipViewer archiveBlob={archiveBlob} />
          </Suspense>
        </ErrorMessageProvider>
      </Container>
    </>
  )
}
