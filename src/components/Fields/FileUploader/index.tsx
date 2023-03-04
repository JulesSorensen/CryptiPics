import { TrashIcon } from '@heroicons/react/outline'
import useEffectNotOnFirstRender from '@hooks/useEffectNotOnFirstRender'
import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  onChange: (newFiles: File[]) => void
  maxFiles?: number
}

const FileUploader: React.FC<FileUploaderProps> = ({ maxFiles, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffectNotOnFirstRender(() => {
    onChange(selectedFiles)
  }, [selectedFiles])

  const multiple = !maxFiles || maxFiles > 1

  const onDrop = useCallback(
    acceptedFiles => {
      setSelectedFiles(multiple ? [...selectedFiles, ...acceptedFiles] : acceptedFiles)
    },
    [selectedFiles, multiple]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles })

  const onDelete = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)

    setSelectedFiles(newFiles)
  }

  return (
    <div
      {...getRootProps()}
      className={classNames(
        'border-secondary border-2 border-dashed rounded-md p-5 w-80',
        'flex flex-col cursor-pointer hover:opacity-75 bg-slate-100 dark:bg-slate-600',
        { 'justify-center': selectedFiles.length === 0 },
        { 'justify-between': selectedFiles.length > 0 }
      )}
      style={{ minHeight: 200 }}
    >
      <input {...getInputProps()} />
      {selectedFiles.length > 0 && (
        <div>
          {selectedFiles.map((file, index) => {
            const onDeleteClick = (event: any) => {
              event.stopPropagation()
              onDelete(index)
            }

            return (
              <div
                key={`file-${index}`}
                className="flex justify-between bg-white dark:bg-slate-500 dark:text-slate-100 p-2 rounded-lg mb-2"
              >
                <span>{file.name}</span>
                <div className="cursor-pointer" onClick={onDeleteClick}>
                  <TrashIcon className="w-6 h-6" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="text-center font-semibold text-slate-600 dark:text-slate-200">
        {isDragActive
          ? `Déposez vo${multiple ? 's' : 'tre'} fichier${multiple ? 's' : ''} ici ...`
          : `Déposez vo${multiple ? 's' : 'tre'} fichier${multiple ? 's' : ''} ou cliquez ici`}
      </div>
    </div>
  )
}

export default FileUploader
