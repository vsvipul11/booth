AFRAME.registerComponent('tap-place', {
    init() {
      const ground = document.getElementById('ground')
      ground.addEventListener('click', (event) => {
        // Create new entity for the new object
        const newElement = document.createElement('a-entity')
  
        // The raycaster gives a location of the touch in the scene
          // const touchPoint1 = event.detail.intersection.point
       const touchPoint = a-image
        newElement.setAttribute('position', touchPoint)
        
        const randomYRotation = Math.random() * 360
        newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)
  
        newElement.setAttribute('visible', 'false')
        newElement.setAttribute('scale', '0.0001 0.0001 0.0001')
  
        newElement.setAttribute('shadow', {
          receive: false,
        })
  
        newElement.setAttribute('gltf-model', '#model')
        this.el.sceneEl.appendChild(newElement)
  
        newElement.addEventListener('model-loaded', () => {
          // Once the model is loaded, we are ready to show it popping in using an animation
          newElement.setAttribute('visible', 'true')
          newElement.setAttribute('animation', {
            property: 'scale',
            to: '7 7 7',
            easing: 'easeOutElastic',
            dur: 800,
          })
        })
      })
    },
  })