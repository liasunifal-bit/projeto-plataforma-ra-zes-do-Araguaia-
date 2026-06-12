# Alinhamento Técnico — Cache do Service Worker para Tiles Offline
**Para:** Henrique (Tech Lead)  
**De:** Flavio (Mapa e Geolocalização)  
**Contexto:** Funcionalidade de Mapas Offline/Self-Hosted (`feat/flavio-mapa`)

---

## 1. Descrição do Recurso
Para viabilizar o funcionamento offline do mapa na zona rural de Brejo Grande do Araguaia, substituímos o provedor de tiles online por uma estrutura estática local no diretório:
```text
frontend/public/tiles/{z}/{x}/{y}.png
```
Nossos arquivos locais abrangem os níveis de zoom de **13 a 18** em um quadrado geográfico de aproximadamente 15km x 15km focado no centro da cidade.

## 2. Necessidade do PWA
Para garantir o comportamento `offline-first` resiliente, precisamos que o Service Worker pré-carregue (precache) ou intercepte com uma estratégia de cache as requisições para `/tiles/`.

## 3. Recomendação de Implementação
Sugerimos que no arquivo de configuração do seu Service Worker (Vite PWA, Workbox ou similar) seja adicionada a seguinte regra de cache estratégico:

### Exemplo de Configuração com Workbox:
```javascript
// Interceptar requisições da pasta /tiles/ com estratégia CacheFirst
registerRoute(
  ({ url }) => url.pathname.startsWith('/tiles/'),
  new CacheFirst({
    cacheName: 'map-tiles-offline',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,          // Limite seguro de tiles armazenadas
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias de cache persistente
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
```

### Exemplo de Configuração de Precache (se preferível baixar tudo no install):
Se o total de tiles gerado no MOBAC for reduzido (ex: < 5MB), podemos adicioná-lo à lista de `globPatterns` do PWA:
```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}', 'tiles/**/*.png']
}
```

*Por favor, verifique qual a melhor abordagem dentro da arquitetura global de PWA que você está liderando!*
