# Componente de Gráficos (`chart.tsx`)

Este diretório contém um componente React altamente customizável para renderização de gráficos utilizando a biblioteca [Recharts](https://recharts.org/). Ele foi desenvolvido para facilitar a criação de gráficos temáticos, com tooltips, legendas e estilos dinâmicos, integrando facilmente com temas claros e escuros.

## Componentes Exportados

- **ChartContainer**: Componente principal que provê contexto e estilização para os gráficos.
- **ChartTooltip**: Tooltip padrão do Recharts.
- **ChartTooltipContent**: Tooltip customizado, com suporte a ícones, formatação e múltiplos estilos de indicador.
- **ChartLegend**: Legenda padrão do Recharts.
- **ChartLegendContent**: Legenda customizada, com suporte a ícones e estilização.
- **ChartStyle**: Componente responsável por injetar estilos CSS dinâmicos baseados na configuração do gráfico.

## Como Usar

### Exemplo Básico
```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from './chart';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const config = {
  vendas: {
    label: 'Vendas',
    color: '#4f46e5',
  },
  lucro: {
    label: 'Lucro',
    color: '#16a34a',
  },
};

export default function MeuGrafico({ data }) {
  return (
    <ChartContainer config={config}>
      <LineChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Line type="monotone" dataKey="vendas" stroke="var(--color-vendas)" />
        <Line type="monotone" dataKey="lucro" stroke="var(--color-lucro)" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
```

### Propriedades do `config`
O objeto `config` define as cores, ícones e rótulos de cada série do gráfico. Exemplo:
```js
const config = {
  nomeDaSerie: {
    label: 'Nome para exibir',
    color: '#cor',
    icon: MeuIconeOpcional,
  },
};
```

- `label`: Nome exibido na legenda e tooltip.
- `color`: Cor principal da série (usada via CSS custom property).
- `icon`: (Opcional) Componente React para exibir um ícone na legenda/tooltip.

### Temas
O componente suporta temas claro e escuro automaticamente, aplicando as cores definidas no `config`.

### Tooltips e Legendas Customizadas
- `ChartTooltipContent` e `ChartLegendContent` permitem customizar a aparência e o conteúdo das tooltips e legendas, incluindo ícones e diferentes estilos de indicador.

## Dicas
- Sempre utilize o `ChartContainer` como wrapper do seu gráfico.
- Use as variáveis CSS (`var(--color-nomeDaSerie)`) para garantir que as cores do seu gráfico respeitem o tema e a configuração.
- Consulte a documentação do [Recharts](https://recharts.org/en-US/api) para mais opções de gráficos e propriedades.

## Dependências
- [React](https://react.dev/)
- [Recharts](https://recharts.org/)

## Licença
Este componente pode ser utilizado e modificado livremente dentro do seu projeto. 