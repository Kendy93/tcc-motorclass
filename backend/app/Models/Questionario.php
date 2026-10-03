<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Questionario extends Model
{
    protected $fillable = [
        'modulo_id',
        'codigo',
        'titulo',
    ];

    public function modulo(): BelongsTo{
        return $this->belongsTo(Modulo::class);
    }

    public function tentativas(): HasMany{
        return $this->hasMany(TentativaQuestionario::class);
    }

    public function questoes(): HasMany{
        return $this->hasMany(QuestaoQuestionario::class)->orderBy('ordem');
    }
}
