import { useState } from 'react'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'
import { pdf } from '@react-pdf/renderer'

interface IPdfSettings {
  content: any
  fileName: string
  onSuccess?: () => void
}

const usePdfGenerator = () => {
  const [isPending, setIsPending] = useState(false)

  const download = async ({ content, fileName, onSuccess }: IPdfSettings) => {
    setIsPending(true)

    try {
      const blob = await pdf(content).toBlob()

      FileSaver.saveAs(blob, `${fileName}.pdf`)

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast.error('La Génération du PDF a échouée')
    }

    setIsPending(false)
  }

  return {
    download,
    isPending
  }
}

export default usePdfGenerator
