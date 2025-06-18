import UploadPageClient from './client';
    import { TopMenu } from '@/components/TopMenu';

export default async function UploadPage() {
  return (
    <>
      <TopMenu />
      <UploadPageClient />
    </>
  );
}
