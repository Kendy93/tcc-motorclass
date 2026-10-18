```
Esse é um assunto que pode abranger diversas partes e sistemas, por esse motivo, a plataforma delimitará sua abordagem aos sistemas de indução forçada, cujo propósito consiste em maximizar a entrada de ar na câmara de combustão para incrementar o rendimento e a potência do motor.

Devido à essa escolha, esta seção abordará o funcionamento de turbocompressores, compressores mecânicos (supercompressores), sistemas de injeção de nitrometano e os métodos de aumento físico do deslocamento volumétrico. O impacto dessas tecnologias na dinâmica dos gases será demonstrado de forma detalhada por meio dos recursos animados.

Além dos componentes já mencionados e suas partes internas, os \textit{intercoolers} também serão apresentados, sendo um elemento que opera como um elo de intersecção entre o fluxo de indução forçada e o sistema de arrefecimento do veículo.

Por fim, será evidenciado que a maior parte das falhas associadas a essas modificações decorre de implementações isoladas e sem o reajuste sistêmico necessário. Por exemplo, se o motor recebe mais ar, é preciso que haja um aumento proporcional na entrega de combustível, que por sua vez gera a necessidade de um resfriamento mais eficiente para evitar danos ao motor.

Controle da pressão do turbo observando o aumento do fluxo de ar
```

**MODELO PRINCIPAL**
![Placeholder](https://picsum.photos/id/36/700/400)

# Aumentando a potência

Até aqui, já vimos os principais sistemas que fazem parte do motor e trabalham para que ele gere movimento. A partir do próximo capítulo iremos ver como esse movimento é usada e controlada, mas antes disso vamos estudar algumas maneiras de aumentar a força gerada pelo motor.

Para gerar mais potência, é preciso aumentar a quantidade de energia que o motor consegue transformar em movimento. Existem diversas maneiras de fazer isso. Você pode aumentar o tamanho do motor, melhorar a qualidade do ar e combustível ou então forçar mais ar para dentro dos cilindros. Porém, o motor é um sistema complexo, onde todos os seus subsistemas trabalham em conjunto, por isso, alterar uma parte dele, geralmente pede uma mudança em outra parte para que o funcionamento continue como deveria.

## De onde vem a potência extra?

Como você pode ter imaginado a essa altura, quanto mais combustível conseguimos queimar, mais energia pode ser liberada durante a combustão. Porém, se só adicionarmos o combustível, chegamos em uma mistura muito rica, por isso uma quantidade proporcional de ar também deve ser adicionada. É justamente por isso que modificações que aumentar a potência não devem ser feitas de forma isolada. Por exemplo, os turbocompressores que iremos ver, conseguem colocar mais ar no motor, mas com eles é preciso melhorar também o sistema de combustível, ignição e arrefecimento.

Uma das formas mais simples de conseguir mais ar e combustível no motor é aumentar seu tamanho - a cilindrada que falamos no módulo 1. Para conseguirmos preencher ele volume disponível nos cilindros, usamos a eficiência volumétrica.

Simplificando, um motor de 5 litros não serve de nada se só 2 litros dele são usados, a eficiência volumétrica indica o quanto o motor consegue aproveitar do volume disponível para admitir ar. Isso significa que existem duas maneiras principais de aumentar a quantidade de ar disponível para a combustão, aumentar o espaço disponível ou preencher esse espaço de forma mais eficiente.

O primeiro modo leva ao aumento da cilindrada, como passar nosso motor de 4.1 para 4.4 litros. A segunda está relacionada principalmente aos sistemas de indução forçada, que serão o foco deste módulo.

### Indução forçada

Esse é o nome dado ao uso de partes que aumentam a pressão do ar que entra no motor. Os dois sistemas mais comuns são o *turbocompressor (turbo)* e o *compressor mecânico (supercompressor ou supercharger)*.

Esses dois dispositivos trabalham de maneiras diferentes, porém com o mesmo objetivo. Para entender como eles funcionam, vamos falar um pouco sobre pressão, densidade e a diferença entre volume e quantidade de ar.

Imagine dois potes do mesmo tamanho. Se um deles estiver sob uma pressão maior, haverá mais moléculas de ar ocupando seu espaço interno, aumentando a densidade. Mesmo que os dois tenham 1 litro de capacidade, a quantidade real de ar neles pode variar dependendo dessa pressão.

Assim, a ideia da indução forçada é aumentar a pressão para colocar mais ar no mesmo volume, com isso conseguir queimar mais combustível e no final conseguir mais potência. Além de aumentar a pressão, isso também aumenta a temperatura, por isso, melhorias em outros sistemas do veículo também precisam ser feitas.


#### O turbocompressor

O turbocompressor, popularmente chamado de *turbo* é o sistema de indução forçada mais conhecido e comum. Seu princípio é relativamente simples: aproveitar parte da energia perdida nos gases do escape para comprimir o ar que entra no motor.Dentro do turbo, ele é formado por duas partes principais, a turbina e o compressor.

A *turbina* fica no caminho dos gases de escape, também chamada de caixa quente. Quando esses gases passam pela turbina, suas pás giram e esse movimento é transmitido para o compressor por um eixo.

Do outro lado, fica o *compressor*, ou caixa fria. Ele recebe o ar vindo da admissão é o comprime antes de enviá-lo para o motor. Como consequência, mais ar pode ser colocado nos cilindros a cada ciclo.

**TURBO E OS CAMINHOS**
![Placeholder](https://picsum.photos/id/36/700/400)

Seguindo o ar que passa pelo motor podemos ter a seguinte visão do caminho que ele faz nos motores turbo. Primeiro ele é capturado pelo sistema de adminissão e passa por um filtro de ar. Em seguida, chega ao compressor, onde sua pressão aumenta. Esse ar comprimido pode passar por um intercooler (iremos falar sobre isso) antes de chegar ao coletor de adminissão e então ao cilindro.

Depois da combustão, os gases queimados saem do cilindro pelas válvulas de escape e o coletor. Em vez de irem diretamente para o restante do escapamento, eles passam pela turbina, fazendo-a girar antes de continuarem seu caminho até o restante do sistema de exaustão.

É preciso deixar claro que aumentar a pressão não significa que podemos continuar aumentando a potência infinitamente. Pressões maiores significam forças maiores nos pistões, bielas, virabrequim, cabeçote e juntas, além de temperaturas maiores durante a combustão.

#### O compressor mecânico

Conhecido como *supercharger* (e também blower), ele é conectado diretamente ao motor, normalmente por uma correia ligada ao virabrequim. Quando o motor gira, essa conexão faz seu compressor girar também. Dentro dele existem componentes que movimentam e comprimem o ar. Dependendo do tipo de supercharger, isso pode ser feito por rotores ou pás, semelhantes a um turbo.

**SUPERCHARGER**
![Placeholder](https://picsum.photos/id/36/700/400)

Porém, o funcionamento básico é sempre parecido. O ar atmosférico entra no compressor, é comprimido e enviado ao coletor de admissão com uma pressão maior do que a atmosférica.

Comparado ao turbo, uma vantagem do supercharger é sua resposta imediata. Como o turbo usa os gases do escape, em baixas rotações, onde pouco gás é produzido, esses gases podem não ter força o bastante para girar a turbina. Já o supercharger, por estar ligado diretamente ao virabrequim, a sua velocidade aumenta junto com a rotação do motor.

Por outro lado, exatamente por estar ligado ao virabrequim, os superchargers consomem parte da energia gerada pelo motor, enquanto o turbo aproveita uma energia que seria desperdiçada.

## Apimentando as coisas

Essas foram explicações bem básicas sobre como essas partes funcionam, agora itemos ver variações e entrar um pouco mais a fundo em como montar e usar esses sistemas.

### Dois é mais do que um

Começando pelos turbos, do mesmo jeito que se pode aumentar os cilindros do motor, podemos colocar mais de um turbo no veículo. A maneira que esses turbos são conectados determina seu comportamento.

- *Turbos sequenciais*: no geral, configurações desse tipo usam um turbo menor e um maior. O menor é usado em baixas rotações, já que consegue carregar e girar mais rápido. Conforme a rotação do motor aumenta, o segundo turbo maior entra em funcionamento, uma vez que a quantidade de gases já o suficiente para a sua ativação. 
- *Turbos em paralelo*: nesse caso, cada turbo costuma ser responsável por uma parte do motor. Um exemplo comum é em motores V, onde cada bancada de cilindros tem um coletor de escape, admissão e seu turbo, permitindo que trabalhem simultaneamente.
- *Turbos compound*: aqui os turbos trabalham em série. O ar atmosférico passa pelo primeiro turbo onde é comprimido, em vez de sair para a admissão, esse ar passa por outro turbo, sendo comprimido mais ainda e atinguindo pressões maiores. Essa configuração também deixa o sistema mais complexo, devido a essas pressões extremas.

Por fim, algo que acontece em qualquer sistema de turbo, é o problema de quando o motorista tira o pé do acelerador. Como menos gases de escape são produzidos, a velocidade da turbina também acaba diminuindo. Quando o acelerador é pressionado novamente, leva um tempo até que os gases aceleram a turbina novamente. Esse atraso é conhecido como *turbo lag* e é o motivo principal do uso de turbos sequenciais.

O *anti-lag* é uma série de estratégias que tentam evitar esse atraso e manter a turbina sempre girando. Isso pode envolver atrasos na ignição e mudanças na quantidade de combustível, ou remover parte do ar que iria para a admissão e enviá-lo para o turbo. No geral, os sistemas de anti-lag costumam ser agressivos no desgate do turbo e admissão. 
`O anti-lag também faz o carro pipocar, recomendo pesquisar anti-lag na internet para que você veja`

**TURBOS**
![Placeholder](https://picsum.photos/id/36/700/400)

### Superchargers também são legais

Embora seja possível colocar mais de um compressor mecânico no motor, isso é algo bem raro de se ver. Porém ainda sim existem configurações diferentes de supercharges, com a diferença estando nos mecanismos usados para movimentar e comprimir o ar.

- *Compressor roots (raiz)*: faz uso de dois rotores com o mesmo perfil, que giram em sentidos afastando-se um do outro. Esses rotores transportam o ar da entrada para a saída, onde é comprimido conforme encontra a pressão existente na admissão. Como ele bloqueia o ar de voltar por onde encontrou, o ar é comprimido na entrada da admissão.
- *Compressor twin-screw (parafuso duplo)*: usa dois rotores com perfis diferentes. De maneira simplificada, o formato dos rotores prende o ar entre eles e é transportado ao mesmo tempo que o espaço disponível diminui. Nele o ar já chega comprimido na admissão. 
- *Compressor centrífugo*: esse formato se assemelha ao lado do compressor em um turbo. Um rotor em alta velocidade acelera o ar para fora, a diferença é que em vez de uma turbina, a rotação vem da conexão ao virabrequim. Assim como o turbo, ele também precisa "carregar" para gerar a potência máxima.

**SUPERCHARGERS**
![Placeholder](https://picsum.photos/id/36/700/400)

### O mais legal: twin charging

Também é possível misturas os dois sistemas no mesmo motor. Essa configuração é chamada de *twin charging* e faz uso de um turbocompressor e um supercompressor trabalhando em conjunto.

A ideia é misturar o melhor dos dois mundos. Em baixas rotações, quando há pouco fluxo de gases de escape, o supercharge fornece a pressão para gerar potência. Conforme a rotação aumenta, o turbo assume o trabalho, gerando ainda mais potência. Combinando a resposta rápida do supercharger com a eficiência do turbo. Dependendo do projeto, eles podem trabalhar simultaneamente ou cada um na sua faixa de rotação.

**TWIN CHARGER**
![Placeholder](https://picsum.photos/id/36/700/400)

O problema de se fazer isso é a complexidade. É preciso controlar o fluxo de ar, pressão da admissão e o momento e funcionamento de cada compressor. Por esse motivo, essa configuração é pouco usada em carros de produção. No geral, conforme a tecnologia dos turbos melhorou, esse método se tornou desnecessário, mas se deseja conhecer um carro que fez uso dessa técnologia, pesquise pelo Lancia Delta S4.

## Resfriando o ar

Uma consequência de comprimir qualquer gás é o aumento de sua temperatura. Para aproveitar melhor esse ar comprimido, é preciso resfriá-lo antes dele entrar no cilindro, é nessa hora onde entra o intercooler.

O *intercooler* é um trocador de calor (como o radiador) instalado entre o compressor e o motor. O ar comprimido e quente entra nele, enquanto o próprio ar atmosférico, ou algum líquido de arrefecimento, retira parte desse calor. Depois disso ele segue para a admissão.

O resfriamento, além de ajudar no controle da temperatura do motor, também ajuda a aumentar a densidade do ar. Permitindo mais oxigênio no mesmo espaço.

**INTERCOOLER**
![Placeholder](https://picsum.photos/id/36/700/400)

## Aumentando a potência de outras formas

Qualquer coisa inflamável precisa de oxigênio para queimar. A indução forçada aumenta a pressão do ar atmosférico que entra no motor, mais ar = mais oxigênio. Porém o ar atmosférico é composto de diversas outras substâncias além do oxigênio, então, o que aconteceria se trocassemos o ar normal por um gás que fosse oxigênio puro?

Isso é um experimento que foi feito por um piloto de arrancada na década de 1950. O problema é que o oxigênio puro fez o combustível ser inflamável demais, permitindo que a combustão acontecesse a quase qualquer momento. Nesse caso, a outra opção é usar óxido nitroso, ou *nitro*.

O nitro possui 2 moléculas de nitrogênio para 1 oxigênio. A vantagem dele é ser uma mistura estável o suficiente, onde o oxigênio só é liberado quando misturado com o combustível, evitando a detonação. Além disso, por serem armazenados em garrafas pressurizadas no formato líquido, ao ser injetado no cilindro, o líquido expande para gás, o que dimiui sua temperatura e deixa o ar mais denso.

**NITRO**
![Placeholder](https://picsum.photos/id/36/700/400)

O uso de nitro costuma ser mais popular em corridas de arrancada, onde é usado por curtos períodos de tempo. Por aumentar o desgaste nos componentes do motor e ser algo que precisa ser reabastecido, o uso contínuo acaba sendo e no dia a dia acaba sendo alto demais, principalmente quando comparado aos outros métodos de aumentar potência que vimos.

## Mais potência = mais problemas?

Praticamente todo problema relacionado ao aumento de potência acontece pela falta de modificações que suportam essa força extra. Por esse motivo, iremos falar um pouco sobre como cada sistema se relaciona com esse aumento.

- *Combustível*: já vimos que muito ar para pouco combustível gera uma mistura pobre. Por isso é preciso aumentar a capacidade do sistema de combustível para que acompanhe o aumento do ar.
- *Arrefecimento*: se o ar-combustível queimado aumenta, a temperatura aumenta junto. Partes como o intercooler, radiador, bomba d'água e outras podem precisar ser trocadas para que o sistema de arrefecimento continue mantendo a temperatura do motor na sua faixa de operação.
- *Ignição*: a quantidade de ar, combustível e pressão dentro do cilindro também muda como a combustão acontece. Por isso, o momento da ignição precisa ser ajustado de acordo com essas novas condições de funcionamento.
- *Lubrificação*: o aumento de potência também significa que várias partes irão sofrer com maior esforço, temperatura e velocidade. O óleo precisa continuar formando uma camada para separar as superfícies metálicas e reduzir o atrito. Uma preparação pode exigir um sistema de óleo mais eficiente, maior capacidade de refrigeração ou componentes capazes de manter a pressão adequada.
- *Resistência*: por fim, existe um limite que não pode ser ignorado: as próprias peças do motor precisam suportar o aumento das forças. Um motor original pode funcionar durante milhares de quilômetros, mas isso não significa que todos os seus componentes irão suportar uma pressão maior do que aquela para qual foram projetados. Se você já ouviu sobre peças forjadas, são peças feitas com materiais e processos diferentes para que se tornem mais resistentes. 