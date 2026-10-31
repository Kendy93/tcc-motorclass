
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">

    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }

        html, body {
            margin: 0;
            padding: 0;
            width: 297mm;
            height: 210mm;
        }

        .pagina {
            position: relative;
            width: 297mm;
            height: 210mm;
            overflow: hidden;
        }

        /* fundo exportado do Canva */
        .fundo {
            position: absolute;
            top: 0;
            left: 0;
            width: 297mm;
            height: 210mm;
            z-index: 0;
        }

        /* campos dinâmicos */
        .campo {
            position: absolute;
            z-index: 1;
            text-align: center;
            width: 257mm;
            left: 20mm;
            color: #263A4A;
        }
        .nome {
            top: 90mm;
            font-size: 28pt;
            font-weight: bold;
        }
        .curso {
            top: 131mm;
            font-size: 16pt;
        }
        .data {
            top: 177mm;
            font-size: 14pt;
        }
        .codigo {
            top: 187mm;
            font-size: 14pt;
        }

        /* .nome,
        .curso,
        .data,
        .codigo {
            border: 1px solid red;
        } */
    </style>
</head>

<body>
    <div class="pagina">

        <!-- imagem -->
        <img
            class="fundo"
            src="{{ public_path('images/certificado-fundo.png') }}"
        >

        <!-- nome do usuário -->
        <div class="campo nome">
            {{ $certificado->nome_titular }}
        </div>

        <!-- data de emissão -->
        <div class="campo data">
            Emitido em
            {{ $certificado->emitido_em->format('d/m/Y') }}
        </div>

        <!-- código de identificação -->
        <div class="campo codigo">
            Código: {{ $certificado->codigo }}
        </div>

    </div>
</body>
</html>
