'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useBuilder } from './BuilderContext'

export function ResumeUpload() {
  const { setDetails } = useBuilder()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [fileName, setFileName] = useState('')

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    if (!file) return
    setFileName(file.name)
    setStatus('loading')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/parse-resume', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Parse failed')
      const data = await res.json()
      setDetails(data)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }, [setDetails])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center gap-3 p-8
          border-2 border-dashed rounded-xl cursor-pointer transition-all
          ${isDragActive ? 'border-brand-400 bg-brand-50' : ''}
          ${status === 'done' ? 'border-teal-400 bg-teal-50' : ''}
          ${status === 'error' ? 'border-red-300 bg-red-50' : ''}
          ${status === 'loading' ? 'border-brand-300 bg-brand-50/50 pointer-events-none' : ''}
          ${status === 'idle' && !isDragActive ? 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 bg-gray-50' : ''}
        `}
      >
        <input {...getInputProps()} />

        {status === 'loading' && (
          <>
            <Loader size={28} className="text-brand-500 animate-spin" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Reading {fileName}…</p>
              <p className="text-xs text-gray-400 mt-1">Extracting your details with AI</p>
            </div>
          </>
        )}

        {status === 'done' && (
          <>
            <CheckCircle size={28} className="text-teal-500" />
            <div className="text-center">
              <p className="text-sm font-medium text-teal-700">Resume parsed!</p>
              <p className="text-xs text-teal-500 mt-1">{fileName} — details filled below</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle size={28} className="text-red-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Couldn't parse this file</p>
              <p className="text-xs text-red-400 mt-1">Try a different PDF or fill in manually</p>
            </div>
          </>
        )}

        {status === 'idle' && (
          <>
            {isDragActive
              ? <Upload size={28} className="text-brand-500" />
              : <FileText size={28} className="text-gray-300" />
            }
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF or DOCX — we'll extract everything</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
              Click or drag & drop
            </span>
          </>
        )}
      </div>
    </div>
  )
}
