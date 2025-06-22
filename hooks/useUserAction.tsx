import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Resume } from '@/lib/server/redisActions'
import { useS3Upload } from 'next-s3-upload'

const fetchResume = async(): Promise<{resume: Resume | undefined}> => {
  const response = await fetch('/api/resume')
  if(!response.ok) {
    const error = await response.json()
    throw new Error(error.error|| 'Failed to fetch resume')
  }
  return await response.json()
}

export function useUserAction () {
  const queryClient = useQueryClient()
  const { uploadToS3 } = useS3Upload()

  // Query for resume data
  const resumeQuery = useQuery({
    queryKey: ['resume'],
    queryFn: fetchResume
  })

  const internalResumeUpdate = async(newResume: Resume) => {
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResume)
      })

      if(!response.ok) {
        const error = await response.json()
        throw new Error(error.error || error.message || 'Failed to update resume')
      }
    } catch (error) {
      console.error("Error updating resume", error)
      throw error
    }
  }

  const uploadResumeFile = async(file: File) => {
    try {
      const fileOnS3 = await uploadToS3(file)
      const newResume: Resume = {
        file: {
          name: file.name,
          url: fileOnS3.url,
          size: file.size,
          bucket: fileOnS3.bucket,
          key: fileOnS3.key
        },
        resumeData: undefined,
        status: 'draft'
      }
      queryClient.setQueryData(['resume'], oldData => ({
        ...(oldData || {}),
        ...newResume
      }))

      await internalResumeUpdate(newResume)
    } catch (error) {
      // Rollback optimistic update on failure
      queryClient.invalidateQueries({ queryKey: ['resume'] })
      throw error
    }
  }

  // Mutation for update resume
  const uploadResumeMutation = useMutation({
    mutationFn: uploadResumeFile,
    onSuccess: () => {
        // Invalidate refetch resume data
        queryClient.invalidateQueries(
          { queryKey: ['resume']}
        )
    }
  })

  return {
    resumeQuery,
    uploadResumeMutation
  }
}