<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RecompensaUsuario extends Model
{
    protected $table = 'recompensa_usuarios';
    protected $fillable = [
        'user_id',
        'modulo_id',
        'recompensa_codigo',
        'equipada',
    ];
    protected $casts = ['equipada' => 'boolean'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function modulo(): BelongsTo {
        return $this->belongsTo(Modulo::class);
    }
}
