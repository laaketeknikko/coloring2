onmessage = function (event) {
   console.log("got data from main: ", event.data)

   if (!event.data || !Array.isArray(event.data)) {
      return null
   }

   const files = event.data

   for (const file of files) {
      console.log("file: ", file)
      /*      processImage(file).then((dataUrl) => {
         this.postMessage(dataUrl)
      })
      */
   }
}
