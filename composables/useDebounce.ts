
const debounce = (fn: (value: string) => void, delay = 0, immediate = false) => {
    let timeout: ReturnType<typeof setTimeout>
    
    return (...args: any) => {
      if (immediate && !timeout) fn(args[0])
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn(args[0])
      }, delay)
    }
}

export function useDebounce(initialValue: string, delay: number, immediate: boolean) {
    const state = ref(initialValue)
    const debouncedRef = customRef((track, trigger) => ({
      get() {
        track()
        return state.value
      },
      set: debounce(
        value => {
          state.value = value
          trigger()
        },
        delay,
        immediate
      ),
    }))

    return debouncedRef
}