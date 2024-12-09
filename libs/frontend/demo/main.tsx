import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, buttonVariants } from '../dist/components';
import '../dist/style.css'

function App() {
  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center',alignItems: 'center'}}>
      <Button variant={'destructive'} >
        Shadcn Button
      </Button>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
