import { useEngine } from 'manapotion'

const RendererInfo = ({ toggleRenderer }: { toggleRenderer: () => void }) => {
  const rendererName = useEngine(s => s.rendererName)

  if (!rendererName) return null

  return (
    <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform">
      {rendererName}
      <button className="bg-slate-100 rounded-md px-2 py-1 ml-2" onClick={toggleRenderer}>
        Change
      </button>
    </div>
  )
}

export default RendererInfo
