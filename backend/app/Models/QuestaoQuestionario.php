<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestaoQuestionario extends Model
{
    protected $fillable = [
        'questionario_id',
        'codigo',
        'tipo',
        'pergunta',
        'resposta_correta',
        'explicacao',
        'opcoes',
        'ordem',
        'modelo_3d',
        'grupo_3d',
    ];
    protected $casts = [
        'opcoes' => 'array',
    ];

    public function questionario(): BelongsTo{
        return $this->belongsTo(Questionario::class);
    }
}
