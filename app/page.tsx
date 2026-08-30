'use client';

import Uploader from './components/Uploader';
import HideNextDevtools from './lib/hideNextDevtools';

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <HideNextDevtools />
      <Uploader limit={5} isDark={true} isMini={false} />
    </main>
  );
}
