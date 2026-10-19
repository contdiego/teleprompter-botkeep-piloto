# Piloto Teleprompter no Botkeep

Copia isolada do HTML publico do Teleprompter. A hospedagem de producao permanece inalterada.

Perfil Botkeep: Application / Node.js 22. Comando: `npm start`.
O servidor usa `SERVER_PORT`, depois `PORT`, com fallback local para 3000, e escuta em `0.0.0.0`.
Nao ha dependencias externas, tokens, arquivos de configuracao privados ou banco de dados.

Somente `/`, `/index.html`, `/teleprompter.html` e `/healthz` sao atendidos.
Todas as respostas usam anti-cache; os demais caminhos retornam 404.
HTTPS deve ser habilitado em Domains no Botkeep para camera e microfone.
Videos e roteiros sao processados no navegador; localStorage e permissoes pertencem a cada origem.

Orcamento inicial: 128 MB de RAM, 128 MB de disco e 10% de CPU.
Esta copia nao altera o codigo funcional do HTML nem a hospedagem Hostinger.
