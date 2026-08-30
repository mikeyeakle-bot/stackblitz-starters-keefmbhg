'use client';

import React, { useRef } from 'react';
import {
  UpupUploader,
  UpupUploaderRef,
  UpupProvider,
  UploadAdapter,
  FileWithParams,
} from 'upup-react-file-uploader';
import 'upup-react-file-uploader/styles';

export default function Uploader({
  limit = 3,
  isDark = true,
  isMini = false,
}: {
  limit?: number;
  isDark?: boolean;
  isMini?: boolean;
}) {
  // ref For dynamic use
  const ref = useRef<UpupUploaderRef>(null);

  return (
    <UpupUploader
      ref={ref}
      provider={UpupProvider.BackBlaze}
      limit={limit}
      mini={isMini}
      dark={isDark}
      allowPreview={false}
      enableAutoCorsConfig={false}
      customProps={{
        sayHello: "Hellon I'm a custom prop",
      }}
      // NOTE: THIS WILL NOT WOR ON STACKBLITZ BECAUSE OF REDIRECT URIS.
      // FEEL FREE TO TRY THIS OUT ON YOUR LOCAL. PLEASE JOIN OUR DISCORD
      // IF YOU NEED ANY HELP: https://discord.com/invite/ny5WUE9ayc
      driveConfigs={{
        googleDrive: {
          google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_PICKER!,
          google_api_key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
          google_app_id: process.env.NEXT_PUBLIC_GOOGLE_APP_ID!,
        },
        oneDrive: {
          onedrive_client_id: process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID!,
        },
      }}
      uploadAdapters={[
        UploadAdapter.INTERNAL,
        UploadAdapter.CAMERA,
        UploadAdapter.LINK,
        UploadAdapter.GOOGLE_DRIVE,
        UploadAdapter.ONE_DRIVE,
      ]}
      tokenEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPresignedUrl`}
      onFilesSelected={(files: FileWithParams[]) =>
        console.log('selected', files)
      }
      onFileRemove={(f) => console.log('removed', f)}
      onError={(e) => console.error('uploader error:', e)}
    />
  );
}
