import React from 'react'

const NotFound = () => (
  <main className="principal">
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <h1 style={{ padding: '50px'}}>404!</h1>
      <img src="/imagens/notfound.png" alt="" style={{padding:'20px'}}/>
      <p>
        Página não encontrada ou removida.
      </p>
    </div>
  </main>
)

export default NotFound
