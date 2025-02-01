---
date: 2024-01-11
title: "Guia basico e rapido para começar a programar(com IA)"
url: https://www.linkedin.com/in/joas-neves-b8340a290/
excerpt: "Explicando um pouco o processo de I.A nessa geração"
tags:
  - ia
  - tutorial
---

# Guia basico e rapido para começar a programar(com IA, eu acho)

## Introdução

#### Uma breve apresentação e explicação

Olá, caro companheiro da internet! Você estava sem nada para fazer, assim como eu, e olhou para este arquivo aleatório pensando: "Por que não?" E agora está lendo neste exato momento em que estou escrevendo? Mas, tudo bem, não preciso explicar o porquê. Acho melhor começar explicando algumas coisas.

Pensei em escrever isso para enviar a algumas pessoas que possam precisar de ajuda posteriormente com programação, uma área que eu amo e amo aprender. Além de aprender, gosto de ensinar e conversar sobre ela. Sempre quis ter algo desse tipo no meu perfil. Então, mesmo que eu tenha apenas, sei lá, 2 ou 3 anos de prática em programação, pensei: por que não compartilhar com o mundo o meu jeito estranho de pensar?

### Introdução de verdade

Indo ao assunto mais rápido possível, vou dar uma rápida passada em o que eu aprendi ou penso sobre o funcionamento dessa área, no caso, na área mais mecânica e repetitiva que tanto me estresso e amo: programação.

Primeiro, estamos aqui para aprender, certo? Então vou contar um pequeno segredo para você: programação não é um bicho de sete cabeças que você tem que procurar nos lugares mais obscuros para encontrar. Poxa, estou escrevendo um artigo sobre isso agora; é claro que não é. Então, de acordo, vamos a outro ponto que acho importante.

Qualquer um pode aprender a programar. E quando digo qualquer um mesmo (eu não tenho um computador potente), amigo, existem vários sites onde você pode usar um console virtual, e será perfeito para este artigo. Até porque o que eu quero ensinar é o básico, e no final vou contar um segredo.

Vou continuar com mais um ponto para fechar. Você não começa procurando tudo e sabendo tudo. Você não precisa realmente entender como funciona tudo ao mínimo detalhe. Na verdade, se você achar interessante, sugiro muito que siga seus instintos. Mas você realmente não precisa saber que linguagem serve para que coisa, e qual compila mais rápido que a outra, ou sei lá o que, para começar. Você deveria apenas começar. E dizendo isso, **ALLONS-Y!!!**

### Ferramentas

Duas coisas que eu preciso muito que vocês façam:

- 1 - Criem uma conta no [GitHub](https://github.com/).
- 2 - Criem uma conta no [Replit](https://replit.com/).

Como quero que isso seja o mais acessível possível, o Replit permite uma construção muito rápida e fácil do que realmente vamos usar (códigos). Esqueçam comandos e sei lá o que. Eu quero mostrar a vocês códigos, e é isso que vamos ver. E sim, será no console, então prestem atenção.

Assim que vocês criarem suas contas no Replit e chegar a hora, a temida hora de escolher uma linguagem de programação para começar (ainda estão aí?), bem, vou começar com C#. Mas mais para frente vou mostrar outras e explicar por que escolhi essa especificamente.

## Codando em sí

CALMA! NÃO SE ASSUSTEM, brincadeira, eu sei que são apenas palavras que na verdade são 0 e 1, mas não explicar isso e apenas uma piada. BUT continuando, não se assustem, vou explicar o que cada coisa é. Se você criou um projeto C#, provavelmente no arquivo `main.cs` já tem algo escrito. Obviamente, vou explicar o que está ali dentro, mas de forma rápida. Esse depois do ponto é o que geralmente especifica a linguagem. Por exemplo, C# é representado por .cs, JavaScript por .js, Python por .py, e assim por diante. O primeiro nome em algumas coisas é importante(nesse caso o main), mas você consegue mudar. Só não mude agora, okay?

Sem delongas e enrolação, vamos às explicações básicas do que é cada coisa e o que faz cada coisa:

```C#
using System;

class Program {
  public static void Main (string[] args) {
    Console.WriteLine ("Hello World");
  }
}
```

`using System; ` é a maneira que o C# utiliza para chamar a biblioteca System. Vamos explorar bibliotecas e pacotes mais para frente.

`class Program ` é uma classe. O que é uma classe? Vou explicar isso depois.

`public static void Main(string[] args) ` é uma função! E adivinha, também não vou explicar agora, he he he. Mas

`Console.WriteLine("Hello World"); `, essa eu vou sim explicar. Essa é nada menos do que um comando, e você assim executa o primeiro comando que sai a mensagem no console "Hello World", emocionante, né? Não? Ah, mas você vai achar.

Obs: C# tem muita birrinha, então sempre termine os comandos com `;`, se não algo vai dar errado e você vai ficar com medo. É verdade esse bilhete.

#### Pequenas resalvar e observações que não vou me adentrar muito

Você notou que sempre que iniciamos uma classe, ela possui chaves {}? Bem, as chaves indicam que a função public static void Main(string[] args) está dentro da classe. E a função também possui chaves {}, logo os comandos estão dentro da função. Então, a classe tem a função e a função tem os comandos. É isso aí, próximo!

### colocando a mão na massa

Tá, entendi que criamos um projeto, e você acha que eu estou enrolando muito para explicar as coisas. E agora? Bem, agora, meu amigo, vamos criar uma variável. O que é uma variável? Ah, pesquisa! Estou aqui para te ensinar a lógica das coisas. Em suma, uma variável é um valor. Ela pode ser tanto um número quanto uma palavra. Então, vamos fazer um código que conte até dez, ok?

em cima do `Console.WriteLine ("Hello World");` voce vai escrever o seguinte, `int um = 1`;

Em cima do `Console.WriteLine("Hello World");`, você vai escrever o seguinte: int um = 1;. Aí, como você viu que o Console.WriteLine escreve o que está escrito, você simplesmente copia ele mesmo, "to nem aí", e cola embaixo. Só que, em vez de "Hello World", você coloca apenas um entre os parênteses, então ficaria `Console.WriteLine(um);`.

Ta, mas o que você acabou de fazer?

Você acabou de criar uma variável chamada um e atribuiu a ela o valor 1. Depois, você imprimiu o valor dessa variável no console usando `Console.WriteLine(um);`, acho que ficaria assim né.

```C#
class Program
{
    public static void Main(string[] args)
    {
        int um = 1;
        Console.WriteLine("Hello World teste");
        Console.Write(um);
    }
}
```

### Maneira burra vs maneira inteligente, ou quase isso

Tá, nosso objetivo é contar até dez. Mas você teria INÚMERAS maneiras de fazer o código chegar até dez, seja de maneira mais burra, até a mais simples, ou sei lá, hackear o site e colocar para todo código rodar 1, 2, 3, 4... 10 (fiquei com preguiça).
No teu caso, vamos fazer de maneira burra: repetir o que deu certo e colocar no código.

```C#
class Program
{
    public static void Main(string[] args)
    {
        int um = 1;
        int dois = 2;
        int tres = 3;
        int quatro = 4;
        int cinco = 5;
        int seis = 6;

        Console.Write(um);
        Console.Write(dois);
        Console.Write(tres);
        Console.Write(quatro);
        Console.Write(cinco);
        Console.Write(seis);
    }
}
```

Dessa maneira, você consegue escrever até dez (não está até dez, mas se ficar repetindo vai até onde você tiver paciência). No entanto, isso é uma maneira burra (bem burra). Além de criar várias variáveis desnecessárias, você repete um monte de coisa e escreve um monte de comandos desnecessários.

Então, o que você propõe?

Bem, eu proponho nossa primeira palavra-chave: `while` que significa enquanto em ingles.

#### While

Bem, o while não tem muito segredo. Ele repete uma linha de código dentro do escopo dele, ou seja, entre as chaves {}. Ele pede uma condição.

O que é uma condição?

Uma condição é como se fosse uma pergunta que você faz ao computador, podendo ela ser:

- x == y (x é igual a y)
- x >= y (x é maior ou igual a y)
- x < y (x é menor que y)
- x != y (x é diferente que y)

E assim vai. obs: um igual (=) você esta atribuindo o valor, dois iguais (==) você esta comparando os valores.

Então, faremos o seguinte: como queremos que ele conte até dez, quero que minha variável int x, que antes era minha variável int um, seja o valor que será alterado (sim, podemos alterar o valor depois de executar o código).

Então, quero que ele execute meu código ENQUANTO ele (o x) for MENOR que dez.

```c#
while(x < 10){
  Console.WriteLine(x);
}
```

Só um pequeno pormenor: desse jeito, o x sempre será 1, porque foi o valor atribuído inicialmente a ele. Então, a pergunta é: como alterar o valor de x?

Bem... é só você chamar o x de novo e dizer que ele é igual a ele mais 1. Pera, o quê? É, programação! YEY!

```bash
x = x + 1;
```

Se tudo estive certo provavelmente vai ficar

```c#
        int x = 0;
        while (x < 10)
        {
            Console.WriteLine(x);
            x = x + 1;
        }
```

Tá, mas ele contou até o nove. Sim, porque você disse que ele era verdadeiro até ser nove. Você deveria ter especificado "menor ou igual a 10", cara... que vacilo.

### O jeito I.A

Então, amigos, chegamos ao ponto em que me veio essa ideia de guia, o jeito IA. Bem, estamos em uma nova era de tecnologia e uma nova era de indústria e bla bla bla. Bem, pensando nisso, eu pensei em quem está vindo depois da IA. Um esclarecimento rápido: eu, a pessoa que está escrevendo isso, aprendi a lógica de programação antes da IA, mas vivo em uma era depois da IA. Então, estou entre esses dois?

Pois bem, o ponto é: temos uma grande ferramenta que pode auxiliar qualquer um que está começando a entrar nesse mundo de programador ou desenvolvedor. Só que existe um grande perigo, um abismo que me preocupa, que é a facilidade da IA em gerar códigos.

Mas espera, se a IA tem uma facilidade de gerar códigos, por que estou preocupado? Então, ela é muito boa em gerar códigos sim, porém não tão úteis ou funcionais. Talvez em um futuro não tão distante eles sirvam para gerar ou criar códigos extremamente perfeitos. Até porque estão surgindo várias IA voltadas para isso e estão em constante evolução. Mas penso eu, como fica alguém que acabou de entrar nesse mundo, escreve uma linha de código e aparecem 55 linhas e não sabe NADA do que está acontecendo ou o que ela está fazendo para você.

#### Ferramenta X Atalho

Visando isso, penso que não deveríamos começar a pesquisar e aprender conceitos básicos como orientação a objetos, estrutura de código, funções, etc. Por exemplo, se você pedir para a IA criar uma espécie de navegador para você, ela vai te dar um navegador. Mas como você vai juntar essas partes caso precise que ela crie mais coisas para o navegador? Você vai saber o que cada coisa faz? Você vai entender o funcionamento daquele código?

Estudar bibliotecas, lógicas e como funciona a orientação a objetos são coisas que você, como ser humano, precisa entender. A capacidade de ler o código que lhe foi entregue e entender o seu funcionamento, entender o que aquilo faz e como aquilo funciona. Então, penso eu, por que não tentamos usar a IA para terminar nosso projetinho de código?

### Subindo de level

Vamos aumentar um pouquinho a dificuldade. Eu quero agora que os números que sejam impressos sejam de 0 até 10, porém eu quero mostrar somente os números primos. "Nossa, parece difícil", você se pergunta. Eu te falo: "Não é nada", até porque eu já sei como resolver. Mas se eu não soubesse, eu tentaria achar um jeito de resolver, afinal, é um exercício. Mas como? Como resolver algo que não sei, como um WHILE, sendo o único conhecimento que eu possuo? Bem, vou olhar no ChatGPT e escrever "em C#, crie um contador que conte até 10 e somente imprima os números primos", e pegar o resultado óbvio.

bem se voce escreveu exatamente isso:

```bash
em C#, crie um contador que conte até 10 e somente imprima os números primos
```

E ele devolveu isso (como foi o meu caso, caso tenha sido outra coisa contigo, vamos ver se se assemelha).

```c#
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Números primos até 10:");
        for (int i = 2; i <= 10; i++)
        {
            if (IsPrime(i))
            {
                Console.WriteLine(i);
            }
        }
    }

    static bool IsPrime(int number)
    {
        if (number <= 1)
        {
            return false;
        }

        if (number == 2)
        {
            return true;
        }

        if (number % 2 == 0)
        {
            return false;
        }

        int sqrt = (int)Math.Sqrt(number);
        for (int i = 3; i <= sqrt; i += 2)
        {
            if (number % i == 0)
            {
                return false;
            }
        }

        return true;
    }
}
```

#### Entendendo o codigo

Eu usei esse comando 3 vezes no Bash, e as 3 vezes ele me devolveu o mesmo código. Ok, mas o que cada coisa faz? Isso está errado? Eu devo desistir da programação e tentar entrar em um curso de administração???

Não, amigo, acalme seu coração. Vamos entender o que aconteceu. Assim que entender o que fazer com esse código. Primeira pergunta: o que cada coisa faz? Bem, se você estava vendo algo e não sabe o que é esse algo, pesquise ou peça à IA para te explicar o código mesmo.

#### for

Bem, o que é o for? O for nada mais é que um while, só que limitado, ou quase isso. Deixe-me explicar. Enquanto o while é usado para executar sempre que uma condição é verdadeira, o for irá sim utilizar uma condição em seu parâmetro. Porém, ele também permite executar uma espécie de mini-comando nele (programadores, não me batam).

Ficaria assim: `for (crie uma variável; enquanto essa variável for, sei lá o que; variável tantos)`. Sacou? Não? Por isso que ele usou `for (int i = 2; i <= 10; i++)`. Como queríamos contar até 10, já tínhamos uma variável que iria chegar até 10, que é o i. Então, ele disse que se i for menor que 10, execute o `for`, e depois que o for é executado, ele adiciona mais um no `for`, assim evitando que ele fique infinitamente executando o `for`.

#### if

Bem, o `if` é uma das palavras-chave mais importantes a serem utilizadas. Toda linguagem de programação tem seu if e seu else, ou seu else if. E como o inglês fala, "SE", se a condição passada para o if for verdadeira, execute o que está dentro dele, como while ou for. Ele funciona com uma condição e só irá executar a ação dentro dele se a condição for atendida. Simples, não?

Tá, mas esse `else` que ele mandou é o que? Bem, isso é nada menos que um "se não". Então, se a condição não for atendida, execute o else, que não possui parâmetro. Sacas? É tudo bem simples quando você passa para a linguagem das pessoas. É tudo lógica, cara!

#### Função (isPrime)

Preciso que você preste bastante atenção aqui, ok? Lembra que eu disse que iria explicar as funções depois? Então, cá estamos. O amiguinho ChatGPT acabou criando uma função para verificar se aquele número é primo.

a mas o que é uma função? e por que ele criou isso? o que ta acontecendo. bem nem eu sei mais, só sei que, a função é nada mais nada menos que uma espece de codigo encapsulados, por exemplo voce fez um codigo que faz x coisa, ai voce precisa fazer x coisa umas tres ou quatro vezes, mas pra isso voce precisa escreve esse codigo mais quatro vezes, voce um programado mais sabio que o proprio Bill Gates então faz o seguinte, voce cria uma função, voce escreve um comando dentro dessa função e a chama, sendo assim isPrimo é o nome da função e ele é criado na seguinte linha de codigo:

```c#
    static bool IsPrime(int number)
    {
        if (number <= 1)
        {
            return false;
        }

        if (number == 2)
        {
            return true;
        }

        if (number % 2 == 0)
        {
            return false;
        }

        int sqrt = (int)Math.Sqrt(number);
        for (int i = 3; i <= sqrt; i += 2)
        {
            if (number % i == 0)
            {
                return false;
            }
        }

        return true;
    }
```

Vamos lá, analisar o que está acontecendo aqui. Quando ele escreve "static bool IsPrime(int number)" e coloca o código entre {}, ele cria uma função, certo? Entendemos até aqui. Mas esse `static` e esse `bool`? Bem, no C#, quando se cria uma função, você precisa atribuir algumas palavras-chave antes de colocar o nome. "Bool" é uma variável, assim como "int", só que ela diz se algo é verdadeiro (true) ou falso (false). E "static" é apenas para indicar que é uma função mesmo. Já esse "(int number)" é o tipo de item que ela vai receber depois que você chamar. Nesse caso, ela só vai aceitar variáveis do tipo int.

Tá, mas esse `return false` ou esse `return true`? O que é? Bem, ele é o que a função vai retornar. Quando você cria uma função, pode optar por ela retornar algum valor. E como ele retorna um tipo bool, ele retorna false ou true, verdadeiro ou falso. Mas, se por exemplo fosse um "static string" (variável para palavra), ele poderia retornar uma palavra escrevendo "return palavra".

#### Tá, mas e agora?

Bem, agora que você entende o que cada coisa faz nesse código, você pode notar (ou talvez não) umas coisas que não fazem sentido nesse código. Por exemplo, na função isPrime, ele cria 3 "if" e um "for" dentro de um "if", que sinceramente não sei por que motivo ele fez isso. Isso que tento explicar: a IA ajuda, você viu uma base muito sólida de como resolver esse problema. Ele atende sim, mas existem maneiras melhores de fazer isso. Se, por exemplo, transformássemos isPrime em:

```C#
static bool IsPrime(int number)
    {
        bool ePrimo = true;
        for (int divisor = 2; divisor <= Math.Sqrt(number); divisor++)
        {
            if (number % divisor == 0)
            {
                ePrimo = false;
                break;
            }
        }
        return ePrimo;
    }
```

Teríamos menos linhas de código, menos "if" sem necessidade, uma legibilidade melhor e algo bem mais fluído. Pensando assim, o ChatGPT deu realmente uma conclusão, porém não a melhor solução.

### Conclusão

Ao todo, estou dizendo que, utilize sim o ChatGPT, ou o Bard, Copilot ou sei lá o que. As IAs são úteis e estão aqui, mas não as use continuamente, pois os códigos que elas fornecem nem sempre são as melhores soluções. Caso você precise de uma biblioteca para gerar uma janela, peça ao ChatGPT para fazer uma janela, mas pesquise por que aquela biblioteca está sendo utilizada, ou por que aquela linha de código está ali. Verifique se há real necessidade dela estar ali ou não. E se você está vendo algo que é novo para você no código, pesquise também.

Programar é um eterno aprendizado. Você nunca vai decorar todas as bibliotecas; você sempre vai aprender um truque ou outro. E se você está usando IA para codificar, pare. Use IA para aprender. Peça coisas específicas, partes de código. Diminua o escopo. Procure erros primeiro na internet, depois na IA. Pesquise, explore.

Escrito por [Joas](https://github.com/joashneves)
