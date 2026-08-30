import { NextRequest, NextResponse } from 'next/server';
import { s3GeneratePresignedUrl } from 'upup-react-file-uploader/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { provider, customProps, enableAutoCorsConfig, ...fileParams } = body;
  const { sayHello } = customProps;
  console.log(sayHello);
  const presigned = await s3GeneratePresignedUrl({
    origin: req.headers.get('origin') ?? '',
    provider,
    fileParams,
    bucketName: process.env.S3_BUCKET!,
    enableAutoCorsConfig,
    s3ClientConfig: {
      region: process.env.S3_REGION!,
      endpoint: process.env.S3_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.S3_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET!,
      },
    },
  });

  return NextResponse.json(presigned, { status: 200 });
}
