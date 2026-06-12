# Tiles de Mapa Offline — Brejo Grande do Araguaia

Este diretório armazena os recortes de mapa (tiles) estáticos no padrão OSM para uso offline da aplicação na região de Brejo Grande do Araguaia - PA.

## Estrutura do Diretório
As tiles devem ser exportadas pelo MOBAC (Mobile Atlas Creator) na estrutura padrão de subdiretórios:
```text
/tiles/{z}/{x}/{y}.png
```
Onde:
- `{z}`: Nível de Zoom (13 a 18)
- `{x}`: Coordenada X do grid de projeção do tile
- `{y}`: Coordenada Y do grid de projeção do tile

## Configurações do Mapa Offline
* **Zoom Mínimo:** 13
* **Zoom Máximo:** 18
* **Limites Geográficos (Bounds):** Quadrado aproximado de 15km x 15km centralizado nas coordenadas de Brejo Grande do Araguaia:
  * Centro: `Latitude: -5.7032, Longitude: -48.4048`
  * Delimitação de Pan e Limite de Movimentação configurada na aplicação para evitar visualização de áreas sem tiles locais.
