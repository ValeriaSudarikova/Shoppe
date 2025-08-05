import { ref } from 'vue'

export const usePicturesSlider = () => {
  interface ArrayPictures {
    id: string
    download_url: string
    alt: string
  }

  const picturesArray = ref<ArrayPictures[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPicturesApi = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=6')
      picturesArray.value = await response.json()
    } catch (e: unknown) {
      error.value = `Error! ${e}`
    } finally {
      loading.value = false
    }
  }

  return { fetchPicturesApi, picturesArray, loading, error }
}
