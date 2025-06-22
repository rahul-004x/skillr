'use client'

import React, { useState } from 'react'
import { Linkedin,  X } from 'lucide-react';
import { Dropzone } from '@/components/ui/dropzone';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useUserAction } from '@/hooks/useUserAction'
import { CustomSpinner } from '@/components/CustomSpinner';

type FileState = 
    | { status: 'empty'}
    | { status: 'saved'; file: { name: string, url: string, size: number}}

export default function UploadPageClient () {
      const router = useRouter();

    const { resumeQuery, uploadResumeMutation } = useUserAction()
    const [fileState, setFileState] = useState<FileState>({ status: 'empty'})

    const handleReset = () => {
        setFileState({ status: 'empty'})
    }

    const isUpdating = resumeQuery.isPending || uploadResumeMutation.isPending

    const handleUploadFile = async (file: File) => {
        uploadResumeMutation.mutate(file)
    }

  return (
    <div className='flex flex-col items-center flex-1 px-4 py-12 gap-6 min-h-[80vh]'>
        <div className='w-full max-w-[438px] text-center font-mono mx-auto'>
            <h1 className='text-base text-center pb-6'>
                Upload the PDF of you linkedin or your resume and generate your portfolio website
            </h1>

            <div className='relative mx-2.5'>
                {fileState.status != 'empty' && (
                    <button
                        onClick={handleReset}
                        className='absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10'
                        disabled={isUpdating}
                    >
                        <X className='h-4 w-4 text-gray-500' />
                    </button>
                )}
                <Dropzone
                    accept={{ 'application/pdf': ['.pdf']}}
                    maxFiles={1}
                    icon={
                        fileState.status != 'empty' ? (
                            <Image src='/uploaded-pdf.svg' alt='uploaded' height={6} width={6} /> 
                        ) : (
                            <Linkedin className='h-6 w-6 text-gray-600' />
                        )
                    }
                    title={
                    <span className="text-base font-bold text-center text-black/95">
                        {fileState.status !== 'empty'
                        ? fileState.file.name
                        : 'Upload PDF'}
                    </span>
                    }
                    description={
                        <span className='text-sm font-light text-center text-gray-600'>
                            {fileState.status !== 'empty'
                                ? `${(fileState.file.size / 1024 / 1024).toFixed(2)} MB`
                                : 'Resume or LinkedIn'
                            }
                        </span>
                    }
                    isUploading={uploadResumeMutation.isPending}
                    onDrop={(acceptedFiles) => {
                    if (acceptedFiles[0]) handleUploadFile(acceptedFiles[0]);
                    }}
                    onDropRejected={() => toast.error('Only PDF files are supported')}
                />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant='ghost'
                            className='mt-3 hover:bg-white border border-transparent hover:border-gray-200 font-mono text-center cursor-help flex flex-row gap-1.5 justify-center mx-auto'
                        >
                            <span className='ml-1 inline-block h-4 w-4 rounded-full border border-gray-300 text-center justify-center text-xs cursor-help'>
                                i
                            </span>
                            <p className='text-xs text-center text-gray-600 whitespace-normal'>
                                How to upload LinkedIn Profile
                            </p>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[652px] text-center font-mono !p-0 gap-0">
                        <DialogTitle className="font-mono text-base text-center text-design-gray px-7 py-4">
                            Go to your profile → Click on “Resources” → Then “Save to PDF”
                        </DialogTitle>
                        <Image src="/linkedin-save-to-pdf.png" alt='how to upload linkedin profile' className="h-auto w-full" height={0} width={0} sizes="100vw" />
                    </DialogContent>  
                </Dialog>
            </div>
            <div className='font-mono mt-4'>
                <div className='relative'>
                    <Button
                        className='px-4 py-3 h-auto bg-black/95 hover:bg-black/85'
                        disabled={fileState.status === 'empty'}
                        onClick={() => router.push('pdf')}
                    >
                         {isUpdating ? (
                            <>
                                <CustomSpinner className='h-5 w-5 mr-2'/>
                                Processing...
                            </>
                        ) : (
                            <> 
                                <Image src='/sparkle.png' alt='sparkle icon' width={20} height={20} style={{ marginRight: '0.5rem' }} />
                                Generate Portfolio
                            </>
                        )} 
                    </Button>

                    {fileState.status === 'empty' && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <span className="absolute inset-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Upload a PDF to continue</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
