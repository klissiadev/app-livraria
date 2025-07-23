import React from 'react'

const NotFound = () => (
  <main style={{flexDirection:'column', width:'100%'}}>
    <h2>404 - Not Found</h2>
    <div style={{width:'100%', display:'flex',alignItems:'center',flexDirection:'column'}}>
      <h1 style={{ fontSize:'20px', padding:'1em', textAlign:'center'}}>Página não encontrada ou removida.</h1>
      <img src="/imagens/notfound.png" alt="" style={{margin:'2em'}}/>
    </div>
  </main>
)

export default NotFound;
