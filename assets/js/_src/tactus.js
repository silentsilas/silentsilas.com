// https://blogs.perficientdigital.com/2017/11/21/detecting-the-use-of-a-touch-screen/

// Set a variable detecting the existence of touch events
var _hasEvents = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
var _isTouchCached = null
var _isListening = false

// Default isTouch check
export function isTouch () {
  return new Promise(function (resolve, reject) {
    if (_isTouchCached != null) {
      resolve(_isTouchCached)
    }
    // If the browser supports touch events
    if (_hasEvents) {
      // Add the mouse/touch event listeners
      _addListeners(resolve, reject)
    } else {
      // If the browser doesn't support touch events
      resolve(false)
    }
  })
}

// The function to add the mouse/touch event listeners
function _addListeners (resolve, reject) {
  window.touch_promise = resolve

  if (_isListening) {
    reject('Already listening for touch/mouse.')
    return
  }

  _isListening = true

  // Add the mouse event listener
  window.addEventListener('mousemove', _checkForMouse)

  // Add the touch event listener
  window.addEventListener('touchstart', _checkForTouch)
}

function _checkForMouse (e) {
  // Remove the mouse/touch event listeners
  _removeListeners()

  _isTouchCached = false
  e.currentTarget.touch_promise(false)
}

function _checkForTouch (e) {
  // Remove the mouse/touch event listeners
  _removeListeners()

  _isTouchCached = true
  e.currentTarget.touch_promise(true)
}

// The function to remove the mouse/touch event listeners
function _removeListeners () {
  _isListening = false

  // Remove the mouse event listener
  window.removeEventListener('mousemove', _checkForMouse)

  // Remove the touch event listener
  window.removeEventListener('touchstart', _checkForTouch)
}
export default { isTouch }
