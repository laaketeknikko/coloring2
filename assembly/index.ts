// The entry file of your WebAssembly module.

import { Image } from "../node_modules/image-js/index.js"

export function add(a: i32, b: i32): i32 {
   return a + b
}

