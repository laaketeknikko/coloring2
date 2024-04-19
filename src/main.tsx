import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { PrimeReactProvider } from "primereact/api"

import "./styles/styles.css"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <PrimeReactProvider>
         <App />
      </PrimeReactProvider>
   </React.StrictMode>
)

