import './App.css'
import Layout from './layouts/Layout'
import { Toaster } from 'sonner'
import "@fontsource/marcellus";

function App() {

  return (
    <div style={{ fontFamily: 'Marcellus, serif' }}>
      <Toaster position="top-center"/>
      <Layout />
    </div>
  )
}

export default App
