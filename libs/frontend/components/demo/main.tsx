import { createRoot } from 'react-dom/client';
import { Button } from '@/index';
import  '@/index.css';
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
