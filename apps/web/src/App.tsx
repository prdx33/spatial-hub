import { GrainOverlay } from '@/components/spatial/GrainOverlay';
import { WorkspaceCanvas } from '@/components/workspace/WorkspaceCanvas';

export function App() {
  return (
    <>
      <WorkspaceCanvas />
      <GrainOverlay />
    </>
  );
}
