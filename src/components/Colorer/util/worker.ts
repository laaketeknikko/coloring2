const coloringWorker = new Worker("./scripts/work.js")

coloringWorker.onmessage = (event) => {
   console.log("got data from worker: ", event.data)
}

const runColoring = (files: Array<File>) => {
   console.log("in runcoloring with files: ", files)
   coloringWorker.postMessage(files)
}

export { runColoring }
