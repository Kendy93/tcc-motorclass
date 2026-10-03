<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RespostaTentativa extends Model
{
    protected $table = 'resposta_tentativas';
    protected $fillable = [
        'tentativa_id',
        'questao_id',
        'tipo',
        'pergunta',
        'resposta',
        'resposta_correta',
        'correta',
    ];
    protected $casts = [
        'resposta' => 'array',
        'resposta_correta' => 'array',
        'correta' => 'boolean',
    ];

    public function tentativa(): BelongsTo{
        return $this->belongsTo(
            TentativaQuestionario::class,
            'tentativa_id'
        );
    }

}
