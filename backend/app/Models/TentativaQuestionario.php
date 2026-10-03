<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TentativaQuestionario extends Model
{
    protected $table = 'tentativa_questionarios';
    protected $fillable = [
        'questionario_id',
        'user_id',
        'nota',
        'acertos',
        'erros',
        'percentual',
        'concluido_at',
    ];
    protected $casts = [
        'nota' => 'float',
        'concluido_at' => 'datetime',
    ];

    public function questionario(): BelongsTo{
        return $this->belongsTo(
            Questionario::class
        );
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function respostas(): HasMany{
        return $this->hasMany(
            RespostaTentativa::class,
            'tentativa_id'
        );
    }
}
