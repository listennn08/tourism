export function useModal() {
  const modalOpen = ref(false)
  const toggleModal = (v: boolean) => modalOpen.value = v

  watch(modalOpen, () => {
    if (modalOpen.value) {
      document.body.classList.add('modalOpen')
    } else {
      document.body.classList.remove('modalOpen')
    }
  })
  return {
    modalOpen,
    toggleModal,
  }
}