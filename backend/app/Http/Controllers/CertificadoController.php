<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class CertificadoController extends Controller
{
    /**
     * gera e disponibiliza o certificado do usuário autenticado.
     */
    public function baixar(Request $request)
    {
        $certificado = $request->user()->certificado;
        abort_unless($certificado, 404, 'Certificado não encontrado.');

        $dataEmissao = $certificado->emitido_em
            ->locale('pt_BR')
            ->translatedFormat('d \d\e F \d\e Y');

        $pdf = Pdf::loadView('pdf.certificado', [
            'certificado' => $certificado,
            'dataEmissao' => $dataEmissao,
        ])->setPaper('a4', 'landscape');

        return $pdf->download(
            'certificado-motorclass-' . $certificado->codigo . '.pdf'
        );
    }
}
