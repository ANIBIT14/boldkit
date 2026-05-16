import { Dropzone, FileList } from '@/components/ui/dropzone'

export default function Example() {
  const [files, setFiles] = useState([])

  return (
    <>
      <Dropzone
        onFilesAccepted={(accepted) => setFiles(prev => [...prev, ...accepted])}
        accept={{ 'image/*': ['.png', '.jpg', '.gif'] }}
        maxSize={5 * 1024 * 1024}
      />
      <FileList
        files={files.map(f => ({ file: f }))}
        onRemove={(file) => setFiles(prev => prev.filter(f => f !== file))}
      />
    </>
  )
}