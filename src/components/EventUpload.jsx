import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import { useEffect, useState } from 'react'

const CLOUDINARY_API_PATH =
  'https://api.cloudinary.com/v1_1/dh1hre42m/image/upload'
const API_KEY = 146423766967557
const UP_PRESET = 'x89j3n6s'

export function UploadDropzone ({ onUpload }) {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null)

  useEffect(() => {
    const UploadDropzone = new Dropzone('#my-dropzone', {
      // url: "/upload",
      maxFilesize: 1, // MB
      maxFiles: 1,
      acceptedFiles: 'image/*',
      autoProcessQueue: true,
      dictDefaultMessage: '',
      init: function () {
        this.on('addedfile', (addedFile) => {
          // Si ya se ha agregado un archivo, lo eliminamos
          if (this.files.length > 1) {
            this.removeFile(this.files[0])
          }
          setFile(addedFile)
          // console.log("Archivo agregado: ", addedFile);
        })
      },
      // Deshabilitamos la funcionalidad de arrastrar y soltar
      dragoverMultiple: false
    })

    // UploadDropzone.on("removedfile", (file) => {
    //   console.log("Archivo eliminado: ", file);
    // });

    UploadDropzone.on('sending', (file, xhr, formData) => {
      // console.log("sending");
      formData.append('upload_preset', UP_PRESET)
      formData.append('timestamp', Date.now() / 1000)
      formData.append('api_key', API_KEY)
    })

    UploadDropzone.on('success', (file, response) => {
      // console.log("Bien");
      onUpload(response)
    })

    UploadDropzone.on('error', (file, response) => {
      console.log('Error')
      console.log(response)
    })

    // UploadDropzone.on("complete", () => {
    //   console.log("Todos los archivos cargados");
    // });

    return () => {
      UploadDropzone.destroy()
    }
  }, [])

  return (
    <div className='bg-black p-4 bg-opacity-20 border-gray-300 border border-opacity-20 mb-4 w-full'>
      <form
        id='my-dropzone'
        className='flex flex-col justify-center items-center aspect-video text-center dropzone p-3 border-dashed border-2 border-gray-300 hover:border-yellow-500 shadow-2xl rounded-lg'
        action={`${CLOUDINARY_API_PATH}`}
      >
        <p className='mb-3'>Arrastra una imagen aquí</p>
        <button className='pointer-events-none bg-orange-500 rounded-full px-3 py-1 mb-3'>
          Seleccionar archivo
        </button>
        <p className='text-xs'>(Sólo 1 archivo a la vez)</p>
      </form>
    </div>
  )
}
