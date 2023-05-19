import { useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'

// Import required actions.
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect'

import { UploadDropzone } from './components/EventUpload'
import { ImageComparison } from './components/EventBGRemove'

const App = () => {
  // const TEST_URL = 'https://res.cloudinary.com/dh1hre42m/image/upload/v1682142327/fsveyh8x7afwbxcf4ivh.webp'
  const CLOUD_NAME = 'dh1hre42m'
  // eslint-disable-next-line no-unused-vars
  const [origResponse, setOrigResponse] = useState(null)
  const [origImageUrl, setOrigImageUrl] = useState(null)
  const [editImageUrl, setEditImageUrl] = useState(null)

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME
    }
  })

  function handleUpload (response) {
    if (response) {
      setOrigResponse(response)
      setOrigImageUrl(response.secure_url)

      const myImage = cld.image(response.public_id)

      // Apply the transformation.
      myImage.effect(backgroundRemoval()) // Apply a bgremove effect.
      setEditImageUrl(myImage.toURL())
    }
  }

  // Render the transformed image in a React component.
  return (
    <div className='max-w-xl m-auto grid grid-cols-1 place-content-center w-full min-h-screen h-fit'>
      <header className='flex justify-center py-8'>
        <h1 className='text-3xl font-bold text-orange-500'>
          <a href='/'>
            Quita<span className='text-yellow-500'>Fondo</span>
          </a>
        </h1>
      </header>
      <main className='w-full'>
        {origImageUrl
          ? (
            <ImageComparison before={origImageUrl} after={editImageUrl} />
            )
          : (
            <UploadDropzone onUpload={handleUpload} />
            )}
      </main>
    </div>
  )
}

export default App
