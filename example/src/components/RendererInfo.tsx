import { useCanvasStore } from '@v1v2/engine'

const RendererInfo = () => {
  const rendererName = useCanvasStore(s => s.rendererName)

  if (!rendererName) return null

  return (
    <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 transform">{rendererName}</div>
  )
}

export default RendererInfo
