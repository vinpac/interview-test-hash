# Calculadora de Antecipação

Hoje nossos clientes precisam saber quanto custa antecipar uma transação, e para isso, precisamos desenvolver uma calculadora de antecipação para que os mesmos consigam saber quais valores receberão caso optem por antecipar o recebimento.

## Como rodar localmente

```shell
yarn # Instala as dependências
yarn dev # Roda o ambiente em desenvolvimento
```

## Como rodar os testes

```
yarn test
```

## Stack

- React.js 17.x.x
- Next.js 10.x.x
- TailwindCSS 2.x.x
- Jest 26.x.x
- Prettier
- React Intl

## Decisões

1. **TailwindCSS**

Essa biblioteca oferece uma forma mais simples e direta de aplicar CSS. Uma propriedade como `display: inline-block` pode ser aplicada com `class="inline-block"`. Outros bons exemplos são `border`, `rounded` (border-radius), `w-{x}` (width), `h-${x}` (height). [Você pode ver todas aqui](https://tailwindcss.com/).

Além disso é uma ótima ferramenta para sistematizar o Design. Utilizando as classes oferecidas pelo Tailwind conseguimos cada vez mais escrever menos CSS e sincronizar o Design e Programação, facilitando atingir Layouts Pixel-Perfect.

2. Next.js

É o framework mais conceituado atualmente na comunidade de React. Sendo utilizado por empresas como [Netflix](https://nextjs.org/showcase/netflix-jobs), [Twitch](https://nextjs.org/showcase/twitch), [Playstation](https://nextjs.org/showcase/playstation), [entre outros](https://nextjs.org/showcase), se tornou uma escolha segura e efeciente para construção de aplicações escritas em React.

3. React Intl

Vendo que a [página de cultura para testes da Hash](https://tech-culture.hash.com.br/) era em inglês, eu decidi por fazer o teste nas duas linguas para demonstrar que tenho em experiência em criar projetos internacionais.
