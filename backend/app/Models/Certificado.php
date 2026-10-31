<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificado extends Model
{
    protected $fillable = [
        'user_id',
        'codigo',
        'nome_titular',
        'curso',
        'emitido_em',
    ];

    protected $casts = [
        'emitido_em' => 'datetime',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
