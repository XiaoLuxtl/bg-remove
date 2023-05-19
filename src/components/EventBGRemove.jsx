import 'two-up-element'
import { useStatusServer } from '../hooks/serverstatus'

export function ImageComparison ({ before, after = null }) {
  const status = useStatusServer({ url: after, pollingInterval: 1000 })

  return (
    <div>
      <two-up>
        {before && (
          <img
            className='w-full'
            slot='before'
            src={before}
            alt='Original Image'
          />
        )}

        {after && status.status === 200
          ? (
            <img
              slot='after'
              className='w-full'
              src={after}
              alt='Second Image after BG removal'
            />
            )
          : (
            <img
              className='blur-lg grayscale w-full'
              slot='after'
              src={before}
              alt='Second Image placeholder before BG removal'
            />
            )}
      </two-up>
      {status.status === 200 && (
        <a
          download
          className='block bg-orange-500 hover:bg-orange-600 text-xl text-white rounded-full px-4 py-1 my-5 mx-4 text-center'
          href={after}
          target='_blank'
          rel='noopener noreferrer'
        >
          Descargar imagen sin fondo
        </a>
      )}
    </div>
  )
}
