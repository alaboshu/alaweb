const getTouch = (event) => {
  return event.changedTouches[0] || event.touches[0]
}

export {
  getTouch
}
